import React from "react";
import { Col, Row, Space, Typography } from "antd";
import Card from "../../../../components/card/card";
const { Title } = Typography;

export default function FormMain(props) {
    return (

        <div style={{
            position: "absolute",
            top: "50%", left: "50%", marginTop: "-150px", marginLeft: "-150px",
        }}>
            <span style={{ marginLeft: 120 }} className="primary-text fw-100">Create Category</span>
            <br /> <br />
            <Row gutter={30} >
                <Col span={12} style={{ textAlign: "center" }}>
                    <Card onClick={() => props.history.push({pathname: '/admin/form/create', state: {type: 'animal'}})} style={{ padding: 30 }}>
                        <Space size={25} direction="vertical" >
                            <img src={require('../../../../../assets/images/icons/Animal Management.png')} />
                            <Title level={4}>Animal</Title>
                        </Space>
                    </Card>
                </Col>

                <Col span={12} style={{ textAlign: "center" }} className="hover">
                    <Card onClick={() => props.history.push({pathname: '/admin/form/create', state: {type: 'product'}})} style={{ padding: 30 }}>
                        <Space direction="vertical" >
                            <img src={require('../../../../../assets/images/icons/Product Management.png')} />
                            <Title level={4}>Product</Title>
                        </Space>
                    </Card>
                </Col>

            </Row>
        </div >

    );
}
