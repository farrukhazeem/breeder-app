import React from "react";
import { Row, Col, Typography, Select, Space } from "antd";
import Button from "../../components/button/button";
import Card from "../../components/card/card";
import "../settings/paymentInfo.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import PackageCard from './PackageCard'

const { Title } = Typography;

function ConfirmCheckout(props) {
    const { creditCard, detail, tabIndex, changePkg, setvisible } = props

    return (
        <>
            <Title level={4} className="primarytext primary-text-heading">
                Change Package
            </Title>

            <Row gutter={15}>
                <Col xs={24} lg={12} className="textAlign-xs-box">
                    <Card className="secondary-background-grey" style={{ height: 210 }}>
                        <img
                            className="textAlign-sm-box"
                            width={"70"}
                            src={require(`../../../assets/images/stripe@2x.png`)}
                            alt="Logo"
                        />
                        <br />
                        <span className="fs-150 primary-text">Name of Card</span>
                        <span className="fs-150 secondary-text pos-lg-abs-right">
                            {creditCard.name}
                        </span>
                        <div></div>

                        <span className="fs-150 primary-text">Last Four Digits of IBAN</span>
                        <span className="fs-150 secondary-text pos-lg-abs-right">
                            {creditCard.card.last4}
                        </span>
                    </Card>
                    <br />
                </Col>


                <Col xs={24} lg={12} className="textAlign-xs-box">
                    <PackageCard detail={detail} tabIndex={tabIndex} />
                </Col>
            </Row>

            <Space>
                <Button className="register-form-button secondary-button"
                    onClick={() => setvisible(false)}>
                    Cancel
           </Button>
                <Button className="register-form-button secondary-button" onClick={() => changePkg()}>
                    Proceed to pay
           </Button>
            </Space>

        </>
    );
}

export default ConfirmCheckout;
