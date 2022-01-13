import React, { useState } from 'react';
import Button from '../../../components/button/button';
import { ArrowRightOutlined, MoreOutlined } from "@ant-design/icons";
import Card from '../../../components/card/card';
import { Row, Col, Typography, Space, List, message } from 'antd';
import { Link } from 'react-router-dom'

const { Title } = Typography;



function Report() {

    return (
        <>
            <Row >
                <Col xs={24} md={8} className="">
                    <h2 className="primary-text primary-text-heading">Report</h2>
                </Col>
                <Col xs={24} md={8} style={{ textAlign: "center" }} className="">
                </Col>

                <Col xs={24} md={8} >

                </Col>
            </Row>

        </>
    )

}

export default Report;