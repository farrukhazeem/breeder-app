import React from "react";
import Card from "../../../../../components/card/card";
import {
  List,
  Space,
  Avatar,
  Typography,
  Row,
  Col,
  Divider,
  Empty,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";

const { Text, Title } = Typography;

function CartView(props) {
  return (
    <div className="cart-view-body">
      <Card>
        <List
          className="demo-loadmore-list"
          header={
            <Row className="animal-cart-item">
              <Col span={10} style={{ fontWeight: "bolder" }}>
                Description
              </Col>
              <Col span={4} className="quantity">
                Qty
              </Col>
              <Col span={10} className="price">
                Amount
              </Col>
            </Row>
          }
          itemLayout="horizontal"
          dataSource={props.selectedAnimals}
          renderItem={(item) => (
            <List.Item>
              <Row className="animal-cart-item">
                <Col span={10}>
                  <Space className="">
                    <img
                      src={item.image ? item.image : require(`../../../../../../assets/images/gallery/1st image@2x.png`)}
                      style={{ borderRadius: "30px", width: 45, height: 45 }}
                      alt="logo"
                    />

                    <Space direction="vertical">
                      <Text strong style={{ fontSize: 20 }}>
                        {item.data.name}
                      </Text>
                      {/* <Text strong><span className="secondary-text">{item._id}</span></Text> */}
                    </Space>
                  </Space>
                </Col>
                <Col span={4} className="quantity">
                  <Text>{item.selectedQuantity}</Text>
                </Col>
                <Col span={10} className="price">
                  <b className="primary-text fs-120">$ {item.data.price}</b>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
      <br />
      <div className="animal-cart-item">
        <Row className="amount-calc-row">
          <Col span={12}>
            <Text className="secondary-text">Sub Amount</Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <b className="primary-text fs-120">$ {props.amount.subTotal}</b>
          </Col>
        </Row>
        <Row className="amount-calc-row">
          <Col span={12}>
            <Text className="secondary-text">Discount</Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <b className="primary-text fs-120">$ {props.discountAmount}</b>
          </Col>
        </Row>
        <Row className="amount-calc-row">
          <Col span={12}>
            <Text className="secondary-text">Sales Tax</Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <b className="primary-text fs-120">{props.animalTax}%</b>
          </Col>
        </Row>
        <Row className="amount-calc-row" style={{ fontSize: 18 }}>
          <Col span={12}>
            <Text className="secondary-text">Total Amount</Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <b className="primary-text fs-120">$ {props.amount.totalAmount - props.discountAmount}</b>
          </Col>
        </Row>
      </div>
      <Divider />
      <div className="animal-cart-item">
        <Row>
          <Col span={24}>
            <Text style={{ fontSize: 22 }}>Instalment Details</Text>
          </Col>
        </Row>

        {props.isInstallment ? (
          <>
            <Row className="amount-calc-row">
              <Col span={12}>
                <span className="primary-text fs-120">Down payment</span>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <b className="primary-text fs-120">$ {props.downPayment}</b>
              </Col>
            </Row>
            {props.installmentData.map((installment) => (
              <Row className="amount-calc-row">
                <Col span={12}>
                  <b className="secondary-text">
                    {installment.name} Instalment
                  </b>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <span className="primary-text">
                    $ {installment.amount} |{" "}
                    {moment(installment.date).format("DD MMM, YYYY")}
                  </span>
                </Col>
              </Row>
            ))}
          </>
        ) : (
            <div style={{ width: "100%", marginTop: 30 }}>
              <Empty description={"No Installment!"} />
            </div>
          )}

        <Divider />
      </div>
    </div>
  );
}

export default CartView;
