import React, { useState, useEffect } from "react";
import { Form, Row, Col, message, Typography, Select, Space } from "antd";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import Card from "../../components/card/card";
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import { createCardCustomer } from "../../redux/actions/user_actions";
import { getUserFromLocalStorage } from '../../helpers/helperFuctions'
import "../settings/paymentInfo.css";
import PackageCard from './PackageCard'

const { Title } = Typography;
const { Option } = Select;

function BusinessBilling(props) {
    const { detail, tabIndex, changePkg } = props
    const dispatch = useDispatch()
    const { setvisible, visible } = props;
    const [name, setName] = useState('');
    const [form] = Form.useForm();

    const handleSubmit = async (event) => {
        let newVal = {}
        event.preventDefault();
        if (!name) return message.error('Card name is required!');
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);
        formData.name = name;
        const data = { name };
        for (var pair of formData.entries()) {
            data[pair[0]] = pair[1]
            console.log(pair[0] + ', ' + pair[1]);
            if (!pair[1]) {
                return message.error(pair[0] + " is required");
            }
            if (meta.error) {
                return message.error(meta.error);
            }
        }

        newVal = data

        dispatch(EnableLoader());
        dispatch(createCardCustomer(newVal)).then((response) => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                document.getElementsByClassName("cardForm")[0].reset();
                form.resetFields();
                setvisible(false);
                setName('');
                message.success(response.payload.message);
                changePkg()

            }
            else {
                message.error(response.payload.message);
            }
        })
    }

    const {
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps, meta
    } = usePaymentInputs();

    const [formClick, setFormClick] = useState({ businessInformationClick: false, });
    const [indexBusiness, setindexBusiness] = useState(false)

    useEffect(() => {
        if (getUserFromLocalStorage() === "Individual") {
            setindexBusiness(true)
        }
    }, [])

    const continueHandle = () => {
        if (!form.getFieldValue('businessName')) {
            return message.error('Business info is required!');
        }
        if (!form.getFieldValue('noOfEmployees')) {
            return message.error('No.of Employees is required!');
        }
        setindexBusiness(false)
    }

    return (
        <>
            <Title level={4} className="primarytext primary-text-heading">
                {/* {getUserFromLocalStorage() === "Individual" ?
                    `Need Business Info` : `Change Package`
                } */}
                Change Package
            </Title>


            <Form form={form}>
                <form onSubmit={handleSubmit} className="cardForm">

                    {indexBusiness &&
                        <>
                            <Title level={4} className="primarytext primary-text-heading">
                                Business Detail
                            </Title>

                            <Form.Item label="Business Name"
                                validateTrigger={
                                    formClick.businessInformationClick ? "onChange" : "onSubmit"
                                }
                                name="businessName"
                                validateFirst="true"
                                rules={[
                                    { required: true, message: "Please enter your business name" },
                                    {
                                        pattern: new RegExp(/^[a-zA-Z1-9 ]+$/i),
                                        message: "special characters not allowed",
                                    },
                                    {
                                        min: 3,
                                        message: "business name must be minimum 3 characters.",
                                    },
                                    {
                                        max: 50,
                                        message: "business name must be maximum 50 characters.",
                                    },
                                ]}
                            >
                                <Input placeholder="Business name" />
                            </Form.Item>

                            <Form.Item label="No. of Employees"
                                validateTrigger={
                                    formClick.businessInformationClick ? "onChange" : "onSubmit"
                                }
                                name="noOfEmployees"
                                validateFirst="true"
                                rules={[
                                    { required: true, message: "Please select no of employees" },
                                ]}
                            >
                                <Select
                                    placeholder="Select No of employees"
                                    allowClear
                                    showSearch
                                    className="customSelect"
                                >
                                    {["1-10", "11-25", "26-50", "51-100", '100+'].map((e) => (
                                        <Option value={e}>{e}</Option>
                                    ))}
                                </Select>
                            </Form.Item>


                            <Form.Item label="Website Url"
                                validateTrigger={
                                    formClick.businessInformationClick ? "onChange" : "onSubmit"
                                }
                                name="website"
                                validateFirst="true"
                                rules={[
                                    {
                                        pattern: new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi),
                                        message: "please enter valid url",
                                    },
                                ]}
                            >
                                <Input placeholder="Website url" />
                            </Form.Item>


                        </>
                    }


                    {!indexBusiness &&
                        <>
                            <Row gutter={15}>
                                <Col xs={24} lg={12} className="textAlign-xs-box">
                                    <div>
                                        <Title level={4} className="primarytext primary-text-heading">
                                            Need Card Detail
                                </Title>

                                        <Form.Item
                                            style={{ marginTop: 10 }}
                                            name="name"
                                            rules={[
                                                { required: true, message: "Please enter card name" },
                                            ]}
                                        >
                                            <Input onChange={(value) => { setName(value.target.value); }} placeholder="Enter Name on Card" />
                                        </Form.Item>
                                        <div style={{ marginTop: 15 }}></div>
                                        <PaymentInputsWrapper >
                                            <svg {...getCardImageProps({ images })} />
                                            <input {...getCardNumberProps()} style={{ marginLeft: 25 }} />
                                            <input {...getExpiryDateProps()} style={{ marginLeft: 73 }} />
                                            <input {...getCVCProps()} style={{ marginLeft: 73 }} />
                                        </PaymentInputsWrapper>
                                    </div>
                                </Col>

                                <Col xs={24} lg={12} className="textAlign-xs-box">
                                    <PackageCard detail={detail} tabIndex={tabIndex} />
                                </Col>
                            </Row>
                        </>
                    }

                    <div style={{ marginTop: 20 }}></div>

                    <Space>
                        {indexBusiness ?
                            <Button onClick={() => continueHandle()} className="secondary-button">
                                Continue
                             </Button>

                            :
                            <>
                                <Button onClick={() => { setindexBusiness(true); setvisible(false); form.resetFields(); document.getElementsByClassName("cardForm")[0].reset(); }} className="secondary-button">
                                    Discard
                            </Button>
                                <Button type="submit" htmlType="submit"
                                    className="register-form-button secondary-button"
                                    onClick={() => setFormClick({ ...formClick, ...{ businessInformationClick: true }, })}
                                >
                                    Proceed to Pay
                        </Button>
                            </>
                        }
                    </Space>
                </form>
            </Form>


        </>
    );
}

export default BusinessBilling;
