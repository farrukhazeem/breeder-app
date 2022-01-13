import React, { useState, useEffect } from "react";
import { Form, Row, Col, Select, Radio, Space, Checkbox, DatePicker, TimePicker, } from "antd";
import Input from "../../components/input/input";
import moment from "moment";
import fieldValidation from "../../validations/fieldValidation";
import RadioGroup from "../../components/radio/RadioGroup";
import defaultFormStructure from "../../config/defaultFormStructure";

function FormGenerator(props) {
  const { edit } = props
  const [formStructure, setFormStructure] = useState([]);
  useEffect(() => {
    if (props.formStructure) {
      setFormStructure(props.formStructure)
    }
  }, [props.formStructure])

  const [Traits, setTraits] = useState([]);
  console.log("form generator");
  console.log(props);
  const typeText = (item) => {
    return (
      <>
        <div
          style={{ margin: "3px", fontSize: "15px" }}
          className="primary-text"
        >
          {item.displayName}:
        </div>
        <Form.Item
          name={item.name}
          rules={[
            {
              required: item.validation?.required,
              message: item.validation?.required
                ? `${item.displayName} is required`
                : ``,
            },
            item.validation?.minLength
              ? {
                min: item.validation?.minLength,
                message: `Minimum length should be ${item.validation?.minLength}`,
              }
              : {},
            item.validation?.maxLength
              ? {
                max: item.validation?.maxLength,
                message: `Maximum length should be ${item.validation?.maxLength}`,
              }
              : {},
            {
              validator: (_, value) =>
                item.validation?.allowNumber
                  ? Promise.resolve()
                  : fieldValidation.restrictNumber(value),
            },
            {
              validator: (_, value) =>
                item.validation?.allowSpecialCharacter
                  ? Promise.resolve()
                  : fieldValidation.restrictSpecialChar(value),
            },
          ]}
        >
          {item.type === "password" ?
            <Input.Password
              style={{ width: "70%" }}
              placeholder={`Enter ${item.displayName}`}
            />
            : item.type === "textarea" ?
              <Input.TextArea style={{ fontFamily: "Arial" }} id="textarea"
                style={{ width: "70%" }}
                placeholder={`Enter ${item.displayName}`}
              />

              :
              <Input
                style={{ width: "70%" }}
                placeholder={`Enter ${item.displayName}`}
              />
          }
        </Form.Item>
      </>
    );
  };


  const typeEmail = (item) => {
    return (
      <>
        <div
          style={{ margin: "3px", fontSize: "15px" }}
          className="primary-text"
        >
          {item.displayName}:
        </div>
        <Form.Item
          name={item.name}
          rules={[
            {
              required: item.validation?.required,
              message: item.validation?.required
                ? `${item.displayName} is required`
                : ``,
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input
            style={{ width: "70%" }}
            placeholder={`Enter ${item.displayName}`}
          />
        </Form.Item>
      </>
    );
  };

  const typeNumber = (item) => {
    return (
      <>
        <div
          style={{ margin: "3px", fontSize: "15px" }}
          className="primary-text"
        >
          {item.displayName}:
        </div>
        <Form.Item
          name={item.name}
          rules={[
            {
              required: item.validation?.required,
              message: item.validation?.required
                ? `${item.displayName} is required`
                : ``,
            },
            {
              pattern: (item.name === "price" || item.name === "quantity") ?
                new RegExp(/^[1-9][0-9]*$/i) :
                new RegExp(/^[0-9]+$/i), message: "only numbers allowed (must be greater than 0)"
            },
            // item.validation?.minLength ? {min : item.validation?.minLength, message: `Minimum length should be ${item.validation?.minLength}`} : {},
            // item.validation?.maxLength ? {max : item.validation?.maxLength, message: `Maximum length should be ${item.validation?.maxLength}`} : {},
            {
              validator: (_, value) =>
                item.validation?.minLength
                  ? value?.toString().length < item.validation.minLength
                    ? Promise.reject(
                      `Minimum Length should be ${item.validation.minLength}`
                    )
                    : Promise.resolve()
                  : Promise.resolve(),
            },
            {
              validator: (_, value) =>
                item.validation?.maxLength
                  ? value?.toString().length > item.validation.maxLength
                    ? Promise.reject(
                      `Maximum Length should be ${item.validation.maxLength}`
                    )
                    : Promise.resolve()
                  : Promise.resolve(),
            },
          ]}
        >
          <Input style={{ width: "70%" }} placeholder={`Enter ${item.displayName}`} />
        </Form.Item>
      </>
    );
  };


  const typeSelect = (item) => {
    let values2 = item.values;

    const HandleTraits = (e) => {
      console.log(e);
      if (item.name === "breed") {

        const trts = props.selected.categoryId.traits;
        const currTraits = trts.filter(carr => e.includes(carr.breed));
        console.log(currTraits);
        if (currTraits[0]) {
          if (!formStructure.filter(fs => fs.name === "traits")[0]) {
            setFormStructure([...formStructure, ...[{ ...defaultFormStructure.traits, values: currTraits }]])
          }
          console.log([...formStructure, ...[{ ...defaultFormStructure.traits, values: currTraits }]]);
          props.form.setFieldsValue({ "traits": undefined });
          setTraits(currTraits);
        } else {
          setFormStructure(formStructure.filter(fs => !(fs.name === "traits")))
        }

        // props.form.setFieldsValue({ "traits": undefined });
        // let _traits = formStructure.filter(e => e.name === "traits")
        // console.log(_traits);
        // var getAllTraits = _traits && _traits.length > 0 ? formStructure.filter(e => e.name === "traits")[0].values.filter(e2 => e2.breed === e) : []
        // setTraits(getAllTraits)
        // console.log(getAllTraits);
      }
    }

    return (
      <>
        <div
          style={{ margin: "3px", fontSize: "15px" }}
          className="primary-text"
        >
          {item.displayName}:
        </div>
        <Form.Item
          name={item.name}
          rules={[
            {
              required:
                item.name === "traits" && Traits.length < 1 ? false : item.validation?.required,
              message: item.validation?.required
                ? `${item.displayName} is required`
                : ``,
            },
          ]}
        >
          <Select
            style={{ width: "70%" }}
            placeholder={item.placeholder ? item.placeholder : ""}
            allowClear
            onChange={(e) => HandleTraits(e)}
            className="customSelect"
            showSearch
            mode={((item.name === "traits") || (item.name === "breed")) ? "multiple" : null}

          >
            {item.name === "traits" ?
              Traits.map((value) => (
                <Select.Option value={value.name}>{value.name}</Select.Option>
              ))
              :
              item.values.map((value) => (
                <Select.Option value={value.name}>{value.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
      </>
    );
  };

  const typeRadio = (item) => {
    return (
      <>
        <div
          style={{ margin: "3px", fontSize: "15px" }}
          className="primary-text"
        >
          {item.displayName}:
        </div>
        {/* <RadioGroup onChange={(ev) => {changeValueOfPreviewForm(item, ev.target.value);}} value={item.value} options={item.values.map((e) => ({label: e.name, value: e.value}))} /> */}
        <Form.Item
          name={item.name}
          rules={[
            {
              required: item.validation?.required,
              message: item.validation?.required
                ? `${item.displayName} is required`
                : ``,
            },
          ]}
        >
          <RadioGroup>
            {
              item.values.map(e => <Radio value={e.value}>{e.name}</Radio>)
            }
          </RadioGroup>
        </Form.Item>

      </>

    );
  };


  const typeCheckbox = (item) => {
    return (
      <>
        <div
          style={{ margin: "3px", fontSize: "15px" }}
          className="primary-text"
        >
          {item.displayName}:
        </div>
        {/* <RadioGroup onChange={(ev) => {changeValueOfPreviewForm(item, ev.target.value);}} value={item.value} options={item.values.map((e) => ({label: e.name, value: e.value}))} /> */}
        <Form.Item
          name={item.name}
          rules={[
            {
              required: item.validation?.required,
              message: item.validation?.required
                ? `${item.displayName} is required`
                : ``,
            },
          ]}
        >
          {/* <RadioGroup>
            {
              item.values.map(e => <Radio value={e.value}>{e.name}</Radio>)
            }
          </RadioGroup> */}

          <Checkbox.Group >
            {item.values.map((e, index) => (

              <Space style={{ marginLeft: index !== 0 ? 20 : 0 }} key={e}>
                <Checkbox value={e.value}></Checkbox>
                <span className="secondary-text" >{e.name}</span>
              </Space>

            ))}
          </Checkbox.Group>
        </Form.Item>

      </>

    );
  };

  const typeDate = (item) => {
    return (
      <>
        <div
          style={{ margin: "3px", fontSize: "15px" }}
          className="primary-text"
        >
          {item.displayName}:
        </div>
        <Form.Item
          name={item.name}
          rules={[
            {
              required: item.validation?.required,
              message: item.validation?.required
                ? `${item.displayName} is required`
                : ``,
            },
          ]}
        >
          < DatePicker format={'DD MMM, YYYY'}
            value={item.date} disabledDate={d => !d || (item.name === "birthdate" || item.name === "birthday" || item.name === "DOB") ? d.isAfter(Date.now()) : null}
            // onChange={(ev) => console.log(ev._d)}
            style={{ padding: 8, borderRadius: 8, width: '70%', marginTop: 10 }} />
        </Form.Item>
      </>
    );
  };


  const typeTime = (item) => {
    return (
      <>
        <div
          style={{ margin: "3px", fontSize: "15px" }}
          className="primary-text"
        >
          {item.displayName}:
        </div>
        <Form.Item
          name={item.name}
          rules={[
            {
              required: item.validation?.required,
              message: item.validation?.required
                ? `${item.displayName} is required`
                : ``,
            },
          ]}
        >
          < TimePicker value={item.date} //onChange = {(date, dateString) => onChangePicker(date, dateString, e, idx)}
            style={{ padding: 8, borderRadius: 8, width: '70%', marginTop: 10 }} />
        </Form.Item>
      </>
    );
  };

  return formStructure.map((e) => {
    switch (e.type) {
      case "text":
      case "password":
      case "textarea":
        return (
          <Col xs={24} lg={8}>
            {typeText(e)}
          </Col>
        );


      case "email":
        return (
          <Col xs={24} lg={8}>
            {typeEmail(e)}
          </Col>
        );
      case "number":
        return (
          <Col xs={24} lg={8}>
            {typeNumber(e)}
          </Col>
        );
      case "select":
        if (edit && (e.name === "breed" || e.name === "traits")) {
          return
        }
        return (
          <Col xs={24} lg={8}>
            {typeSelect(e)}
          </Col>
        );

      case "radio":
        return (
          <Col xs={24} lg={8}>
            {typeRadio(e)}
          </Col>
        );

      case "checkbox":
        return (
          <Col xs={24} lg={8}>
            {typeCheckbox(e)}
          </Col>
        );

      case "date":
        return (
          <Col xs={24} lg={8}>
            {typeDate(e)}
          </Col>
        );

      case "time":
        return (
          <Col xs={24} lg={8}>
            {typeTime(e)}
          </Col>
        );

      default:
        return null;
    }
  });

  //   return (
  //     <div>
  //       <Form>
  //         <Row>

  //         </Row>
  //       </Form>
  //     </div>
  //   );
}

export default FormGenerator;
