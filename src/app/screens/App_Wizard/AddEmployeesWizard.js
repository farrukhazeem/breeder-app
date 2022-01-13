import React, { useEffect, useState } from "react";
import {
  Steps,
  Row,
  Col,
  Typography,
  Form,
  Space,
  Divider,
  Modal,
  message,
  List,
  Alert,
  Select,
} from "antd";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getCityByState, getStates } from "../../redux/actions/location_action";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import InputPhoneNumber from "react-phone-number-input/input";

const { Title, Text } = Typography;
export default function AddEmployeesWizard(props) {
  console.log('in app wizard');
  const { employeeArray, setEmployeeArray } = props;
  const [employee, setEmployee] = useState({
    id: 0,
    name: "",
    phone: "",
    email: "",
    state: null,
    city: null,
    finish: false,
    submit: false,
  });

  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  //   const [employeeArray, setEmployeeArray] = useState([employee]);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('useeffect called');

    if (!employeeArray[0]) {
      console.log('row called');
      addRow();
    }
    getData();
  }, []);

  const getData = () => {
    dispatch(getStates()).then((response) => {
      //console.log(response);
      if (response.payload.status === 200) {
        setstates(response.payload.data);
      }
    });
  };

  const addRow = () => {
    setEmployeeArray([...employeeArray, ...[{ ...employee, id: employeeArray.length + 1 }]]);
    console.log(employeeArray);
  };

  const stateChange = (value) => {
    // if (value) {
    dispatch(EnableLoader());
    //console.log(value);
    let id = states.filter((state, index, array) => state.name === value)[0].id;
    dispatch(getCityByState(id)).then((response) => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        setcities(response.payload.data);
      }
    });
    // } else {
    //   businessForm.setFieldsValue({ city: undefined });
    //   console.log(value);
    // }
  };

  const limitPhoneNumber = (element, index) => {
    console.log(element);
    console.log(employeeArray[index].phone);
    if (employeeArray[index].phone && employeeArray[index].phone.length > 11) {
      element.preventDefault();
    }
  };

  const phoneNumberChange = (value, index) => {
    console.log(value);
    // businessForm.setFieldsValue({ phone: value })
    employeeArray[index] = { ...employeeArray[index], ...{ phone: value } };
    setEmployeeArray(employeeArray);
  };

  const finishRow = (index) => {
    console.log('finish row called');
    employeeArray[index] = { ...employeeArray[index], ...{ finish: true } };
    setEmployeeArray(employeeArray);
    addRow();
  };

  const submitClick = (index) => {
    console.log('submit click called');
    employeeArray[index] = { ...employeeArray[index], ...{ submit: true } };
    console.log(employeeArray[index]);
    setEmployeeArray(employeeArray);

  };

  const removeClick = (index) => {
    console.log(index);
    setEmployeeArray(employeeArray.filter((value, i, array) => !(i == index)));
  }

  return (
    <div className="inner-stepper-body">
      <Title level={3}>Add your Team Members</Title>
      <div>
        {employeeArray.map((empArr, index) => (
          <div className="employee-input-row">
            <Form
              initialValues={empArr}
              onFinish={() => finishRow(index)}
              onValuesChange={(value) => {
                console.log("change");
                console.log(value);
                employeeArray[index] = { ...employeeArray[index], ...value };
                setEmployeeArray(employeeArray);
              }}
            >
              <Row gutter={20} justify={"center"}>
                <Col span={4}>
                  <Form.Item
                    name="name"
                    validateFirst="true"
                    rules={[
                      { required: true, message: "Please enter full name" },
                      {
                        pattern: new RegExp(/^[a-zA-Z ]+$/i),
                        message: "Numbers and special characters not allowed",
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
                    validateTrigger={empArr.submit ? "onChange" : "onSubmit"}
                  // rules={[
                  //   { required: true, message: "Please input your email!" },
                  //   { type: "email", message: "Please provide valid email!" },
                  //   { max: 50, message: "Maximum 50 characters are required!" },
                  // ]}
                  >
                    <Input placeholder="Enter name" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name="phone"
                    validateTrigger={empArr.submit ? "onChange" : "onSubmit"}
                    validateFirst="true"

                  // rules={[
                  //     { required: true, message: 'Please enter your phone number' },
                  //     { min: 12, message: 'Mobile number is invalid' }

                  //   ]}
                  >
                    <Input
                      onKeyDown={limitPhoneNumber}
                      hidden
                      value={empArr.phone}
                      placeholder=" Enter Phone number (e.g. xxx-xxx-xxxx)"
                    />
                    <InputPhoneNumber
                      country="US"
                      value={empArr.phone}
                      placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
                      className="ant-input customInput primary-text"
                      error={"Phone number required"}
                      onKeyDown={(value) => limitPhoneNumber(value, index)}
                      onChange={(value) => phoneNumberChange(value, index)}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name="email"
                    validateFirst="true"
                    validateTrigger={empArr.submit ? "onChange" : "onSubmit"}
                    rules={[
                      { required: true, message: "Please enter your email!" },
                      {
                        max: 50,
                        message: "Email should not be more than 50 characters!",
                      },
                      { type: "email", message: "Invalid email" },
                    ]}
                  >
                    <Input placeholder="Enter email" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name="state"
                    validateFirst="true"
                    validateTrigger={empArr.submit ? "onChange" : "onSubmit"}
                    rules={[
                      { required: true, message: "Please select your state" },
                    ]}

                  // validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                  // rules={[
                  //   { required: true, message: "Please input your email!" },
                  //   { type: "email", message: "Please provide valid email!" },
                  //   { max: 50, message: "Maximum 50 characters are required!" },
                  // ]}
                  >
                    <Select
                      placeholder="Select state"
                      allowClear
                      showSearch
                      className="customSelect"
                      onChange={stateChange}
                    >
                      {states.map((e) => (
                        <Select.Option value={e.name}>{e.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name="city"
                    validateFirst="true"
                    validateTrigger={empArr.submit ? "onChange" : "onSubmit"}
                    rules={[
                      { required: true, message: "Please select your city" },
                    ]}

                  // validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                  // rules={[
                  //   { required: true, message: "Please input your email!" },
                  //   { type: "email", message: "Please provide valid email!" },
                  //   { max: 50, message: "Maximum 50 characters are required!" },
                  // ]}
                  >
                    <Select
                      placeholder="Select city"
                      allowClear
                      showSearch
                      className="customSelect"
                    >
                      {cities.map((e) => (
                        <Select.Option value={e.name}>{e.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col>
                  {!empArr.finish && employeeArray.length - 1 === index ? (
                    <Button
                      onClick={() => submitClick(index)}
                      htmlType="submit"
                    >
                      <PlusOutlined />
                    </Button>
                  ) : (
                      <Button></Button>
                      //   <Button
                      //   onClick={() => removeClick(index)}
                      //   type="button"
                      //   // onClick={() => {console.log(employeeArray); console.log(`index=${index}`); setEmployeeArray(employeeArray.filter((value, i, array) => !(value.id===empArr.id))); }}
                      // >                // <CloseOutlined />
                      // </Button>
                    )}
                </Col>
              </Row>

            </Form>


          </div>
        ))}
      </div>
    </div>
  );
}
