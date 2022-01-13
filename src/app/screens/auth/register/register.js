import React, { useState, useEffect } from "react";
import { history, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../../config/globalConfig";
import { Form, Checkbox, Col, Row, Select, message, Radio, Space, Typography } from "antd";
import "./register.scss";
import Button from "../../../components/button/button";
import RadioGroup from "../../../components/radio/RadioGroup";
import Input from "../../../components/input/input";
import { registerUser, createCardCustomerBusiness } from "../../../redux/actions/user_actions";
import {
  getCities,
  getStates,
  getCityByState,
} from "../../../redux/actions/location_action";
import {
  EnableLoader,
  DisableLoader,
} from "../../../redux/actions/loader_action";
import axios from "axios";
import InputPhoneNumber from "react-phone-number-input/input";
import { packagesType, packagesTypeNamed } from '../../../config/constants'
import BusinessBilling from './Business/BusinessBilling'
import Modal from "antd/lib/modal/Modal";
import Charity from './Charity'

const { Option } = Select;

const Register = (props) => {
  const [businessForm] = Form.useForm();
  const dispatch = useDispatch();

  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailerror, setemailerror] = useState("");
  const [registerSuccessfull, setRegisterSuccessfull] = useState(false);
  const [packageType, setpackageType] = useState('');
  const [visible, setvisible] = useState(false)
  const [fileList, setfileList] = useState([])

  const [formClick, setFormClick] = useState({
    getRegisteredClick: false,
    businessInformationClick: false,
    billingInformationClick: false,
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: undefined,
    state: undefined,
    businessName: "",
    noOfEmployees: undefined,
    billingType: "",
    nameOnCard: "",
    cardNo: "",
    cvv: "",
    expirationMonth: null,
    expirationYear: null,

    packageType: null,
    website: ""
  });

  useEffect(() => {
    //console.log('effect');
    dispatch(getStates()).then((response) => {
      //console.log(response);
      if (response.payload.status === 200) {
        setstates(response.payload.data);
      }
    });
  }, []);

  const onFinishRegistered = (values) => {
    console.log(values.packageType, 'Success setp 1:', values);
    setpackageType(values.packageType)
    dispatch(EnableLoader());
    axios
      .post(`${baseUrl}/user/emailCheck/`, values)
      .then((response) => {
        //console.log(response);
        //console.log('responsed ==> ')
        dispatch(DisableLoader());
        if (response.data.status === 200) {
          setData({ ...data, ...values });
          setCurrentIndex(registerSteps[1]);
        } else {
          setemailerror(response.data.message);
          setTimeout(() => {
            setemailerror("");
          }, 3000);
        }
      })
      .catch((error) => {
        //console.log(error);
        message.error(error.message);
        dispatch(DisableLoader());
      });
  };

  const handleUpload = () => {
    dispatch(EnableLoader());
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file);
    });
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // RegisterHandler(formData)
    dispatch(registerUser(data)).then((response) => {
      //console.log("ee",response)
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        setRegisterSuccessfull(true);
        // props.history.push("/login");
      } else {
        message.error(response.payload.message);
      }
    })

  };



  const onTestFinishRegistered = (values) => {
    setCurrentIndex(registerSteps[1]);
  };

  const RegisterHandler = (data) => {
    // setCurrentIndex(registerSteps[2]);

    if (packageType === "Individual") {
      dispatch(EnableLoader());
      dispatch(registerUser(data)).then((response) => {
        //console.log("ee",response)
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          message.success(response.payload.message);
          setRegisterSuccessfull(true);
          // props.history.push("/login");
        } else {
          message.error(response.payload.message);
        }
      });
    }
    else {
      setCurrentIndex(registerSteps[2]);
    }
  }

  const onFinishBusinessInformation = (values) => {
    // console.log('Success:', values);
    setData({ ...data, ...values });
    RegisterHandler({ ...data, ...values })
  };

  const onFinishBillingInformation = (values) => {
    // setData({ ...data, ...values });
    dispatch(EnableLoader());
    dispatch(registerUser({ ...data, ...values })).then((response) => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        // console.log(response.payload.data, "<--Business Register")
        // console.log(response.payload.data._id, "<--response.payload.data._id", response.payload.data.stripeCustomer.id)
        dispatch(createCardCustomerBusiness({ ...values, userId: response.payload.data._id, customerId: response.payload.data.stripeCustomer.id })).then((response) => {
          dispatch(DisableLoader());
          if (response.payload.status === 200) {
            // console.log(response.payload.data, "<--added card Info")
            // message.success(response.payload.message);
          }
          else {
            message.error(response.payload.message);
          }
        })

        message.success(response.payload.message);
        props.history.push("/login");
      } else {
        message.error(response.payload.message);
      }
    });


    // submit data
    //props.history.push('/dashboard');
    // setCurrentIndex(registerSteps[2]);
  };

  const onFinishFailed = (errorInfo) => {
    //console.log('Failed:', errorInfo);
  };

  const getRegistered = (title) => {
    return (
      <div>
        {/* <h1>{title}</h1> */}
        <Typography.Title level={2} >{title}</Typography.Title>
        <Form
          name="basic"
          initialValues={data}
          onFinish={onFinishRegistered}
          // onFinish={onTestFinishRegistered}
          onFinishFailed={onFinishFailed}
          style={{ width: "350px", marginTop: 10 }}
        >

          {emailerror && (
            <label>
              <p
                style={{
                  color: "#ff0000bf",
                  fontSize: "0.7rem",
                  border: "1px solid",
                  padding: "1rem",
                  borderRadius: "10px",
                }}
              >
                {emailerror}
              </p>
            </label>
          )}

          <Form.Item
            style={{ marginTop: 10 }}
            validateTrigger={
              formClick.getRegisteredClick ? "onChange" : "onSubmit"
            }
            validateFirst="true"
            name="name"
            placeholder="Full name"
            rules={[
              { required: true, message: "Please enter your full name" },
              {
                pattern: new RegExp(/^[a-zA-Z0-9 ]+$/i),
                message: "numbers and special characters not allowed",
              },
              {
                min: 3,
                message: "Full name  should not be less than 3 characters.",
              },
              {
                max: 50,
                message: "Full name should not be more than 50 characters.",
              },
            ]}
          >
            <Input name="name" placeholder="Full name" />
          </Form.Item>

          <Form.Item
            validateTrigger={
              formClick.getRegisteredClick ? "onChange" : "onSubmit"
            }
            name="email"
            validateFirst="true"
            placeholder="Email address"
            rules={[
              { required: true, message: "Please enter your email!" },
              {
                max: 50,
                message: "Email should not be more than 50 characters!",
              },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            validateTrigger={
              formClick.getRegisteredClick ? "onChange" : "onSubmit"
            }
            name="password"
            validateFirst="true"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 8, message: "Password must be minimum 8 characters." },

              { max: 50, message: "Password must be maximum 50 characters" },
              {
                pattern: new RegExp(
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
                ),
                message:
                  "Password must have 1 upper case, 1 lower case character and 1 number",
              },
              //({ getFieldValue }) => ({
              //
              //  validator(rule, value) {
              //    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/g.test(value)) {
              //      return Promise.reject('Should have 1 upper case and a number!');
              //    } else {
              //      return Promise.resolve();
              //    }
              //  }
              //})
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            validateTrigger={
              formClick.getRegisteredClick ? "onChange" : "onSubmit"
            }
            name="confirm"
            validateFirst="true"
            rules={[
              {
                required: true,
                message: "Please enter your confirm  password",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "Password and Confirm password does not matched"
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>



          <Form.Item name="packageType" //label="Package Type"
            rules={[
              { required: true, message: "Please select package Type!" },
            ]}>
            <Select placeholder="Select Account Type"
              // onChange={e => settypePackage(e)}
              className="customSelect">
              {packagesTypeNamed.map(type => (
                <Option value={type.value} key={type.value}>{type.name}</Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item>
            <Button
              className="register-form-button secondary-button"
              htmlType="submit"
              onClick={() =>
                setFormClick({ ...formClick, ...{ getRegisteredClick: true } })
              }
            >
              Continue
            </Button>
            {/* <Button onClick={() => { setCurrentIndex(registerSteps[1]); console.log(currentIndex); }}>Continue</Button> */}
          </Form.Item>
          <div
            style={{ bottom: 65, position: "fixed" }}
            className="primary-text"
          >
            Already a member? Login{" "}
            <Link
              to={"/login"}
              className="primary-color"
              style={{ fontWeight: "bold" }}
            >
              <u>here</u>
            </Link>
          </div>
        </Form>
      </div>
    );
  };

  const stateChange = (value) => {
    if (value) {
      dispatch(EnableLoader());
      //console.log(value);
      let id = states.filter((state, index, array) => state.name === value)[0]
        .id;
      dispatch(getCityByState(id)).then((response) => {
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          setcities(response.payload.data);
        }
      });
    } else {
      businessForm.setFieldsValue({ city: undefined });
      // console.log(value);
    }
  };

  const limitPhoneNumber = (element) => {
    // console.log(element);
    // console.log(businessForm.getFieldValue('phone'));
    if (businessForm.getFieldValue('phone') && businessForm.getFieldValue('phone').length > 11) {
      element.preventDefault();
    }
  }

  const customValidatorPhoneNumber = (value) => {
    console.log(value);
  }

  const phoneNumberChange = (value) => {
    businessForm.setFieldsValue({ phone: value })
  }
  const businessInformation = (title) => {
    // console.log("in business information");

    return (
      <div>
        <Typography.Title level={2} >{title}</Typography.Title>
        <Form
          name="basic"
          initialValues={data}
          onFinish={onFinishBusinessInformation}
          form={businessForm}
          onFinishFailed={onFinishFailed}
          style={{ width: "350px", marginTop: 10 }}
        >


          <Form.Item validateTrigger={formClick.businessInformationClick ? "onChange" : "onSubmit"}
            name="phone" validateFirst="true"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              { min: 12, message: 'Mobile number is invalid' }
              // {
              //   pattern: new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/i),
              //   message: "Mobile number is invalid"
              // },
            ]}>
            <Input onKeyDown={limitPhoneNumber} hidden placeholder=" Enter Phone number (e.g. xxx-xxx-xxxx)" />
            <InputPhoneNumber
              country="US"

              value={businessForm.getFieldValue('phone')}
              placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
              className="ant-input customInput primary-text"
              error={'Phone number required'}
              onKeyDown={limitPhoneNumber}
              onChange={phoneNumberChange}
            />
          </Form.Item>


          <Form.Item
            validateTrigger={
              formClick.businessInformationClick ? "onChange" : "onSubmit"
            }
            name="state"
            validateFirst="true"
            rules={[{ required: true, message: "Please select your state" }]}
          >
            <Select
              placeholder="Select state"
              allowClear
              showSearch
              className="customSelect"
              onChange={stateChange}
            >
              {states.map((e) => (
                <Option value={e.name}>{e.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            validateTrigger={
              formClick.businessInformationClick ? "onChange" : "onSubmit"
            }
            name="city"
            validateFirst="true"
            rules={[{ required: true, message: "Please select your city" }]}
          >
            <Select
              placeholder="Select city"
              allowClear
              showSearch
              className="customSelect"
            >
              {cities.map((e) => (
                <Option value={e.name}>{e.name}</Option>
              ))}
            </Select>
          </Form.Item>

          {data.packageType !== "Individual" ?
            <>
              <Form.Item
                validateTrigger={
                  formClick.businessInformationClick ? "onChange" : "onSubmit"
                }
                name="businessName"
                validateFirst="true"
                rules={[
                  { required: true, message: "Please enter your business name" },
                  {
                    pattern: new RegExp(/^[a-zA-Z1-9 ]+$/i),
                    message: "special characters not allowed",
                  },
                  {
                    min: 3,
                    message: "business name must be minimum 3 characters.",
                  },
                  {
                    max: 50,
                    message: "business name must be maximum 50 characters.",
                  },
                ]}
              >
                <Input placeholder="Business name" />
              </Form.Item>

              <Form.Item
                validateTrigger={
                  formClick.businessInformationClick ? "onChange" : "onSubmit"
                }
                name="noOfEmployees"
                validateFirst="true"
                rules={[
                  { required: true, message: "Please select no of employees" },
                ]}
              >
                <Select
                  placeholder="Select No of employees"
                  allowClear
                  showSearch
                  className="customSelect"
                >
                  {["1-10", "11-25", "26-50", "51-100", '100+'].map((e) => (
                    <Option value={e}>{e}</Option>
                  ))}
                </Select>
              </Form.Item>


              <Form.Item
                validateTrigger={
                  formClick.businessInformationClick ? "onChange" : "onSubmit"
                }
                name="website"
                validateFirst="true"
                rules={[
                  {
                    pattern: new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi),
                    message: "please enter valid url",
                  },
                ]}
              >
                <Input placeholder="Website url" />
              </Form.Item>


            </>
            :
            null
          }


          <Form.Item>
            <Row gutter={5}>
              <Col span={6}>
                <Button
                  className="register-form-button backButton secondary-button"
                  onClick={() => {
                    setCurrentIndex(registerSteps[0]);
                    // console.log(currentIndex);
                  }}
                >
                  Back
                </Button>
              </Col>
              <Col span={18}>
                <Button
                  className="register-form-button secondary-button"
                  htmlType="submit"
                  onClick={() =>
                    setFormClick({
                      ...formClick,
                      ...{ businessInformationClick: true },
                    })
                  }
                >
                  Register
                </Button>
              </Col>
            </Row>

            {/* <Button onClick={() => { setCurrentIndex(registerSteps[1]); console.log(currentIndex); }}>Continue</Button> */}
          </Form.Item>
        </Form>

      </div>
    );
  };

  const billingInformation = (title) => {
    return (
      <div>

        <Typography.Title level={2} >{packageType === "Business" ? title : "Upload Documents"}</Typography.Title>
        {/* <Form
          name="basic"
          initialValues={data}
          onFinish={onFinishBillingInformation}
          onFinishFailed={onFinishFailed}
          style={{ width: "350px" }}
        >
          <Form.Item
            validateTrigger={
              formClick.billingInformationClick ? "onChange" : "onSubmit"
            }
            name="billingType"
          >
            <RadioGroup defaultValue="Credit Card">
              <Row>
                <Col>
                  <Radio value="Credit Card">Credit Card</Radio>
                </Col>
                <Col style={{ position: "absolute", right: "0px" }}>
                  <Radio value="Paypal">Paypal</Radio>
                </Col>
              </Row>
            </RadioGroup>

            <br />
            <Space>
              <img
                src={require(`../../../../assets/images/visaCardLogo.png`)}
                width={"45"}
                alt="logo"
              />
              <img
                src={require(`../../../../assets/images/masterCardLogo.png`)}
                width={"45"}
                alt="logo"
              />
              <img
                src={require(`../../../../assets/images/American-Express.png`)}
                width={"45"}
                alt="logo"
              />
              <img
                src={require(`../../../../assets/images/discoverLogo.png`)}
                width={"45"}
                alt="logo"
              />

              <img
                src={require(`../../../../assets/images/paypal.png`)}
                style={{ position: "absolute", right: "35px" }}
                width={"45"}
                alt="logo"
              />
            </Space>
          </Form.Item>

          <Form.Item
            validateTrigger={
              formClick.billingInformationClick ? "onChange" : "onSubmit"
            }
            name="nameOnCard"
            validateFirst="true"
            rules={[
              { required: true, message: "Please input Name On Card" },
              {
                pattern: new RegExp(/^[a-zA-Z ]+$/i),
                message: "numbers and special characters not allowed",
              },
              { min: 3, message: "Name must be minimum 3 characters." },
              { max: 50, message: "Name must be maximum 50 characters." },
            ]}
          >
            <Input placeholder="Name On Card" />
          </Form.Item>

          <Form.Item
            validateTrigger={
              formClick.billingInformationClick ? "onChange" : "onSubmit"
            }
            validateFirst="true"
            name="cardNo"
            rules={[
              { required: true, message: "Please input card Number" },
              // {
              //   pattern: new RegExp(
              //     /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i
              //     // /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
              //     ),
              //   message: "invalid card number",
              // },
              { min: 16, message: 'Invalid Card Number' },
              { max: 16, message: 'Invalid Card Number' },
            ]}
          >
            <Input placeholder="Card Number" />
          </Form.Item>

          <div className="primary-text" style={{ textAlign: "center" }}>
            Expiration Date
          </div>
          <Row gutter={10}>
            <Col xs={8}>
              <Form.Item
                validateTrigger={
                  formClick.billingInformationClick ? "onChange" : "onSubmit"
                }
                validateFirst="true"
                name="cvv"
                rules={[
                  { required: true, message: "Please input CVV" },
                  {
                    pattern: new RegExp(/^[0-9]{3,3}$/i),
                    message: "Invalid CVV",
                  },
                ]}
              >
                <Input placeholder="CVV" />
              </Form.Item>
            </Col>

            <Col xs={8}>
              <Form.Item
                validateTrigger={
                  formClick.billingInformationClick ? "onChange" : "onSubmit"
                }
                validateFirst="true"
                name="expirationMonth"
                rules={[
                  { required: true, message: "Please select expiration Month" },
                ]}
              >
                <Select placeholder="MM" className="customSelect">
                  {[
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                  ].map((e) => (
                    <Option value={e}>{e}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={8}>
              <Form.Item
                validateTrigger={
                  formClick.billingInformationClick ? "onChange" : "onSubmit"
                }
                name="expirationYear"
                validateFirst="true"
                rules={[
                  { required: true, message: "Please select expiration Year" },
                ]}
              >
                <Select placeholder="YYYY" className="customSelect">
                  {["2021", "2022", "2023", "2024", "2025", "2026"].map((e) => (
                    <Option value={e}>{e}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={5}>
            <Col span={6}>
              <Button
                className="register-form-button backButton secondary-button"
                onClick={() => {
                  setCurrentIndex(registerSteps[1]);
                  console.log(currentIndex);
                }}
              >
                Back
              </Button>
            </Col>
            <Col span={18}>
              <Button
                className="register-form-button secondary-button"
                htmlType="submit"
                onClick={() =>
                  setFormClick({
                    ...formClick,
                    ...{ billingInformationClick: true },
                  })}
              >
                Pay
              </Button>
            </Col>
          </Row>
        </Form> */}

        {packageType === "Business" ?
          <BusinessBilling onFinishBillingInformation={onFinishBillingInformation}
            setFormClick={setFormClick} formClick={formClick} setCurrentIndex={setCurrentIndex}
            registerSteps={registerSteps} />
          :


          <Charity handleUpload={() => handleUpload()} setfileList={setfileList} fileList={fileList} {...props}
            setCurrentIndex={setCurrentIndex} registerSteps={registerSteps} />

        }

      </div>
    );
  };

  const registerSteps = [
    {
      title: "Get Registered",
      index: 1,
      renderer: (title) => getRegistered(title),
    },
    {
      title: data.packageType === "Individual" ? "Contact information" : "Business information",
      index: 2,
      renderer: (title) => businessInformation(title),
    },
    {
      title: "Billing information",
      index: 3,
      renderer: (title) => billingInformation(title),
    },
  ];

  var [currentIndex, setCurrentIndex] = useState(registerSteps[0]);

  // const renderRegisterStep = (step) => {
  //   switch (step.index) {
  //     case 1:
  //       return getRegistered(step.title);
  //     case 2:
  //       return businessInformation(step.title);
  //     case 3:
  //       return billingInformation(step.title);
  //     default:
  //       return;
  //   }
  // }

  return (
    <div className="register-body">
      <Row>
        <Col span={12}>
          <div></div>
        </Col>

        <Col span={12} className="registerMain">
          <img width={250} className="registerMainImage" style={{ display: 'block', float: 'right' }} src={require('../../../../assets/images/Logo_Logly_colour.png')} />

          <div className="app_login_register">
            {!registerSuccessfull ? <div className="registerContainer">
              {registerSteps.map((value, index, array) => {
                if (currentIndex.index === value.index) {
                  return value.renderer(value.title);
                }
              })}
            </div> :
              <div className="registerContainer">
                <h1 style={{ fontSize: 30 }}>Thank You For Registration</h1>
                <div>
                  <p style={{ fontSize: 22 }}>We have send you an email. Kindly verify your account.</p>
                  {packageType === "Charity Organization" &&
                    <p style={{ fontSize: 22 }}>Instuction is provided via email (Charity Organization)</p>
                  }
                  <div style={{ marginBottom: 20 }}></div>
                  <Button type="primary" htmlType="submit" className="login-form-button secondary-button" onClick={() => { setRegisterSuccessfull(false); props.history.push('/login') }} style={{ minWidth: '100%' }} >
                    Login</Button>
                </div>
              </div>
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
