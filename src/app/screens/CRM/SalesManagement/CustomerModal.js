import React, { useEffect, useState } from "react";
import { Modal, Typography, Form, Space, message, Input, Select } from "antd";
import Button from "../../../components/button/button";
import { useDispatch } from "react-redux";
import InputPhoneNumber from "react-phone-number-input/input";

import {
  getCityByState,
  getStates,
} from "../../../redux/actions/location_action";
import {
  DisableLoader,
  EnableLoader,
} from "../../../redux/actions/loader_action";
import passwordGenerator from "../../../config/passwordGenerator";
import { registerUser } from "../../../redux/actions/user_actions";

const { Title } = Typography;
const { Option } = Select;

function CustomerModal(props) {
  const [breederForm] = Form.useForm();
  const { modalCustomervisible, ChangeModalCustomer, getBreedersForCustomer } = props;
  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getState();
  }, []);
  const onFinish = (values) => {
    console.log(values)
    ChangeModalCustomer();
    registerBreeder(values);
  };
  const getState = () => {
    dispatch(getStates()).then((response) => {
      //console.log(response);
      if (response.payload.status === 200) {
        setstates(response.payload.data);
      }
    });
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
      props.customerInfoForm.setFieldsValue({ city: undefined });
      console.log(value);
    }
  };


  const limitPhoneNumber = (element) => {
    if (
      breederForm.getFieldValue("phone") &&
      breederForm.getFieldValue("phone").length > 11
    ) {
      element.preventDefault();
    }
  };

  const phoneNumberChange = (value) => {
    breederForm.setFieldsValue({ phone: value });
  };

  const registerBreeder = (values) => {
    dispatch(EnableLoader());
    const data = {
      ...values,
      password: passwordGenerator.generate(10),
      addedBy: localStorage.getItem('userId'),
      businessName: '',
      noOfEmployees: '',
      verified: true,
    }
    dispatch(registerUser(data)).then(response => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        getBreedersForCustomer('');

        breederForm.resetFields();
      } else {
        message.error(response.payload.message);
      }
    });
  }

  return (
    <>
      <Modal visible={modalCustomervisible} footer={null} closable={false}>
        <div style={{ paddingRight: "20px" }}>
          <Form form={breederForm} onFinish={onFinish}>
            <Title level={3} strong>
              Add a new Customer
            </Title>
            <br />
            <div className="primary-text fs-120 textAlign-sm-modalleft">
              Name:
            </div>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name!",
                },
              ]}
            >
              <Input
                style={{ width: "90%" }}
                placeholder="Enter name"
                className="textAlign-sm-marginLeft customInput"
              />
            </Form.Item>

            <div className="primary-text fs-120 textAlign-sm-modalleft">
              Email:
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input email!",
                },
              ]}
            >
              <Input
                style={{ width: "90%" }}
                placeholder="Enter email address"
                className="textAlign-sm-marginLeft customInput"
              />
            </Form.Item>

            <div className="primary-text fs-120 textAlign-sm-modalleft">
              Phone:
            </div>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input phone!",
                },
                { min: 12, message: "Mobile number is invalid" },
              ]}
            >
              <Input
                onKeyDown={limitPhoneNumber}
                hidden
                placeholder=" Enter Phone number (e.g. xxx-xxx-xxxx)"
              />
              <InputPhoneNumber
                country="US"
                style={{ width: "90%" }}
                value={breederForm.getFieldValue("phone")}
                placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
                className="ant-input textAlign-sm-marginLeft customInput primary-text"
                error={"Phone number required"}
                onKeyDown={limitPhoneNumber}
                onChange={phoneNumberChange}
              //   suffix={

              //   }
              />
            </Form.Item>



            <div className="primary-text fs-120 textAlign-sm-modalleft">
              State:
            </div>
            <Form.Item
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please input state!",
                },
              ]}
            >
              <Select
                placeholder="Select state"
                allowClear
                showSearch

                className="textAlign-sm-marginLeft customSelect"

                onChange={stateChange}
                style={{ width: "90%" }}
              >
                {states.map((e) => (
                  <Select.Option value={e.name}>{e.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>



            <div className="primary-text fs-120 textAlign-sm-modalleft">
              City:
            </div>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input city!",
                },
              ]}
            >
              <Select
                placeholder="Select city"
                allowClear
                showSearch
                className="textAlign-sm-marginLeft customSelect"
                style={{ width: "90%" }}
              >
                {cities.map((e) => (
                  <Select.Option value={e.name}>{e.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <div className="primary-text fs-120 textAlign-sm-modalleft">
              Address:
            </div>
            <Form.Item
              name="address"
            >
              <Input
                style={{ width: "90%" }} id="address"
                placeholder="Enter address"
                className="textAlign-sm-marginLeft customInput"
              />
            </Form.Item>

            <Space>
              <Button
                className="secondary-button"
                onClick={ChangeModalCustomer}
              >
                Discard
              </Button>
              <Button className="secondary-button" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default CustomerModal;
