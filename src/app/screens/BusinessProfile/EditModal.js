import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Modal,
  Form,
  Space,
  message,
  Input,
  Typography,
  InputNumber,
  Select,
} from "antd";
import Button from "../../components/button/button";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";
import { useDispatch } from "react-redux";
import { editDetail } from "../../redux/actions/user_actions";
import InputPhoneNumber from "react-phone-number-input/input";
import { getCityByState } from "../../redux/actions/location_action";
import { getStates } from "../../redux/actions/location_action";
import { getUserFromLocalStorage } from '../../helpers/helperFuctions'
const { TextArea } = Input;
const { Title } = Typography;

function EditModal(props) {
  const dispatch = useDispatch();
  const [userForm] = Form.useForm();
  const { modalvisible, ChangeModal, userinfo } = props;
  const [finishClicked, setFinishClicked] = useState(false);
  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const onClick = () => {
    // setFinishClicked(true);
    console.log(userForm.getFieldsValue());
  };

  const years = []; let nn;
  for (let index = 0; index < new Date().getFullYear().toString().substr(-2); index++) {
    nn = index < 10 ? '0' + index : index
    years.push('20' + nn)
  }

  useEffect(() => {
    if (props.userinfo?.phone) {
      userForm.setFieldsValue({ phone: props.userinfo.phone })
    }
  }, [props.userinfo])

  useEffect(() => {
    dispatch(getStates()).then((response) => {
      //console.log(response);
      if (response.payload.status === 200) {
        setstates(response.payload.data);
      }
    });
  }, []);

  const stateChange = (value) => {
    if (value) {
      console.log(value);
      dispatch(EnableLoader());
      //console.log(value);
      let id = states.filter((state, index, array) => state.name === value)[0]
        .id;
      console.log(id);
      dispatch(getCityByState(id)).then((response) => {
        console.log(userinfo);
        console.log(response);
        dispatch(DisableLoader());
        if (response.payload.status === 200) {
          setcities(response.payload.data);
          userForm.setFieldsValue({ city: undefined });
        }
      });
    } else {
      userForm.setFieldsValue({ city: undefined });
      console.log(value);
    }
  };

  const onFinish = (values) => {
    //console.log(values)
    dispatch(EnableLoader());
    dispatch(editDetail(values)).then((response) => {
      if (response.payload.status === 200) {
        dispatch(DisableLoader());
        message.success(response.payload.message);
        window.location.reload();
      } else {
        dispatch(DisableLoader());
        message.error(response.payload.message);
        DisableLoader();
      }
    });
  };

  const phoneNumberChange = (value) => {
    userForm.setFieldsValue({ phone: value });
  };

  const limitPhoneNumber = (element) => {
    console.log(element);
    console.log(userForm.getFieldValue("phone"));
    if (
      userForm.getFieldValue("phone") &&
      userForm.getFieldValue("phone").length > 11
    ) {
      element.preventDefault();
    }
  };

  return (
    <>
      <Modal
        visible={modalvisible}
        footer={null}
        closable={false}
        centered
        style={{ minWidth: "700px" }}
      >
        <div style={{ paddingRight: "20px" }}>
          <Form
            onFinish={onFinish}
            form={userForm}
            initialValues={{
              ["businessName"]: userinfo.businessName,
              ["email"]: userinfo.email,
              ["name"]: userinfo.name,
              ["phone"]: userinfo.phone,
              ["location"]: userinfo.location,
              ["website"]: userinfo.website,
              ["description"]: userinfo.description,
              ["noOfEmployees"]: userinfo.noOfEmployees,
              ["founded"]: userinfo.founded,
              ["city"]: userinfo.city,
              ["state"]: userinfo.state,
            }}
          >
            <Title level={3}>Edit Profile</Title>
            <Row>
              <Col xs={24} md={12}>
                <div className="primary-text fs-120 textAlign-sm-modalleft">
                  Contact person:
                </div>
                <Form.Item
                  name="name"
                  validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                  validateFirst="true"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                    {
                      pattern: new RegExp(/^[a-zA-Z ]+$/i),
                      message: "numbers and special characters not allowed",
                    },
                    {
                      min: 3,
                      message:
                        "Full name  should not be less than 3 characters.",
                    },
                    {
                      max: 50,
                      message:
                        "Full name should not be more than 50 characters.",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "85%" }}
                    placeholder="Contact person name"
                    className="textAlign-sm-marginLeft customInput"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <div className="primary-text fs-120 textAlign-sm-modalleft">
                  Contact Number:
                </div>
                <Form.Item
                  name="phone"
                  validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                  validateFirst="true"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  {userinfo.phone && userForm.getFieldValue("phone") && (
                    <InputPhoneNumber
                      style={{ width: "85%" }}
                      country="US"
                      value={userForm.getFieldValue("phone")}
                      placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
                      className="ant-input textAlign-sm-marginLeft customInput primary-text"
                      error={"Phone number required"}
                      onKeyDown={limitPhoneNumber}
                      onChange={phoneNumberChange}
                    />
                  )}
                  {/* <Input
                    style={{ width: "85%" }}
                    placeholder="Contact Number"
                    className="textAlign-sm-marginLeft customInput2"
                  /> */}
                  <Input
                    onKeyDown={limitPhoneNumber}
                    hidden
                    placeholder=" Enter Phone number (e.g. xxx-xxx-xxxx)"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col xs={24} md={12}>
                <div className="primary-text fs-120 textAlign-sm-modalleft">
                  Email:
                </div>
                <Form.Item
                  name="email"
                  validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                  validateFirst="true"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    {
                      max: 50,
                      message: "Email should not be more than 50 characters!",
                    },
                    { type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input
                    style={{ width: "85%" }}
                    placeholder="Enter email"
                    className="textAlign-sm-marginLeft customInput"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <div className="primary-text fs-120 textAlign-sm-modalleft">
                  No. of Employees:
                </div>

                <Form.Item
                  name="noOfEmployees"
                  validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                  validateFirst="true"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select no of employees",
                //   },
                // ]}
                >
                  <Select
                    style={{ width: "85%" }}
                    placeholder="Select No of employees"
                    allowClear
                    showSearch
                    className="textAlign-sm-marginLeft customSelect"
                  >
                    {["1-10", "11-25", "26-50", "51-100", "100+"].map((e) => (
                      <Select.Option value={e}>{e}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>


            {getUserFromLocalStorage() !== "Individual" &&
              <Row>

                <Col xs={24} md={12}>
                  <div className="primary-text fs-120 textAlign-sm-modalleft">
                    Year Founded:
                </div>
                  <Form.Item
                    name="founded"
                    validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                    validateFirst="true"
                    rules={[
                      {
                        //required: true,message: 'Please input founded!',
                      },
                    ]}
                  >
                    {/* <Input
                      style={{ width: "85%" }}
                      placeholder="Enter founded"
                      className="textAlign-sm-marginLeft customInput"
                    /> */}
                    <Select
                      placeholder="Select state"
                      allowClear
                      showSearch
                      className="textAlign-sm-marginLeft customSelect"
                      style={{ width: "85%" }}
                    >
                      {years.map((e) => (
                        <Select.Option value={e}>{e}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>


                <Col xs={24} md={12}>
                  <div className="primary-text fs-120 textAlign-sm-modalleft">
                    Business Name:
                </div>
                  <Form.Item
                    name="businessName"
                    validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                    validateFirst="true"
                    rules={[
                      //{ required: true, message: 'Please enter your website name' },
                      {
                        required: true,
                        message: "Please enter valid business name",
                      },
                      {
                        min: 3,
                        message:
                          "Business name should not be less than 3 characters.",
                      },
                      {
                        max: 50,
                        message:
                          "Business name should not be more than 50 characters.",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "85%" }}
                      placeholder="Enter business name"
                      className="textAlign-sm-marginLeft customInput"
                    />
                  </Form.Item>
                </Col>
              </Row>
            }


            <Row>
              <Col xs={24} md={12}>
                <div className="primary-text fs-120 textAlign-sm-modalleft">
                  State:
                </div>
                <Form.Item
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
                    className="textAlign-sm-marginLeft customSelect"
                    onChange={stateChange}
                    style={{ width: "85%" }}
                  >
                    {states.map((e) => (
                      <Select.Option value={e.name}>{e.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <div className="primary-text fs-120 textAlign-sm-modalleft">
                  City:
                </div>
                <Form.Item
                  name="city"
                  validateFirst="true"
                  rules={[
                    { required: true, message: "Please select your city" },
                  ]}
                >
                  <Select
                    placeholder="Select city"
                    style={{ position: "absolute" }}
                    allowClear
                    showSearch
                    className="textAlign-sm-marginLeft customSelect"
                    style={{ width: "85%" }}
                  >
                    {cities.map((e) => (
                      <Select.Option value={e.name}>{e.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {getUserFromLocalStorage() !== "Individual" &&
              <Row>
                <Col xs={24} md={12}>
                  <div className="primary-text fs-120 textAlign-sm-modalleft">
                    Website:
                </div>
                  <Form.Item
                    name="website"
                    validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                    validateFirst="true"
                    rules={[
                      //{ required: true, message: 'Please enter your website name' },
                      {
                        pattern: new RegExp(
                          /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i
                        ),
                        message: "please enter valid website name",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "85%" }}
                      placeholder="Enter website"
                      className="textAlign-sm-marginLeft customInput"
                    />
                  </Form.Item>
                </Col>
              </Row>
            }

            <div className="primary-text fs-120 textAlign-sm-modalleft">
              About Us:
            </div>
            <Form.Item
              name="description"
              validateTrigger={finishClicked ? "onChange" : "onSubmit"}
              validateFirst="true"
              rules={[
                //{ required: true, message: 'Please enter your about us!' },
                {
                  max: 350,
                  message: "About us should not be more than 350 characters!",
                },
              ]}
            >
              <TextArea
                row={3}
                id="textarea"
                style={{ width: "95%", fontFamily: "Arial" }}
                placeholder="Enter About us"
                className="textAlign-sm-marginLeft customInput"
              />
            </Form.Item>

            <Space>
              <Button onClick={ChangeModal} className="secondary-button">
                Discard
              </Button>
              <Button
                htmlType="submit"
                className="secondary-button"
                onClick={onClick}
              >
                Save
              </Button>
            </Space>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default EditModal;
