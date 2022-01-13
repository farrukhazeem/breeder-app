import React, { useEffect, useState } from "react";
import { Col, Row, Space, Tabs, Button, Form, Select, message, Typography } from "antd";
import Button2 from "../../../../components/button/button";
import Card from "../../../../components/card/card";
import { Link } from "react-router-dom";
import Input from "../../../../components/input/input";
import Checkbox from "../../../../components/checkbox/Checkbox";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import FormPreview from "./FormPreview";
import { useDispatch } from "react-redux";
import {
  DisableLoader,
  EnableLoader,
} from "../../../../redux/actions/loader_action";
import { getCategoriesByType } from "../../../../redux/actions/category_action";
import defaultFormStructure from "../../../../config/defaultFormStructure";
import fieldValidation from "../../../../validations/fieldValidation";
import { addForm, getAllForms, updateForm, deleteRequestFormStructureIds } from "../../../../redux/actions/form_action";
import { value } from "numeral";

const { TabPane } = Tabs;
const { Option } = Select;
const { Title } = Typography;

export default function CreateForm(props) {
  const { type, data } = props.location.state;
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ShowTraits, setShowTraits] = useState(false);

  const [EditValue, setEditValue] = useState({});

  const [forms, setForms] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.pathname === "/admin/form/edit") {
      setSelectedCategory(data.categoryId._id);
    }
    getCategories();
  }, []);

  const getCategories = () => {
    dispatch(EnableLoader());
    dispatch(getCategoriesByType(type)).then((response) => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setCategories(response.payload.data);
      } else {
        setCategories(null);
      }
    });
    if (!(window.location.pathname === "/admin/form/edit")) {
      dispatch(getAllForms()).then((response) => {
        dispatch(DisableLoader());
        console.log(response);
        if (response.payload.status === 200) {
          if (response.payload.data[0]) {
            setForms(response.payload.data);
          } else {
            setForms(null);
          }
        }
      });
    }


  };

  const standard = [
    { name: "Single Line Text", type: "text", selected: false },
    { name: "Paragraph Text", type: "textarea", selected: false },
    { name: "Dropdown", type: "select", selected: false },
    { name: "Checkbox", type: "checkbox", selected: false },
    { name: "Radio Button", type: "radio", selected: false },
    // { name: "Email", type: "email", selected: false },
    // { name: "Password", type: "password", selected: false },
    { name: "Number", type: "number", selected: false },
    // { name: "Image", type: "image", selected: false },
    // { name: "Pdf", type: "pdf", selected: false },
    { name: "Date", type: "date", selected: false },
    // { name: "Time", type: "time", selected: false },
  ];

  const [selectedKey, setselectedKey] = useState("1");
  const [selectedField, setselectedField] = useState({});
  const [formStructure, setformStructure] = useState((window.location.pathname === "/admin/form/edit") ? data.formStructure :
    (type === 'animal' ?
      defaultFormStructure.animals : defaultFormStructure.products)
  );
  const [deletedFormStructure, setdeletedFormStructure] = useState([]);

  const onFinish = (values) => {
    console.log("values", values);
    console.log("values==>>", selectedField);
    let obj = {
      displayName: values.displayName,
      name: values.displayName, //fieldValidation.getName(values.displayName),
      onlyBusiness: values.onlyBusiness,
      type: selectedField.type,
      validation: values,
      values: (values.values && values.values[0]) ? values.values.map(e => ({ name: e, value: e })) : [],
    };

    if (window.location.pathname === "/admin/form/edit") {
      obj = { ...obj, breedersId: formStructure[0].breedersId }
    }

    if (selectedField.displayName) {
      let forms = formStructure.filter(e => e.displayName !== selectedField.displayName)
      if (selectedField._id) {
        obj = { ...obj, _id: selectedField._id, breedersId: selectedField.breedersId }
      }
      setformStructure([...forms, obj]);
    }
    else {
      setformStructure(formStructure.concat(obj));
    }
    console.log(formStructure);

    setselectedKey("1");
    form.resetFields();
  };

  const [finishClicked, setFinishClicked] = useState(false);
  const onClick = () => {
    setFinishClicked(true);
  };

  const HandleAddField = (e) => {
    setselectedField(e);
    setselectedKey("2");
  };

  const AddField = () => {
    return (
      <div style={{ marginTop: -15 }}>
        <br />
        <Row>
          {standard.map((e) => (
            <Col span={12}>
              <Button
                style={{
                  minWidth: "130px",
                  marginTop: 10,
                  borderRadius: 8,
                  border: "none",
                  height: "39px",
                }}
                className="primary-background primary-contrast-text"
                onClick={() => HandleAddField(e)}
              >
                {e.name}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const renderFormOptionPreview = (item) => {
    switch (item.type) {
      case 'number':
        return (
          <Card className="marginTop-form-10">

            <span className="fw-100">Validations</span>
            <br /> <br />
            <Space>
              <Form.Item
                name="minLength"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9]+$/i),
                    message: "Only numbers allowed",
                  },
                ]}
              >
                <Input placeholder={`Enter min length`} />
              </Form.Item>

              <Form.Item
                name="maxLength"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9]+$/i),
                    message: "Only numbers allowed",
                  },
                ]}
              >
                <Input placeholder={`Enter max length`} />
              </Form.Item>
            </Space>

            <Form.Item
              name="required"
              valuePropName="checked"
            >
              <Checkbox>Required</Checkbox>
            </Form.Item>

          </Card >
        );


      case "text":
      case "password":
      case "textarea":
        return (
          <Card className="marginTop-form-10">

            <span className="fw-100">Validations</span>
            <br /> <br />
            <Space>
              <Form.Item
                name="minLength"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9]+$/i),
                    message: "Only numbers allowed",
                  },
                ]}
              >
                <Input placeholder={`Enter min length`} />
              </Form.Item>

              <Form.Item
                name="maxLength"
                rules={[
                  {
                    pattern: new RegExp(/^[0-9]+$/i),
                    message: "Only numbers allowed",
                  },
                ]}
              >
                <Input placeholder={`Enter max length`} />
              </Form.Item>
            </Space>
            <Space direction="vertical">
              <Form.Item
                name="required"
                valuePropName="checked"
              >
                <Checkbox>Required</Checkbox>
              </Form.Item>

              <Form.Item
                name="allowNumber"
                valuePropName="checked"
              >
                <Checkbox>Numbers</Checkbox>
              </Form.Item>

              {/* <Form.Item
                name="allowString"
                valuePropName="checked"
              >
                <Checkbox>String</Checkbox>
              </Form.Item> */}

              <Form.Item
                name="allowSpecialCharacter"
                valuePropName="checked"
              >
                <Checkbox>Special character</Checkbox>
              </Form.Item>
            </Space>
          </Card >
        );


      case "radio":
      case "select":
      case "checkbox":
        return (
          <div>
            <div style={{ margin: "10px", fontSize: "15px" }}>Options:</div>
            <Form.List name="values">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Form.Item
                        required={false} //className="marginTop-form-10"
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={
                            finishClicked ? "onChange" : "onSubmit"
                          }
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please enter value or remove this.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Enter option name"
                            style={{ width: "90%" }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: "0 5px" }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </Form.Item>
                    ))}

                    <Form.Item style={{ textAlign: "center" }}>
                      <Button2
                        onClick={() => {
                          add();
                        }}
                        style={{ width: "60%" }}
                      >
                        <PlusOutlined />{" "}
                        {fields.length < 1 ? "Add Field" : "Add more"}
                      </Button2>
                    </Form.Item>

                  </div>
                );
              }}

            </Form.List>

            <Card className="marginTop-form-10">
              <span className="fw-100">Validations</span>
              <br /> <br />
              <Form.Item
                name="required"
                valuePropName="checked"
              >
                <Checkbox>Required</Checkbox>
              </Form.Item>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  const FieldOption = () => {
    useEffect(() => {
      if (selectedField.displayName) {
        console.log(selectedField.validation.required)
        form.setFieldsValue({
          ...selectedField, values: selectedField.values.map(e => e.name)
          , required: selectedField.validation.required,
          minLength: selectedField.validation.minLength ? selectedField.validation.minLength : null,
          maxLength: selectedField.validation.maxLength ? selectedField.validation.maxLength : null,
          allowSpecialCharacter: selectedField.validation.allowSpecialCharacter,
          allowNumber: selectedField.validation.allowNumber,
        });
      }
    }, [selectedField])
    return (
      <div>
        {/* <span className="primary-text fw-100" style={{ textAlign: "center" }}>
          {selectedField.name}
        </span> */}
        <Form
          onFinish={onFinish}
          form={form}
          initialValues={{
            noOfLines: 2,
            required: true,
            allowString: true,
            values: [""],
            minLength: null, maxLength: null,
            allowSpecialCharacter: false, allowNumber: false
          }}
        >
          <div style={{ margin: "3px", fontSize: "15px" }}>Label:</div>
          <Form.Item
            name="displayName"
            validateTrigger={finishClicked ? "onChange" : "onSubmit"}
            validateFirst="true"
            rules={[{ required: true, message: "Please enter Label name" }]}
          >
            <Input placeholder="Enter label" />
          </Form.Item>

          {selectedField.type === "textarea" && (
            <Form.Item
              name="noOfLines"
              validateTrigger={finishClicked ? "onChange" : "onSubmit"}
              validateFirst="true"
              rules={[
                { required: true, message: "Please enter Number of lines" },
                {
                  pattern: new RegExp(/^[0-9]+$/i),
                  message: "Only numbers allowed",
                },
              ]}
            >
              <Input placeholder="Enter  Number of lines" />
            </Form.Item>


          )}

          {renderFormOptionPreview(selectedField)}
          <div style={{ marginTop: 15 }}></div>
          <Card className="marginTop-form-10">
            <span className="fw-100">Belongs To Account</span>
            <Form.Item
              name="onlyBusiness"
              valuePropName="checked"
            >
              <Checkbox>Not For Individuals</Checkbox>
            </Form.Item>
          </Card>




          <div style={{ marginTop: 10 }}></div>
          <Form.Item
            name="required"
            valuePropName="checked"
            style={{ textAlign: "center", display: "none" }}
          >
            <Checkbox>Mandatory</Checkbox>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Space>
              <Button2
                onClick={() => {
                  setselectedKey("1");
                  form.resetFields();
                }}
                className="secondary-button"
              >
                Discard
              </Button2>
              <Button2
                htmlType="submit"
                onClick={onClick}
                className="secondary-button"
              >
                Save
              </Button2>
            </Space>
          </div>
        </Form>
      </div>
    );
  };

  const categoryChange = (id) => {
    let _traits = categories.filter(e => e._id === id)[0]
    if (_traits.traits.length > 0) {
      setShowTraits(true)
    }
    else {
      setShowTraits(false)
    }
    setSelectedCategory(id);
  };

  const createClick = () => {
    // console.log(formStructure);
    if (!selectedCategory) {
      message.error('Select the category!')
      return;
    }
    let tt;
    if (!ShowTraits) {
      tt = formStructure.filter(e => e.name !== "traits")
    }
    else {
      tt = formStructure
    }

    const data = {
      categoryId: selectedCategory,
      formStructure: tt,
    }

    console.log("data==>>>", data);
    dispatch(EnableLoader());
    dispatch(addForm(data)).then(response => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        props.history.push('/admin/form');
      } else {
        message.error(message.payload.message);
      }
    });

  };

  const deleteFormStructureIdFromRequest = () => {
    let del = deletedFormStructure.filter(e => e !== undefined)
    if (del.length > 0) {
      dispatch(deleteRequestFormStructureIds(del)).then((response) => {
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          //message.success(response.payload.message);
        }
        else {
          message.error(response.payload.message);
        }
      })
    }
  }

  const SaveClick = () => {

    deleteFormStructureIdFromRequest()
    const finalData = {
      ...data,
      categoryId: selectedCategory,
      formStructure,
    }

    console.log(finalData);
    dispatch(EnableLoader());
    dispatch(updateForm(data._id, finalData)).then(response => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.editMessage);
        props.history.push('/admin/form');
      } else {
        message.error(message.payload.message);
      }
    });

  };


  return (
    <div>
      <Row>
        <Col xs={24} md={8} className="">
          <h2 className="primary-text primary-text-heading">Create new Form</h2>
        </Col>
        <Col xs={24} md={8} style={{ textAlign: "center" }} className=""></Col>

        <Col xs={24} md={8} className="textAlign-md-box-layer">
          <Space style={{ float: "right" }}>
            <div>
              <Button2
                className="secondary-button"
                onClick={() => props.history.push("/admin/form")}
              >
                Discard
              </Button2>
            </div>
            <div>
              {
                (window.location.pathname === "/admin/form/edit") ? (
                  <Button2 className="secondary-button" onClick={SaveClick}>
                    Save
                  </Button2>
                ) : (
                    <Button2 className="secondary-button" onClick={createClick}>
                      Create
                    </Button2>
                  )
              }

            </div>
          </Space>
        </Col>
      </Row>
      <br />
      <br />
      <Card>
        <Row style={{}}>
          <Col span={24} className="">
            <Space>
              <h2 className="primary-text fw-100">Category</h2>
              {/* <Input placeholder="Enter Category name" /> */}
              {(window.location.pathname === "/admin/form/edit") ? (<h2 className="primary-text fw-100">: {data.categoryId.name}</h2>) : (<Select
                defaultValue="Select Category" style={{ width: 200 }}
                placeholder="Select Category"
                className="customSelect"
                onSelect={categoryChange}
              >
                {
                  forms ? categories.filter(e => !forms.map(e => e.categoryId._id).includes(e._id)).map((category) => (
                    <Option value={category._id}>{category.name}</Option>
                  )) :
                    categories.map((category) => (
                      <Option value={category._id}>{category.name}</Option>
                    ))
                }

              </Select>)}

            </Space>
          </Col>
        </Row>
      </Card>
      <br />

      <Row gutter={50}>
        <Col span={8}>
          <Card className="primary-contrast-background">
            <Tabs activeKey={selectedKey}>
              <TabPane tab="Add Field" key="1">
                {AddField()}
              </TabPane>
              <TabPane tab="Field Options" key="2">
                {FieldOption()}
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        <Col span={16}>
          <FormPreview formStructure={formStructure}
            setformStructure={setformStructure} deletedFormStructure={deletedFormStructure} setdeletedFormStructure={setdeletedFormStructure}
            setselectedKey={setselectedKey} setselectedField={setselectedField}
            ShowTraits={ShowTraits} />
        </Col>
      </Row>
    </div>
  );
}
