import React, { useState, useEffect } from "react";
import { Row, Col, message, Space, Select, Modal, Input as Input2 } from "antd";
import Cart from "../../components/card/card";
import { Form, Switch } from "antd";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import passwordGenerator from "../../config/passwordGenerator";
import "./Employee.scss";
import { useDispatch } from "react-redux";
import {
  registerEmp,
  getEmp,
  updateEmp,
} from "../../redux/actions/user_actions";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";
import { formatTimeStr } from "antd/lib/statistic/utils";
import InputPhoneNumber from "react-phone-number-input/input";
import {
  getCities,
  getStates,
  getCityByState,
} from "../../redux/actions/location_action";
const { Option } = Select;
const { TextArea } = Input2;

export default function Employee(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [appStatus, setappStatus] = useState(true);
  const [managementStatus, setmanagementStatus] = useState(true);
  const [status, setStatus] = useState(true);
  const [image, setimage] = useState({});
  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [user, setUser] = useState(null);
  const [enableChangePass, setEnableChangePass] = useState((window.location.pathname === "/employees/edit-employee") ? true : false)
  const [finishClicked, setFinishClicked] = useState(false);
  const [dataLoaded, setdataLoaded] = useState(false);


  const [modal, contextHolder] = Modal.useModal();


  const onClick = () => {
    setFinishClicked(true);
  };

  useEffect(() => {
    if (window.location.pathname === "/employees/edit-employee") {
      console.log(props.location.state.id);
      console.log(props);
      dispatch(EnableLoader());
      dispatch(getEmp(props.location.state.id)).then((response) => {
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          setUser(response.payload.data);
          setappStatus(response.payload.data.canAccessMobileApp);
          setmanagementStatus(
            response.payload.data.canAccessInventoryManagement
          );
          setStatus(response.payload.data.active);
          form.resetFields();
          form.setFieldsValue(response.payload.data);
          setdataLoaded(true);
        }
      });
    }
    //console.log('effect');
    dispatch(getStates()).then((response) => {
      //console.log(response);
      if (response.payload.status === 200) {
        setstates(response.payload.data);
      }
    });
  }, []);

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
      form.setFieldsValue({ city: undefined });
      console.log(value);
    }
  };

  const limitPhoneNumber = (element) => {
    console.log(element);
    if (
      form.getFieldValue("phone") &&
      form.getFieldValue("phone").length > 11
    ) {
      element.preventDefault();
    }
  };

  const phoneNumberChange = (value) => {
    form.setFieldsValue({ phone: value });
  };

  const onFinish = (values) => {
    //message.success("Employee added successfully")
    //console.log(values);
    dispatch(EnableLoader());
    let formdata = new FormData();
    if (image.file) {
      formdata.append("file", image.file, image.file.name);
    }
    for (var key in values) {
      formdata.append(key, values[key]);
    }

    if (window.location.pathname !== "/employees/edit-employee") {
      formdata.append("canAccessMobileApp", appStatus);
      formdata.append("canAccessInventoryManagement", managementStatus);
      formdata.append("active", status);
    } else {
      formdata.set("canAccessMobileApp", appStatus);
      formdata.set("canAccessInventoryManagement", managementStatus);
      formdata.set("active", status);
    }

    // console.log(formdata.entries((k,v) => ))
    if (window.location.pathname === "/employees/edit-employee") {
      dispatch(updateEmp(formdata, user._id)).then((response) => {
        dispatch(DisableLoader());
        console.log(response.payload);
        if (response.payload.status === 200) {
          console.log("success");
          message.success(response.payload.message);
          props.history.push("/employees");
        } else {
          message.error(response.payload.message);
        }
      });
    } else {
      dispatch(registerEmp(formdata)).then((response) => {
        dispatch(DisableLoader());
        console.log(response.payload);
        if (response.payload.status === 200) {
          console.log("success");
          message.success(response.payload.message);
          props.history.push("/employees");
        } else {
          if (response.payload.status === 405) {
            // message.error(response.payload.message);
            Modal.error({
              title: 'Limit Exceeded!',
              content: (
                <>
                  {response.payload.message}
                </>
              ),
              okCancel: true,
              cancelText: 'Ok',
              okText: 'Upgrade',
              onOk: () => {
                props.history.push('/subscription');
              }
            })
          } else {
            message.error(response.payload.message);
          }
        }
      });
    }

    //props.history.push('/employees')
  };

  const autoGeneratePassword = () => {
    form.setFieldsValue({ password: passwordGenerator.generate(10) });
  };

  const onChangePasswordClick = () => {
    setEnableChangePass(false);
    form.setFieldsValue({ password: '' });
  }

  const handleChange = (event) => {
    console.log(event.target.files[0]);
    if (!(event.target.files[0].type.split("/")[0] === "image")) {
      message.error("Only image is allowed!");
      return false;
    } else {
      setimage({ file: event.target.files[0] });
    }
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col xs={24} className="textAlign-sm-box">
            <span className="primary-text primary-text-heading ">
              Add a new Team Member
            </span>
            <div className="textAlign-sm-right textAlign-margintop-neg ">
              <Space>
                <Link to={"/employees"}>
                  <Button className="secondary-button"> Discard Changes</Button>
                </Link>
                <Button
                  htmlType="submit"
                  onClick={onClick}
                  className="secondary-button"
                >
                  {window.location.pathname === "/employees/edit-employee"
                    ? "Save Changes"
                    : "Add Team Member"}
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
        <br />
        <Space>
          <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
            {image.file ? (
              <img
                src={URL.createObjectURL(image.file)}
                style={{ borderRadius: "45px" }}
                width={"70"}
                height={"70"}
                alt="logo"
              />
            ) : user && user.image ? (
              <img
                src={user.image}
                style={{ borderRadius: "45px" }}
                width={"70"}
                alt="logo"
              />
            ) : (
                  <img src={require('../../../assets/images/avatar.png')} style={{ borderRadius: "45px" }}
                    width={"70"}
                    height={"70"} alt="logo" />
                )
            }
          </div>
          <Form.Item
            name="file3"
            className="emp-input-custom"
          // rules={(user && user.image) ? [] : [{ required: true, message: "Please enter image!" }]}
          >
            {
              <span>
                <a className="primary-text" style={{ cursor: "pointer" }}>
                  Upload new picture
                </a>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => handleChange(e)}
                ></Input>
              </span>
            }

            {/* <Upload {...props}>
                            <u className="primary-text" style={{ cursor: 'pointer', fontWeight: "bold" }}>Upload new picture</u>
                        </Upload> */}
          </Form.Item>
        </Space>

        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
            <Cart
              style={{ margin: "10px" }}
              className="primary-contrast-background"
            >
              <h2 className="primary-text" style={{ fontSize: 20, fontWeight: "bolder" }}>Info and Login credentials</h2>
              <br />

              <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                Team Member Name :
              </div>
              <Form.Item
                name="name"
                validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                validateFirst="true"
                placeholder="Team Member name"
                rules={[
                  { required: true, message: "Please enter Team Member name" },
                  {
                    pattern: new RegExp(/^[a-zA-Z ]+$/i),
                    message: "numbers and special characters not allowed",
                  },
                  {
                    min: 3,
                    message:
                      "Team Member name  should not be less than 3 characters.",
                  },
                  {
                    max: 50,
                    message:
                      "Team Member name should not be more than 50 characters.",
                  },
                ]}
              >
                <Input
                  id="name"
                  placeholder="Enter team member Name"
                  type="text"
                ></Input>
              </Form.Item>

              <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                Email :
              </div>
              <Form.Item
                validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                name="email"
                validateFirst="true"
                placeholder="Email address"
                rules={[
                  { required: true, message: "Please enter employee email!" },
                  {
                    max: 50,
                    message: "Email should not be more than 50 characters!",
                  },
                  { type: "email", message: "Invalid email" },
                ]}
              >
                <Input
                  disabled={(window.location.pathname === "/employees/edit-employee") ? true : false}
                  id="email"
                  placeholder="Enter team member email"
                  type="email"
                ></Input>
              </Form.Item>

              <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                Phone :
              </div>
              <Form.Item
                validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                name="phone"
                validateFirst="true"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  { min: 12, message: "Mobile number is invalid" },
                  // {
                  //   pattern: new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/i),
                  //   message: "Mobile number is invalid"
                  // },
                ]}
              >
                {/* <Input
                  id="phone"
                  placeholder="Enter employee phone number (e.g. xxx-xxx-xxxx)"
                  type="phone"
                ></Input> */}

                <Input
                  onKeyDown={limitPhoneNumber}
                  hidden
                  placeholder="Enter employee phone number (e.g. xxx-xxx-xxxx)"
                />
                {((window.location.pathname === "/employees/edit-employee") && dataLoaded) &&
                  <InputPhoneNumber
                    country="US"
                    value={form.getFieldValue("phone")}
                    placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
                    className="ant-input customInput primary-text"
                    error={"Phone number required"}
                    onKeyDown={limitPhoneNumber}
                    onChange={phoneNumberChange}
                  />}

                {(window.location.pathname !== "/employees/edit-employee") &&
                  <InputPhoneNumber
                    country="US"
                    value={form.getFieldValue("phone")}
                    placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
                    className="ant-input customInput primary-text"
                    error={"Phone number required"}
                    onKeyDown={limitPhoneNumber}
                    onChange={phoneNumberChange}
                  />}

              </Form.Item>

              {/* <Form.Item validateTrigger={formClick.businessInformationClick ? "onChange" : "onSubmit"}
            name="phone" validateFirst="true"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              {min: 12, message: 'Mobile number is invalid'}
              // {
              //   pattern: new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/i),
              //   message: "Mobile number is invalid"
              // },
            ]}>
             
          </Form.Item> */}

              <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                State :
              </div>
              <Form.Item
                validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                name="state"
                validateFirst="true"
                rules={[
                  { required: true, message: "Please select your state" },
                ]}
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

              <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                City :
              </div>
              <Form.Item
                validateTrigger={finishClicked ? "onChange" : "onSubmit"}
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

              <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                Address :
              </div>
              <Form.Item style={{ width: "100%" }}
                name="address"
                validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                validateFirst="true"
                rules={[
                  { required: true, message: "Please input employee address" },
                ]}
              >
                <TextArea rows={4}
                  id="textarea" style={{ fontFamily: "Arial" }}
                  className="ant-input customInput primary-text"
                  placeholder="Enter address "
                  type="address"
                ></TextArea>
              </Form.Item>


              <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                Password :
              </div>
              <Form.Item
                name="password"
                validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                validateFirst="true"
                rules={[
                  { required: true, message: "Please input password " },
                ]}
              >
                <Input.Password
                  disabled={
                    enableChangePass
                      ? true
                      : false
                  }
                  id="password"
                  placeholder="Enter password "
                  type="password"
                />
              </Form.Item>

              <div
                style={{
                  marginTop: "-30px",
                  fontSize: "15px",
                  visibility: "hidden",
                }}
              >
                Generate Password :
                  </div>
              {enableChangePass ? (
                <Button onClick={onChangePasswordClick}>
                  Change Password
                </Button>
              ) : (
                  <Button onClick={autoGeneratePassword}>
                    Generate Password
                  </Button>
                )}

            </Cart>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
            <Cart
              style={{ width: "90%;", margin: "10px" }}
              className="primary-contrast-background"
            >
              <h2 className="primary-text-heading" style={{ fontSize: 20, fontWeight: "bolder" }}>Access rights</h2>
              <br />
              <br />

              <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                Mobile App :
              </div>
              <Form.Item name="canAccessMobileApp2">
                <Switch
                  defaultChecked={appStatus}
                  style={{ color: "red" }}
                  onChange={() => setappStatus(!appStatus)}
                />
                <span
                  className="primary-text-span"
                  style={{
                    margin: "3px",
                    marginLeft: "10px",
                    fontSize: "15px",
                  }}
                >
                  {appStatus ? "Active" : "Not Active"}
                </span>
              </Form.Item>
              <br />
              <br />

              {/* <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                Inventory management :
              </div>
              <Form.Item name="canAccessInventoryManagement2">
                <Switch
                  defaultChecked={managementStatus}
                  onChange={() => setmanagementStatus(!managementStatus)}
                />
                <span
                  className="primary-text-span"
                  style={{
                    margin: "3px",
                    marginLeft: "10px",
                    fontSize: "15px",
                  }}
                >
                  {managementStatus ? "Active" : "Not Active"}
                </span>
              </Form.Item>
              <br />
              <br /> */}

              <div
                style={{ margin: "3px", fontSize: "15px" }}
                className="primary-text"
              >
                Status :
              </div>
              <Form.Item name="active2">
                <Switch
                  defaultChecked={status}
                  onChange={() => setStatus(!status)}
                />
                <span
                  className="primary-text-span"
                  style={{
                    margin: "3px",
                    marginLeft: "10px",
                    fontSize: "15px",
                  }}
                >
                  {status ? "Active" : "Not Active"}
                </span>
              </Form.Item>
            </Cart>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
