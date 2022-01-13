import React, { useState } from "react";
import { Space, Row, Col, Divider, Button, DatePicker, Form } from "antd";

import Cart from "../../../../../components/card/card";
import Input from "../../../../../components/input/input";
import moment from "moment";
import Emitter from "../../../../../services/Emitter";
import { CloseOutlined } from "@ant-design/icons";

const installmentTemp = {
  name: "",
  date: "",
  amount: "",
};
let incName = 0;
export default function PaymentInfo(props) {
  console.log(props);
  console.log(props.customerInfoForm.getFieldsValue());
  const names = [
    {
      name: "Solo",
      phone: "1111-01-0922111",
      amount: "100",
      image: "5th image@2x.png",
    },
    {
      name: "Cherry",
      phone: "222-01-0922114",
      amount: "150",
      image: "6th image@2x.png",
    },
    {
      name: "Oswald",
      phone: "1132-01-0922441",
      amount: "200",
      image: "7th image@2x.png",
    },
  ];

  const humanize = (number) => {
    if (number % 100 >= 11 && number % 100 <= 13) return number + "th";

    switch (number % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }

    return number + "th";
  };

  const onChange = (date, dateString) => {
    console.log("date picker changed");
    console.log(date);
    console.log(dateString);
  };

  const onChangePicker = (date, dateString, data, idx) => {
    console.log(idx);
    console.log(date);
    console.log(dateString);
    props.setInstallmentData(
      props.installmentData.map((val, i) =>
        i === idx ? { ...val, ...{ date } } : val
      )
    );
    console.log(props.installmentData[idx]);
  };

  const [show1, setshow1] = useState(false);
  // const [props.installmentData, setprops.installmentData] = useState([]);
  const [customerInfo] = useState(props.customerInfoForm.getFieldsValue());
  // const [downPayment, setDownPayment] = useState(0);
  Emitter.on("GET_INSTALLMENT_DATA", () => {
    console.log("emitting value");
    Emitter.emit("INSTALLMENT_DATA_PASSING", {});
  });

  const addInstallment = () => {
    // console.log([
    //   ...props.installmentData,
    //   ...[{ ...installmentTemp, ...{ name: "1st" } }],
    // ]);
    props.setInstallmentData([
      ...props.installmentData,
      ...[{ ...installmentTemp, ...{ name: humanize(++incName) } }],
    ]);
    // console.log(props.installmentData);
  };

  const cancelInstallment = (idx) => {
    props.setInstallmentData(
      props.installmentData.filter((idata, iindex) => iindex !== idx))
  }

  const payInInstallment = () => {
    props.setIsInstallment(true);
    if (!props.installmentData[0]) addInstallment();
  };

  const cancelpayInInstallment = () => {
    props.setIsInstallment(false);
    props.setInstallmentData([]);
    incName = 0;
    // if (!props.installmentData[0]) addInstallment();
  };

  return (
    <div>
      <br />
      <div className="primary-text primary-text-heading">
        Payment Information
      </div>

      <Row justify="space-between">
        <Col xs={24} lg={18}>
          <Row>
            <Col xs={12} lg={6}>
              <Space direction="vertical">
                <div className="secondary-text">Name:</div>
                <div className="primary-text">{props.selectedBreeder.name}</div>
              </Space>
            </Col>

            <Col xs={12} lg={6}>
              <Space direction="vertical">
                <div className="secondary-text">Phone:</div>
                <div className="primary-text">
                  {props.selectedBreeder.phone}
                </div>
              </Space>
            </Col>

            <Col xs={12} lg={6}>
              <Space direction="vertical">
                <div className="secondary-text">Email:</div>
                <div className="primary-text">
                  {props.selectedBreeder.email}
                </div>
              </Space>
            </Col>

            <Col xs={12} lg={6}>
              <Space direction="vertical">
                <div className="secondary-text">Address:</div>
                <div className="primary-text">
                  {props.selectedBreeder.city}, {props.selectedBreeder.state}
                </div>
              </Space>
            </Col>
          </Row>
          <br />
          <Cart className="secondary-background-grey">
            <div className=" fs-150">Order Details</div>
            <br />

            {props.selectedAnimals.map((e) => (
              <Row>
                <Col>
                  <Space>
                    <img
                      src={
                        e.image
                          ? e.image
                          : require(`../../../../../../assets/images/gallery/1st image@2x.png`)
                      }
                      style={{ borderRadius: "30px", width: 50, height: 50 }}
                      alt="logo"
                    />
                    <Space direction="vertical" style={{ marginLeft: "10px" }}>
                      <div className="primary-text">{e.data.name}</div>
                      <div className="secondary-text">{e.data.phone}</div>
                    </Space>
                  </Space>
                </Col>

                <Col
                  span={12}
                  style={{
                    position: "absolute",
                    right: "20px",
                    marginTop: "10px",
                  }}
                >
                  <b className="fs-120 primary-text">${e.data.price}</b>
                </Col>
              </Row>
            ))}
          </Cart>

          <Cart className="" style={{ border: "transparent" }}>
            <Row>
              <Col>
                <div className="secondary-text fs-120">Sub amount</div>
              </Col>
              <Col
                span={12}
                style={{
                  position: "absolute",
                  right: "20px",
                  marginTop: "10px",
                }}
              >
                <b className="fs-120 primary-text">${props.amount.subTotal}</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="secondary-text fs-120">Discount</div>
              </Col>
              <Col
                span={12}
                style={{
                  position: "absolute",
                  right: "20px",
                  marginTop: "10px",
                }}
              >
                <b className="fs-120 primary-text">${props.discountAmount}</b>
              </Col>
            </Row>


            <Row>
              <Col>
                <div className="secondary-text fs-120">Sales Tax</div>
              </Col>
              <Col
                span={12}
                style={{
                  position: "absolute",
                  right: "20px",
                  marginTop: "10px",
                }}
              >
                <b className="fs-120 primary-text">{props.animalTax}%</b>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="secondary-text fs-120">Total amount</div>
              </Col>
              <Col
                span={12}
                style={{
                  position: "absolute",
                  right: "20px",
                  marginTop: "10px",
                }}
              >
                <b className="fs-180 primary-color ">
                  ${props.amount.totalAmount - props.discountAmount}
                </b>
              </Col>
            </Row>
          </Cart>

          <Divider />

          <Cart
            style={{
              textAlign: "center",
              color: "black",
              border: "2px solid",
              cursor: "pointer",
            }}
          >
            <b onClick={payInInstallment} className="fs-120">
              Pay in Instalments
            </b>
            <CloseOutlined
              onClick={cancelpayInInstallment}
              style={{ float: "right", marginTop: 7 }}
            />
          </Cart>

          <div>
            {props.isInstallment ? (
              <div>
                <div className="fs-120 primary-text margin-top-10">
                  Down Payment
                </div>
                <Form.Item
                  validateTrigger={"onChange"}
                  rules={[
                    { required: true, message: "Down payment is required!" },
                  ]}
                  name="downpayment"
                >
                  <Input
                    value={props.downPayment}
                    onChange={(e) => props.setdownPayment(e.target.value)}
                    className="margin-top-10"
                  />
                </Form.Item>
              </div>
            ) : (
                ""
              )}

            <br />
            {}

            {props.installmentData[0]
              ? props.installmentData.map((e, idx) => (
                <div>
                  <br />
                  <div className="fs-180">{e.name} installment</div>
                  <Cart className="secondary-background-grey">
                    <CloseOutlined style={{ float: "inline-end" }}
                      onClick={() => cancelInstallment(idx)}
                    />
                    <Row justify="space-between" gutter={12}>
                      <Col xs={12}>
                        <div className="fs-120 primary-text margin-top-10">
                          Installment date
                          </div>
                        {/* <Input value={e.date} className="margin-top-10" /> */}
                        <DatePicker
                          format={"DD MMM, YYYY"}
                          value={e.date}
                          onChange={(date, dateString) =>
                            onChangePicker(date, dateString, e, idx)
                          }
                          style={{
                            padding: 8,
                            borderRadius: 8,
                            width: "100%",
                            marginTop: 10,
                          }}
                        />
                      </Col>
                      <Col xs={12}>
                        <div className="fs-120 primary-text margin-top-10">
                          Amount
                          </div>
                        <Input
                          onChange={(val) => {
                            console.log(val.target.value);
                            props.setInstallmentData(
                              props.installmentData.map((idata, iindex) =>
                                iindex === idx
                                  ? { ...idata, amount: val.target.value }
                                  : idata
                              )
                            );
                          }}
                          className="margin-top-10"
                        />
                      </Col>
                    </Row>
                  </Cart>
                </div>
              ))
              : ""}

            {/* {showInstallment ?
                            ['1st', '2nd'].map((e) => (
                                <div>
                                    <br />
                                    <div className="fs-180">{e} installment</div>
                                    <Cart className="secondary-background-grey">
                                        <Row justify="space-between" gutter={12}>
                                            <Col xs={12}>

                                                <div className="fs-120 primary-text margin-top-10">Installment date</div>
                                                <Input value="15th March,2020" className="margin-top-10" />
                                            </Col>
                                            <Col xs={12}>
                                                <div className="fs-120 primary-text margin-top-10">Amount</div>
                                                <Input value="$ 200.00" className="margin-top-10" />
                                            </Col>
                                        </Row>
                                    </Cart>
                                </div>
                            ))
                            : ''
                        } */}
          </div>

          <br />
          {props.isInstallment ? (
            <Cart style={{}}>
              <b className="fs-120 primary-text">Add Instalment</b>
              <Button
                style={{
                  borderRadius: "9px",
                  border: "transparent",
                  float: "right",
                }}
                className="secondary-button primary-contrast-text"
                onClick={addInstallment}
              >
                +
              </Button>
            </Cart>
          ) : (
              ""
            )}
        </Col>

        <Col>
          {" "}
          <img
            src={props.selectedBreeder.image ? props.selectedBreeder.image : require(`../../../../../../assets/images/Business@2x.png`)}
            style={{ borderRadius: "80px", marginTop: "-60px" }}
            width={"120"}
            alt="logo"
          />
        </Col>
      </Row>
    </div>
  );
}
