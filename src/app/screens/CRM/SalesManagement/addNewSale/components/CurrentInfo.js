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
  Select,
  AutoComplete,
} from "antd";
import Card from "../../../../../components/card/card";
import Input from "../../../../../components/input/input";
import InputPhoneNumber from "react-phone-number-input/input";
import { useDispatch } from "react-redux";
import {
  DisableLoader,
  EnableLoader,
} from "../../../../../redux/actions/loader_action";
import { getAllBreeder } from "../../../../../redux/actions/user_actions";
import AllBreedersTable from "./AllBreedersTable";
import Button from "../../../../../components/button/button";
import { getCityByState, getStates } from "../../../../../redux/actions/location_action";

const { Title, Text } = Typography;

export default function CurrentInfo(props) {
  const [breeders, setbreeders] = useState([]);
  const [displayType, setDisplayType] = useState("new");
  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [delay, setDelay] = useState({ typing: false, typingTimeout: 0 })
  const dispatch = useDispatch();
  useEffect(() => {
    getBreedersForCustomer('');
    getState();
  }, []);

  const getState = () => {
    dispatch(getStates()).then((response) => {
      //console.log(response);
      if (response.payload.status === 200) {
        setstates(response.payload.data);
      }
    });
  }

  const getBreedersForCustomer = (keyword) => {
    dispatch(EnableLoader());
    dispatch(getAllBreeder(keyword)).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        var resArr = [];
        response.payload.data.forEach(function (item) {
          var i = resArr.findIndex(x => x.name == item.name);
          if (i <= -1) { resArr.push(item); }
        });
        setbreeders(resArr.filter((e) => !(e._id === props.user._id))
          // response.payload.data.filter((e) => !(e._id === props.user._id))
        );
      }
    });
  }

  const getBreedersForCareGiver = (keyword) => {
    dispatch(EnableLoader());
    dispatch(getAllBreeder(keyword, "uid")).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        var resArr = [];
        response.payload.data.forEach(function (item) {
          var i = resArr.findIndex(x => x.uid == item.uid);
          if (i <= -1) { resArr.push(item); }
        });
        setbreeders(resArr.filter((e) => !(e._id === props.user._id))
          // response.payload.data.filter((e) => !(e._id === props.user._id))
        );
      }
    });
  }


  const limitPhoneNumber = (element) => {
    console.log(element);
    console.log(props.customerInfoForm.getFieldValue("phone"));
    if (
      props.customerInfoForm.getFieldValue("phone") &&
      props.customerInfoForm.getFieldValue("phone").length > 11
    ) {
      element.preventDefault();
    }
  };

  const phoneNumberChange = (value) => {
    props.customerInfoForm.setFieldsValue({ phone: value });
  };

  const changeDisplayType = (type) => {
    setDisplayType(type)
    props.setSelectedBreeder(null);
    props.customerInfoForm.resetFields();
  }

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

  const [phoned, setphoned] = useState(null)
  const onSelectAutocomplete = (value, data) => {
    console.log(value, "<---value");
    console.log(data, "<---data");
    props.onSelectBreeder(data)
    props.customerInfoForm.setFieldsValue(data);
    setphoned(data.phone)
  }

  const onSearchAutocomplete = (searchKeyword) => {
    console.log(searchKeyword);

    setDelay({
      typing: true,
      typingTimeout: setTimeout(function () {
        getBreedersForCustomer(searchKeyword);
      }, 1000)
    })
  }

  const onSearchAutocomplete2 = (searchKeyword) => {
    console.log(searchKeyword);

    setDelay({
      typing: true,
      typingTimeout: setTimeout(function () {
        getBreedersForCareGiver(searchKeyword);
      }, 1000)
    })
  }


  const clearSelectedBreeder = () => {
    setphoned("")
    props.setSelectedBreeder(null)
    props.customerInfoForm.resetFields();
  }

  return (
    <div key={props.key} style={{ marginTop: 30 }}>
      {displayType === "existing" && (
        <Card className="secondary-background-grey">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={3}>Search Breeder</Title>
            {/* <Button onClick={() => changeDisplayType('new')}>Add New Breeder</Button> */}
          </div>
          <AllBreedersTable {...props} breeders={breeders} getBreedersForCustomer={getBreedersForCustomer} />
        </Card>
      )}

      {displayType === "new" && (
        <Card className="secondary-background-grey">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={3}>Customer Info</Title>
            <Button onClick={() => clearSelectedBreeder()}>Clear</Button>
          </div>

          <Form form={props.customerInfoForm} layout={"vertical"}
          >
            <Row gutter={10}>

              <Col span={12}>
                <Form.Item label="Care Giver Id" name="careGiverId" validateFirst="true"
                  rules={[
                    {
                      pattern: new RegExp(/^[0-9]+$/i),
                      message: "characters and special characters not allowed"
                    },
                  ]}
                >
                  <AutoComplete placeholder="Care Giver Id" className="autocomplete-custom-input primary-text" autoClearSearchValue={true} disabled={props.selectedBreeder ? true : false} options={breeders.map(e => ({ ...e, value: e.uid }))} onSelect={onSelectAutocomplete}
                    onSearch={onSearchAutocomplete2}
                  />
                  {/* <Input placeholder="Enter name" /> */}


                </Form.Item>
              </Col>


              <Col span={12}>
                <Form.Item label="Name" name="name" validateFirst="true"
                  rules={[
                    { required: true, message: 'Please enter name' },
                    {
                      pattern: new RegExp(/^[a-zA-Z ]+$/i),
                      message: "numbers and special characters not allowed"
                    },
                    { min: 3, message: 'Name should not be less than 3 characters.' },
                    { max: 50, message: 'Name should not be more than 50 characters.' },]}
                >
                  <AutoComplete placeholder="Enter name" className="autocomplete-custom-input primary-text" autoClearSearchValue={true} disabled={props.selectedBreeder ? true : false} options={breeders.map(e => ({ ...e, value: e.name }))} onSelect={onSelectAutocomplete}
                    onSearch={onSearchAutocomplete}
                  />
                  {/* <Input placeholder="Enter name" /> */}


                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email" validateFirst="true"
                  rules={[
                    { required: true, message: 'Please enter email!' },
                    { type: 'email', message: 'Invalid email' },
                    { max: 50, message: 'Email should not be more than 50 characters!' },
                  ]}>
                  <Input placeholder="Enter email" className="customSelect" disabled={props.selectedBreeder ? true : false} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="State"
                  name="state"
                  validateFirst="true"
                  rules={[
                    { required: true, message: "Please select your state" },
                  ]}
                >
                  <Select
                    placeholder="Select state"
                    allowClear
                    disabled={props.selectedBreeder ? true : false}
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
              <Col span={12}>
                <Form.Item
                  label="City"
                  name="city"
                  validateFirst="true"
                  rules={[{ required: true, message: "Please select your city" }]}
                >
                  <Select
                    placeholder="Select city"
                    allowClear
                    showSearch
                    disabled={props.selectedBreeder ? true : false}
                    className="customSelect"
                  >
                    {cities.map((e) => (
                      <Select.Option value={e.name}>{e.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item label="Address" name="address">
                  <Input placeholder="Enter customer address" />
                </Form.Item>
              </Col> */}


              <Col span={12}>
                <Form.Item
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                    // { min: 12, message: "Mobile number is invalid" },
                    // {
                    //   pattern: new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/i),
                    //   message: "Mobile number is invalid"
                    // },
                  ]}
                  name="phone"
                >
                  {!phoned ?
                    <>
                      <Input value={props.customerInfoForm.getFieldValue("phone")}
                        onKeyDown={limitPhoneNumber}
                        hidden
                        placeholder=" Enter Phone number (e.g. xxx-xxx-xxxx)"
                      />
                      <InputPhoneNumber
                        country="US"
                        value={props.customerInfoForm.getFieldValue("phone")}
                        placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
                        className="ant-input customInput primary-text"
                        error={"Phone number required"}
                        onKeyDown={limitPhoneNumber}
                        onChange={phoneNumberChange}
                        disabled={props.selectedBreeder ? true : false}
                      //   suffix={

                      //   }
                      />
                    </>
                    :

                    <Input value={phoned} placeholder="Enter phone" className="customSelect" disabled={props.selectedBreeder ? true : false} />
                  }
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Card>
      )}
    </div>
  );
}
