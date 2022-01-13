import React, { useState, useEffect } from 'react'
import { Form, Space, Row, Col, message, Modal, Typography, List, Radio } from "antd";
import Button from '../../../../components/button/button'
import input from '../../../../components/input/input'
import Card from "../../../../components/card/card";
import { ArrowRightOutlined } from "@ant-design/icons";
// import { EnableLoader, DisableLoader, } from "../../../../redux/actions/loader_action";
import { getSubscriptions } from "../../../../redux/actions/subscription_action";
import { useDispatch } from "react-redux";
import "../../../subscription/Subscription.scss";

const { Title } = Typography;

export default function PackagesModal(props) {
    const [tabIndex, setTabIndex] = useState("monthly");
    const dispatch = useDispatch();
    const { visible, setvisible, currSubscription, setcurrSubscription, currSubscriptionType, setcurrSubscriptionType } = props
    const [allsubscriptions, setallsubscriptions] = useState([]);


    useEffect(() => {
        ListSubscription()
    }, [input])

    const ListSubscription = () => {
        dispatch(getSubscriptions()).then((response) => {
            console.log(response);
            if (response.payload.status === 200) {
                setallsubscriptions(response.payload.data.filter(e => e.packageType === "Business"));
            } else {
                message.error(response.payload.message);
            }
        });
    };

    const SubscriptionPackageInfo = (data) => {
        return (
            // <Card className={data._id === packageValue.packageId ? "primary-background" : ""}>
            <Card
                style={{ height: 380 }}
                className={
                    currSubscription && currSubscription._id === data._id
                        ? "primary-background" : ""
                } key={data._id}>
                <div style={{ textAlign: "center" }}>
                    <Space direction="vertical">
                        <Space >
                            <Title
                                className={
                                    currSubscription &&
                                        currSubscription._id === data._id && currSubscriptionType === tabIndex ? "white-text" : ""
                                } level={2}
                            >
                                {data.type}
                            </Title>
                            {currSubscription &&
                                currSubscription._id === data._id
                                && currSubscriptionType === tabIndex
                                ? (
                                    <img
                                        src={require(`../../../../../assets/images/icons/completed.png`)}
                                        style={{ width: 25, height: 25, borderRadius: 20 }}
                                    />
                                ) : (
                                    <div></div>
                                )}
                        </Space>
                        <Title
                            className={
                                currSubscription && currSubscription._id === data._id && currSubscriptionType === tabIndex
                                    ? "white-text" : ""
                            }
                            level={4} className="pkgNameHeight"
                        >
                            {data.name}
                        </Title>
                        <div
                            className={
                                currSubscription &&
                                    currSubscription._id === data._id && currSubscriptionType === tabIndex
                                    ? "white-text fs-150"
                                    : ""
                            }
                        >
                            <div className={"fs-130"}>$ {(tabIndex === 'monthly') ? data.monthlyPrice : (tabIndex === 'yearly') ? data.yearlyPrice : data.lifetimePrice}/ {(tabIndex === 'monthly') ? "month" : (tabIndex === 'yearly') ? "year" : "lifetime"}</div>
                        </div>
                    </Space>
                </div>

                <div
                    style={{
                        marginTop: 20,
                        height: 110,
                        ...(currSubscription && currSubscription._id === data._id && currSubscriptionType === tabIndex
                            ? { height: 130 } : { height: 150 }),
                    }}
                >
                    {/* <div className={data._id === packageValue.packageId ? "white-text" : ""}> */}
                    <div
                        className={
                            currSubscription &&
                                currSubscription._id === data._id && currSubscriptionType === tabIndex
                                ? "white-text"
                                : ""
                        }
                    >
                        <p>
                            <ArrowRightOutlined /> {data.description}
                        </p>
                        {data.allowedAnimal > 0 && (
                            <p style={{ textAlign: "initial" }}>
                                <ArrowRightOutlined /> Allowed animal {data.allowedAnimal}
                            </p>
                        )}
                        {data.allowedEmp > 0 && (
                            <p style={{ textAlign: "initial" }}>
                                <ArrowRightOutlined /> Allowed employees {data.allowedEmp}
                            </p>
                        )}
                        {data.allowedProduct > 0 && (
                            <p style={{ textAlign: "initial" }}>
                                <ArrowRightOutlined /> Allowed products {data.allowedProduct}
                            </p>
                        )}
                    </div>
                </div>
                <div style={{ width: "100%", marginTop: 10 }}>
                    <Button
                        className="secondary-button"
                        block
                        disabled={
                            currSubscription &&
                            currSubscription._id === data._id && currSubscriptionType === tabIndex
                        }
                        onClick={() => { setcurrSubscription(data); setcurrSubscriptionType(tabIndex) }}
                    >
                        {currSubscription && currSubscription._id === data._id && currSubscriptionType === tabIndex
                            ? "Selected" : "Select"}
                    </Button>
                </div>
            </Card>
        );
    };

    return (
        <Modal visible={visible} footer={null} closable={false} style={{ minWidth: 1000 }} >
            <div>
                <Title level={3} className="primarytext primary-text-heading">Select Package</Title>
            </div>


            <div className="setting-radio-btn-switch">
                <Radio.Group
                    value={tabIndex}
                    onChange={(index) => {
                        setTabIndex(index.target.value);
                    }}
                    style={{ marginBottom: 16 }}
                >
                    <Radio.Button value={"monthly"}>Monthly</Radio.Button>
                    <Radio.Button value={"yearly"}>Yearly</Radio.Button>
                    <Radio.Button value={"lifetime"}>Lifetime</Radio.Button>
                </Radio.Group>
            </div>


            <List grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3, }}
                className="subscription-list-main" className="lists"
                dataSource={
                    tabIndex === "monthly" ? allsubscriptions.filter(e => e.monthlyPrice || e.monthlyPrice === 0) :
                        tabIndex === "yearly" ? allsubscriptions.filter(e => e.yearlyPrice || e.yearlyPrice === 0) :
                            allsubscriptions.filter(e => e.lifetimePrice || e.lifetimePrice === 0)
                }
                renderItem={(item) => (
                    <List.Item>{SubscriptionPackageInfo(item)}</List.Item>
                )}
            />
            <Button className="secondary-button" onClick={() => setvisible(false)}>Close</Button>

        </Modal>

    )
}
