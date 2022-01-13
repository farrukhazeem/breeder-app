import React, { useState } from "react";
import { Typography, Space } from "antd";
import Card from "../../components/card/card";
import "../settings/paymentInfo.css";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

function PackageCard(props) {
    const { detail, tabIndex } = props

    return (
        <>
            <Card style={{ height: 210 }} >
                <div style={{ textAlign: "center" }}>
                    <Space direction="vertical">
                        <Title level={4}>
                            {detail.name}
                        </Title>

                        <div className={"fs-130"}>$ {(tabIndex === 'monthly') ? detail.monthlyPrice : (tabIndex === 'yearly') ? detail.yearlyPrice : detail.lifetimePrice}/ {(tabIndex === 'monthly') ? "month" : (tabIndex === 'yearly') ? "year" : "lifetime"}</div>

                    </Space>
                </div>

                <div >
                    <p>
                        <ArrowRightOutlined /> {detail.description}
                    </p>
                    {detail.allowedAnimal > 0 && (
                        <p>
                            <ArrowRightOutlined /> Allowed animal {detail.allowedAnimal}
                        </p>
                    )}
                    {detail.allowedEmp > 0 && (
                        <p>
                            <ArrowRightOutlined /> Allowed employees {detail.allowedEmp}
                        </p>
                    )}
                    {detail.allowedProduct > 0 && (
                        <p>
                            <ArrowRightOutlined /> Allowed products {detail.allowedProduct}
                        </p>
                    )}
                </div>
            </Card>
        </>
    );
}

export default PackageCard;
