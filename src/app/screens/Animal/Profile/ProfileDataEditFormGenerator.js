import React, { useState } from "react";
import { Form, Row, Col, Select, Radio, Space, Checkbox, DatePicker, TimePicker, } from "antd";
import Input from "../../../components/input/input";
import InputNumber from "../../../components/numberInput/NumberInput";
import fieldValidation from "../../../validations/fieldValidation";
import RadioGroup from "../../../components/radio/RadioGroup";
import defaultFormStructure from "../../../config/defaultFormStructure";
import { CheckOutlined } from "@ant-design/icons";
import moment from 'moment';
function ProfileDataEditFormGenertor(props) {
  const { data, onChangeData, value, onSaveData, hidden, key, form, attribute } = props;
  console.log(props.formStructure);
  const [formStructure, setFormStructure] = useState(props.formStructure);

  const [Traits, setTraits] = useState([]);
  console.log("form generator");
  console.log(props);
  const typeText = (item) => {
    return (


      <Form.Item
        name={key}
        hidden={hidden}
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
        ]}
      >
        {item.type === "password" ?
          <Input.Password
            defaultValue={value}
            onChange={(ev) => { console.log(ev.target.value); onChangeData(ev.target.value); }}
            suffix={
              <CheckOutlined className="site-form-item-icon" onClick={onSaveData} />
            }
            placeholder={`Enter ${item.displayName}`}
          />
          : item.type === "textarea" ?
            <Input.TextArea style={{ fontFamily: "Arial" }} id="textarea"
              defaultValue={value}
              onChange={(ev) => { console.log(ev.target.value); onChangeData(ev.target.value); }}
              suffix={
                <CheckOutlined className="site-form-item-icon" onClick={onSaveData} />
              }
              placeholder={`Enter ${item.displayName}`}
            />

            :
            <Input
              defaultValue={value}
              onChange={(ev) => { console.log(ev.target.value); onChangeData(ev.target.value); }}
              suffix={
                <CheckOutlined className="site-form-item-icon" onClick={onSaveData} />
              }
              placeholder={`Enter ${item.displayName}`}
            />
        }
      </Form.Item>

    );
  };


  const typeEmail = (item) => {
    return (


      <Form.Item
        name={item.name}
        hidden={hidden}
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
          defaultValue={value}
          onChange={(ev) => { console.log(ev.target.value); onChangeData(ev.target.value); }}
          suffix={
            <CheckOutlined className="site-form-item-icon" onClick={onSaveData} />
          }
          style={{ width: "70%" }}
          placeholder={`Enter ${item.displayName}`}
        />
      </Form.Item>

    );
  };

  const typeNumber = (item) => {
    return (

      <Form.Item
        name={item.name}
        hidden={hidden}
        rules={[
          {
            required: item.validation?.required,
            message: item.validation?.required
              ? `${item.displayName} is required`
              : ``,
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
        <Input
          defaultValue={value}
          onChange={(ev) => { console.log(ev.target.value); onChangeData(ev.target.value); }}
          suffix={
            <CheckOutlined className="site-form-item-icon" onClick={onSaveData} />
          }
          style={{ width: "70%" }} placeholder={`Enter ${item.displayName}`} />
      </Form.Item>

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

      <Form.Item
        name={item.name}
        hidden={hidden}
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
          defaultValue={value}
          onChange={(ev) => { console.log(ev.target.value); onChangeData(ev.target.value); }}
          suffixIcon={
            <CheckOutlined className="site-form-item-icon" onClick={onSaveData} />
          }

          style={{ width: "70%" }}
          placeholder={item.placeholder ? item.placeholder : ""}
          allowClear
          // onChange={(e) => HandleTraits(e)}
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

    );
  };

  const typeRadio = (item) => {
    return (


      <Form.Item
        name={item.name}
        hidden={hidden}
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



    );
  };


  const typeCheckbox = (item) => {
    return (
      <Form.Item
        name={item.name}
        hidden={hidden}
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



    );
  };

  const typeDate = (item) => {
    return (

      <Form.Item
        name={item.name}
        hidden={hidden}
        rules={[
          {
            required: item.validation?.required,
            message: item.validation?.required
              ? `${item.displayName} is required`
              : ``,
          },
        ]}
      >
        < DatePicker
          defaultValue={moment(value)}
          onChange={(ev) => { console.log(ev); onChangeData(ev); }}
          // suffixIcon={
          //     <CheckOutlined className="site-form-item-icon" onClick={onSaveData} />
          // }
          allowClear={false}
          format={'DD MMM, YYYY'} value={item.date} //onChange = {(date, dateString) => onChangePicker(date, dateString, e, idx)}
          style={{ padding: 8, borderRadius: 8, }} />
        <CheckOutlined style={{ marginLeft: 10 }} className="site-form-item-icon" onClick={onSaveData} />
      </Form.Item>

    );
  };


  const typeTime = (item) => {
    return (

      <Form.Item
        name={item.name}
        hidden={hidden}
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

    );
  };
  console.log(props.formStructure.type);
  switch (props.formStructure.type) {
    case "text":
    case "password":
    case "textarea":

      return (

        typeText(props.formStructure)

      );


    //   case "email":
    //     return (
    //         typeEmail(props.formStructure)
    //     );
    case "number":
      return (
        typeNumber(props.formStructure)
      );
    case "select":
      return (
        typeSelect(props.formStructure)
      );

    case "radio":
      return (
        typeRadio(props.formStructure)
      );

    case "checkbox":
      return (
        typeCheckbox(props.formStructure)
      );

    case "date":
      return (
        typeDate(props.formStructure)
      );

    //   case "time":
    //     return (
    //         typeTime(props.formStructure)
    //     );

    default:
      return null;
  }


  // return (
  //     <>
  //     {

  //     }
  //     </>
  // );
}

export default ProfileDataEditFormGenertor;
