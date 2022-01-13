import React, { useEffect, useState } from "react";
import { Form, Space, Typography, message, Modal, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../components/button/button";
import InputNumber from "../../../components/numberInput/NumberInput";
import CurrentInfo from "../../CRM/SalesManagement/addNewSale/components/CurrentInfo";
import {
  DisableLoader,
  EnableLoader,
} from "../../../redux/actions/loader_action";
import { getAllBreeder, registerUser } from "../../../redux/actions/user_actions";
import passwordGenerator from "../../../config/passwordGenerator";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { transferAnimal } from "../../../redux/actions/animal_action";

export default function TransferModal(props) {
  const dispatch = useDispatch();
  const { animal, setvisible, visible } = props;
  console.log(animal);
  let user = useSelector((state) => state.user);
  const [customerInfoForm] = Form.useForm();
  const [formqty] = Form.useForm();

  const [selectedBreeder, setSelectedBreeder] = useState(null);
  const key = 1;
  const onSelectBreeder = (breeder) => {
    setSelectedBreeder(breeder);
    customerInfoForm.setFieldsValue({
      name: breeder.name,
      phone: breeder.phone,
      email: breeder.email,
    });
    console.log(breeder);
    console.log("fields selected");
  };

  const TransferDispatch = () => {
    dispatch(EnableLoader());
    dispatch(getAllBreeder()).then((response) => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        setvisible(false);
      } else {
        message.error(response.payload.message);
      }
    });
  };


  const onTransferAnimalModal = async (detail = null) => {
    const data = {
      animalId: animal._id, quantity: Values.quantity, buyerId: selectedBreeder ? selectedBreeder._id : detail._id, sellerId: localStorage.getItem('userId'), breederId: localStorage.getItem('userId'),
    }
    dispatch(EnableLoader());
    dispatch(transferAnimal(data)).then(response => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        alert(response.payload.message)
        message.success(response.payload.message);
        setSelectedBreeder(null);
        customerInfoForm.resetFields();
        // props.refreshData();
        setvisible(false);
        window.location.reload();
      } else {
        message.error(response.payload.message);
      }
    });
  }


  const onAddBreederModal = () => {
    console.log(Values, "<---")
    dispatch(EnableLoader());
    const data = {
      ...Values,
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
        //message.success(response.payload.message);
        message.success("New Breeder Registered");
        setSelectedBreeder(response.payload.data);
        onTransferAnimalModal(response.payload.data)
      } else {
        message.error(response.payload.message);
      }
    });
  }


  const HandleSubmit = () => {
    if (!selectedBreeder) {
      onAddBreederModal()
    } else {
      onTransferAnimalModal()
    }
  };

  const [formIndex, setformIndex] = useState(0)
  const [Customer, setCustomer] = useState(null)
  const [Values, setValues] = useState(null)
  const HandleCustomer = async () => {
    console.log(customerInfoForm.getFieldsValue(), "<--")
    if (selectedBreeder) {
      setCustomer(selectedBreeder)
    }
    else {
      setCustomer(customerInfoForm.getFieldsValue())
    }
    await customerInfoForm.validateFields();
    setformIndex(1)
  }

  const HandleQuantity = async (values) => {
    if (values.quantity && values.quantity <= animal.healthyQuantity) {
      setValues({ ...values, ...Customer })
      setformIndex(2)
    } else {
      message.error(`Quantity exceed (max possible ${animal.healthyQuantity})`);
    }
  }

  return (
    <div>
      <Modal
        style={{ minWidth: "850px" }}
        visible={visible}
        footer={null}
        closable={false}
        centered={true}
      >
        <div style={{ padding: "20px" }}>
          <Typography.Title level={3} strong>
            {"Transfer Animal"}
          </Typography.Title>

          {formIndex === 0 ?
            <Form
              // form={form}
              onFinish={HandleCustomer}
            // onValuesChange={quantityChange}
            // initialValues={props.data}
            >

              <CurrentInfo
                customerInfoForm={customerInfoForm}
                setSelectedBreeder={setSelectedBreeder}
                onSelectBreeder={onSelectBreeder}
                key={1}
                user={user}
                selectedBreeder={selectedBreeder}
              />

              <Space>
                <Button
                  className="secondary-button"
                  onClick={() => setvisible(false)}
                >
                  Close
              </Button>

                <Button className="secondary-button" htmlType="submit">
                  Next
              </Button>
              </Space>
            </Form>

            :
            formIndex === 1 ?

              <Form onFinish={HandleQuantity} initialValues={{ quantity: Values && Values.quantity }}>

                <Row>
                  <Col xs={12}>
                    <Row style={{ marginTop: "15px" }}>
                      <Col xs={12} className="primary-text fs-120 fws-120">
                        Animal ID:
                    </Col>
                      <Col xs={12} className="primary-text fs-120" style={{ textAlign: "initial" }}>
                        <Typography.Text > {animal && animal._id.substr(0, 6)}</Typography.Text>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "15px" }}>
                      <Col xs={12} className="primary-text fs-120 fws-120">
                        Animal Name:
                    </Col>
                      <Col xs={12} className="primary-text fs-120" style={{ textAlign: "initial" }}>
                        <Typography.Text > {animal?.data?.name}</Typography.Text>
                      </Col>
                    </Row>
                  </Col>


                  <Col xs={12}>
                    <div style={{}}>
                      <Space >
                        <b
                          style={{ fontSize: "15px", marginTop: -10 }}
                          className="secondary-text"
                        >
                          Quantity
                    </b>

                        <Form.Item
                          style={{ marginTop: 25 }}
                          name="quantity"
                          rules={[{ required: true, message: "Please enter quantity" }]}
                        >
                          <InputNumber
                            placeholder={""}
                            min={1}
                            max={1000}
                          />
                        </Form.Item>
                      </Space>
                    </div>
                  </Col>

                </Row>


                <Space style={{ marginTop: 30 }}>
                  <Button
                    className="secondary-button"
                    onClick={() => setformIndex(0)}
                  // onClick={() => setvisible(false)}
                  >
                    Back
              </Button>

                  <Button className="secondary-button" htmlType="submit">
                    Next
              </Button>
                </Space>
              </Form>

              :
              <div>
                <Row>
                  <Col xs={12}>

                    <Row style={{ marginTop: "15px" }}>
                      <Col xs={9} className="primary-text fs-120 fws-120">
                        Name:
                    </Col>
                      <Col xs={15} className="primary-text fs-120" style={{ textAlign: "initial" }}>
                        <Typography.Text> {Values.name}</Typography.Text>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "15px" }}>
                      <Col xs={9} className="primary-text fs-120 fws-120">
                        Email:
                    </Col>
                      <Col xs={15} className="primary-text fs-120" style={{ textAlign: "initial" }}>
                        <Typography.Text>{Values.email}</Typography.Text>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "15px" }}>
                      <Col xs={9} className="primary-text fs-120 fws-120">
                        Phone:
                    </Col>
                      <Col xs={15} className="primary-text fs-120" style={{ textAlign: "initial" }}>
                        <Typography.Text> {Values?.phone}</Typography.Text>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={1}></Col>
                  <Col xs={11}>
                    <Row style={{ marginTop: "15px" }}>
                      <Col xs={9} className="primary-text fs-120 fws-120">
                        Animal ID:
                    </Col>
                      <Col xs={15} className="primary-text fs-120" style={{ textAlign: "initial" }}>
                        <Typography.Text > {animal && animal._id.substr(0, 6)}</Typography.Text>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "15px" }}>
                      <Col xs={9} className="primary-text fs-120 fws-120">
                        Animal Name:
                    </Col>
                      <Col xs={15} className="primary-text fs-120" style={{ textAlign: "initial" }}>
                        <Typography.Text > {animal?.data?.name}</Typography.Text>
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "15px" }}>
                      <Col xs={9} className="primary-text fs-120 fws-120">
                        Quantity:
                    </Col>
                      <Col xs={15} className="primary-text fs-120" style={{ textAlign: "initial" }}>
                        <Typography.Text> {Values?.quantity}</Typography.Text>
                      </Col>
                    </Row>
                  </Col>

                </Row>

                <Space style={{ marginTop: 30 }}>
                  <Button
                    className="secondary-button"
                    onClick={() => { setformIndex(1) }}
                  >
                    Back
              </Button>

                  <Button className="secondary-button" onClick={() => HandleSubmit()}>
                    Confirm
              </Button>
                </Space>
              </div>
          }

        </div>
      </Modal>
    </div>
  );
}
