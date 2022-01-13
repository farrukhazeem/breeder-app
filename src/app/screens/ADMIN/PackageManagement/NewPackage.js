import React, { useState, useEffect } from "react";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import FlatInputNumber from "../../../components/FlatNumberInput";
import Card from "../../../components/card/card";
import { Row, Col, Select, Space, Form, message, Checkbox, Radio } from "antd";
import { useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../../redux/actions/loader_action";
import { createSubscription, updateSubscription } from "../../../redux/actions/subscription_action";
import { packagesType, packageBusinessType } from '../../../config/constants'
import RadioGroup from "../../../components/radio/RadioGroup";

const { Option } = Select;


function NewPackage(props) {
  const [myForm] = Form.useForm();
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [defaultPackage, setdefaultPackage] = useState(false)
  // const [onlyLifetime, setonlyLifetime] = useState(false)
  const [priceMethod, setpriceMethod] = useState("Both")
  const [typePackage, settypePackage] = useState(null)

  let formValues = (window.location.pathname === '/admin/package/edit') ? props.location.state.data : { defaultPackage: false };
  // myForm.setFieldsValue(formValues);

  useEffect(() => {
    if (window.location.pathname === '/admin/package/edit') {
      myForm.resetFields();
      myForm.setFieldsValue(formValues);
      setdefaultPackage(formValues.defaultPackage)
      if (formValues && formValues.priceMethod) {
        setpriceMethod(formValues.priceMethod)
      }
      if (formValues && formValues.packageType) {
        settypePackage(formValues.packageType)
      }
    }
  }, [formValues])

  // console.log("formValues==>>", formValues);



  const onFinish = (values) => {
    console.log("Success:", values);
    values.allowedProduct = values.allowedProduct ? values.allowedProduct : 0
    values.defaultPackage = defaultPackage
    if (priceMethod === "Lifetime") {
      delete values.monthlyPrice
      delete values.yearlyPrice
    }
    // if (!values.lifetimePrice && !values.monthlyPrice) {
    //   return (message.error("Please enter Lifetime OR Monthly and Yearly Price"))
    // }
    // if ((values.monthlyPrice && !values.yearlyPrice) || (!values.monthlyPrice && values.yearlyPrice)) {
    //   return (message.error("Both Monthly and Yearly Price is required"))
    // }

    var formData = new FormData();
    if (image) formData.append("file", image.file, image.file.name);


    if (window.location.pathname === '/admin/package/edit') {
      let myValues = { ...props.location.state.data, ...values };
      if (!myValues.icon) {
        delete myValues.icon;
      }
      for (const key in myValues) {
        formData.append(key, myValues[key]);
      }
      dispatch(EnableLoader());
      dispatch(updateSubscription(myValues._id, formData)).then((response) => {
        dispatch(DisableLoader());
        console.log(response)
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          props.history.push("/admin/package");
        } else {
          message.error(response.payload.message);
        }
      })
    } else {
      for (const key in values) {
        formData.append(key, values[key]);
      }

      dispatch(EnableLoader());
      dispatch(createSubscription(formData)).then((response) => {
        dispatch(DisableLoader());
        console.log(response)
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          props.history.push("/admin/package");
        } else {
          message.error(response.payload.message);
        }
      })
    }

  };

  // Upload image here ...
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    setImage({ file: event.target.files[0] });
  };

  const DataSubmit = () => {
    message.success("package created successfully");
    props.history.push("/admin/package");
  };


  const [value, setValue] = React.useState(1);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


  return (
    <>
      <Form form={myForm} defaultValue={formValues} onFinish={onFinish} layout={"vertical"}>
        <Row>
          <Col xs={24} className="textAlign-sm-box">
            <span className="primary-text primary-text-heading ">
              Add a new Package
            </span>
            <div className="textAlign-sm-right textAlign-margintop-neg ">
              <Space>
                <Button
                  className="secondary-button"
                  onClick={() => props.history.push("/admin/package")}
                >
                  Discard
                </Button>
                <Button className="secondary-button" htmlType="submit">
                  {(window.location.pathname === '/admin/package/edit') ? 'Save' : 'Add Package'}
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
        <br />

        <Row style={{ marginBottom: "20px", marginTop: "20px" }}>
          <div>
            {image && image.file ? (
              <img
                src={URL.createObjectURL(image.file)}
                style={{ width: 90, height: 90, borderRadius: 50 }}
                alt="logo"
              />
            ) : (
                <img
                  src={(window.location.pathname === '/admin/package/edit') ? (formValues.icon ? formValues.icon : require("../../../../assets/images/product/productDice.jpg")) : require("../../../../assets/images/product/productDice.jpg")}
                  style={{ width: 90, height: 90, borderRadius: 50 }}
                  alt="logo"
                />
              )}
          </div>
          <Form.Item
            name="file"
            className="animal-input-custom"
          //rules={[{ required: true, message: "Please enter image!" }]}
          >
            <span>
              <a className="primary-text" style={{ cursor: "pointer" }}>
                Upload new icon
              </a>
              <Input
                id="image"
                type="file"
                onChange={(e) => handleChange(e)}
              ></Input>
            </span>
          </Form.Item>
        </Row>

        <Card className="secondary-background-grey">
          {/* <Form onFinish={finishForm} layout={'vertical'}> */}
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name of package"
                rules={[
                  { required: true, message: "Please input package name!" },
                  { max: 50, message: "Maximum 50 characters are required!" },
                ]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>




            <Col span={12}>
              <Form.Item name="packageType" label="Package Type"
                rules={[
                  { required: true, message: "Please select package Type!" },
                ]}>
                <Select placeholder="Select Package Type" onChange={e => settypePackage(e)}
                  className="customSelect">
                  {packagesType.map(type => (
                    <Option value={type} key={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>


            {typePackage === "Business" ?
              <Col span={12}>
                <Form.Item name="businessType" label="Business Type"
                  rules={[
                    { required: true, message: "Please select Business Type!" },
                  ]}>
                  <Select placeholder="Select Business Type"
                    className="customSelect">
                    {packageBusinessType.map(type => (
                      <Option value={type} key={type}>{type}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              :
              null}

            <Col span={12}>
              <Form.Item
                name="allowedAnimal"
                label="Allowed Animals"
                rules={[
                  { required: true, message: "Please input allowed animals!" },
                ]}
              >
                <FlatInputNumber
                  onChange={(value) =>
                    myForm.setFieldsValue({ allowedAnimal: value })
                  }
                  placeholder="Enter quantity"
                />
              </Form.Item>
            </Col>
            {typePackage !== "Individual" ?
              <Col span={12}>
                <Form.Item
                  name="allowedProduct"
                  label="Allowed Products"
                  rules={[
                    { required: true, message: "Please input allowed products!" },
                  ]}
                >
                  <FlatInputNumber
                    onChange={(value) =>
                      myForm.setFieldsValue({ allowedProduct: value })
                    }
                    placeholder="Enter quantity"
                  />
                </Form.Item>
              </Col>
              : null}

            <Col span={12}>
              <Form.Item
                name="allowedEmp"
                label="Allowed Team Members"
                rules={[
                  {
                    required: true,
                    message: "Please input allowed employees!",
                  },
                ]}
              >
                <FlatInputNumber
                  onChange={(value) =>
                    myForm.setFieldsValue({ allowedEmp: value })
                  }
                  placeholder="Enter quantity"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input description!" },
                  { pattern: new RegExp(/^[0-9a-zA-Z ]+$/i), message: "special characters not allowed" },
                ]}
              >
                <Input placeholder="Enter description" />
              </Form.Item>
            </Col>


            <Col span={12}>
              <Form.Item name="priceMethod" label="Select price method"
                rules={[
                  { required: true, message: "Please select price method!" },
                ]}>
                <Select placeholder="Select price method" onChange={(e) => setpriceMethod(e)}
                  className="customSelect">
                  {["Both", "Lifetime", "Monthly & Yearly"].map(type => (
                    <Option value={type} key={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* <Col span={12}>
              <Form.Item rules={[{ required: true, message: "Please select price Method!" },]}
                name="priceMethod" label="Select Price Method"
              >
                <RadioGroup onChange={(e) => setpriceMethod(e.target.value)}>
                  {
                    ["Both", "Lifetime", "Monthly & Yearly"].map(data => <Radio value={data} key={data}>{data}</Radio>)
                  }
                </RadioGroup>
              </Form.Item>
            </Col> */}


            {(priceMethod === "Both") || (priceMethod === "Monthly & Yearly") ?
              <>
                <Col span={12}>
                  <Form.Item
                    name="monthlyPrice"
                    label="Monthly Price"
                    rules={[
                      { required: true, message: "Please input package monthly price!" },
                      { pattern: new RegExp(/^[0-9.]+$/i), message: "only numbers allowed" },
                    ]}
                  >
                    <FlatInputNumber
                      onChange={(value) => myForm.setFieldsValue({ monthlyPrice: value })}
                      placeholder="Enter Monthly Price"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="yearlyPrice"
                    label="Yearly Price"
                    rules={[
                      { required: true, message: "Please input package yearly price!" },
                      { pattern: new RegExp(/^[0-9.]+$/i), message: "only numbers allowed" },
                    ]}
                  >
                    <FlatInputNumber
                      onChange={(value) => myForm.setFieldsValue({ yearlyPrice: value })}
                      placeholder="Enter Yearly Price"
                    />
                  </Form.Item>
                </Col>
              </>
              :
              null
            }

            {(priceMethod === "Both") || (priceMethod === "Lifetime") ?
              <>
                <Col span={12}>
                  <Form.Item
                    name="lifetimePrice"
                    label="Lifetime Price"
                    rules={[
                      { required: true, message: "Please input Lifetime Price!" },
                    ]}
                  >
                    <FlatInputNumber
                      onChange={(value) => myForm.setFieldsValue({ lifetimePrice: value })}
                      placeholder="Enter Lifetime Price"
                    />
                  </Form.Item>
                </Col>
              </>
              :
              null
            }



          </Row>

          <Space>
            <Form.Item
              name="defaultPackage"
            // label="Default Package"
            >
              {/* <Checkbox className="customInput primary-text" checked={myForm.getFieldValue('defaultPackage')} onChange={(value) => { myForm.setFieldsValue({ defaultPackage: value.target.checked }) }} >Default Package</Checkbox> */}
              <Checkbox className="customInput primary-text" checked={defaultPackage} onChange={() => { setdefaultPackage(!defaultPackage); }} >Default Package</Checkbox>
              {/* {myForm.getFieldValue('defaultPackage') ? 'This is a Default Package': 'This is not a Default Package'} */}
            </Form.Item>



            {/* <Form.Item name="onlyLifetime">
              <Checkbox className="customInput primary-text" checked={onlyLifetime} onChange={() => { setonlyLifetime(!onlyLifetime); }} >Only Lifetime Package</Checkbox>
            </Form.Item> */}

          </Space>
          {/* </Form> */}
        </Card>
      </Form>
    </>
  );
}
export default NewPackage;
