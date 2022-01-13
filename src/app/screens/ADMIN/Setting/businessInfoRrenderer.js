import React, { useState, useEffect } from 'react';
import { Space, Row, Col, Form, Modal, Typography, message, Empty } from 'antd';
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import Cart from '../../../components/card/card';
//import ChangePasswordModal from './changePasswordModal'
import { useSelector, useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../../redux/actions/loader_action";
import { auth, editDetail } from "../../../redux/actions/user_actions";
import ChangePasswordModal from '../../settings/changePasswordModal'
import PaymentInfo from '../../settings/paymentInfo'

const { Title } = Typography;


function BusinessInfoRrenderer() {
    let user = useSelector(state => state.user && state.user.userData &&
        state.user.userData.data ? state.user.userData.data : {});
    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);
    const [currUser, setCurrUser] = useState({});
    const [form] = Form.useForm();

    const onChangePasswordModal = () => {
        setmodalpassword(!modalpassword)
    };


    const getData = () => {
        dispatch(EnableLoader());
        dispatch(auth()).then(response => {
            dispatch(DisableLoader())
            console.log(response);
            if (response.payload.status === 200) {
                setCurrUser(response.payload.data);
            }
        });
    }


    const finishEditInformation = (result) => {
        dispatch(EnableLoader());
        dispatch(editDetail({ ...user, name: result.name, email: result.email, businessInfoSettings: { ...user.businessInfoSettings, tax: result.tax } })).then(response => {
            dispatch(DisableLoader());
            // console.log(response);
            if (response.payload.status === 200) {
                // form.resetFields()
                setEditModal(false);
                dispatch(auth());
            }
        });
    };

    const [modalpassword, setmodalpassword] = useState(false);
    return (
        <div className="setting-accounts-renderer">
            <Space>
                <h2 className="primarytext primary-text-heading">Account settings</h2>
                <Button onClick={() => setEditModal(true)}>Edit</Button>
            </Space>
            <div className="business-info-list">
                <Row className="bi-row">
                    <Col span={6}>
                        <span className="primary-text fs-120">Name</span>
                    </Col>
                    <Col span={6} className="bi-value">
                        <span className="primary-text fs-120">{user.name}</span>
                    </Col>
                </Row>
                <Row className="bi-row">
                    <Col span={6}>
                        <span className="primary-text fs-120">Email</span>
                    </Col>
                    <Col span={6} className="bi-value">
                        <span className="primary-text fs-120">{user.email}</span>
                    </Col>
                </Row>


                <Row className="bi-row">
                    <Col span={6}>
                        <span className="primary-text fs-120">Tax percentage</span>
                    </Col>
                    <Col span={6} className="bi-value">
                        <span className="primary-text fs-120"> {user.businessInfoSettings.tax}%</span>
                    </Col>
                </Row>



            </div>

            <br />

            <br /><br /><br />


            {/* <PaymentInfo data={user} getData={getData}/> */}


            <h2 className="primarytext primary-text-heading">Password Settings</h2>
            <div className="business-info-list">
                <Row className="bi-row">
                    <Col span={12}>
                        <span className="primary-text fs-120">Password</span>
                    </Col>
                    <Col span={12} className="bi-value">
                        <Space size={20}>

                            <Button onClick={onChangePasswordModal}>Change Password</Button>
                        </Space>
                    </Col>
                </Row>
            </div>
            <ChangePasswordModal onChangePasswordModal={onChangePasswordModal} modalpassword={modalpassword} />



            <Modal visible={editModal} footer={null} closable={false} centered>
                <div>
                    <Title level={3} className="primarytext primary-text-heading">
                        Account settings
          </Title>
                </div>
                <Form onFinish={finishEditInformation} form={form} initialValues={{
                    ["name"]: user.name,
                    ["email"]: user.email,
                    ["tax"]: user.businessInfoSettings && user.businessInfoSettings.tax,
                }}
                >
                    {/* <CardElement options={CARD_OPTIONS} /> */}
                    <Form.Item label="Name"
                        style={{ marginTop: 10 }}
                        name="name"
                        rules={[
                            { required: true, message: "Please input name!" },
                            { max: 50, message: "Maximum 50 characters are required!" },
                        ]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>

                    <Form.Item label="Email"
                        style={{ marginTop: 10 }}
                        name="email"
                        rules={[
                            { required: true, message: "Please input email!" },
                            { required: true, type: "email", message: "Invalid email!" },
                            { max: 50, message: "Maximum 50 characters are required!" },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item label="Tax"
                        style={{ marginTop: 10, marginLeft: 10 }}
                        name="tax"
                        addonAfter={<div>%</div>}
                        rules={[{ required: true, message: "Please input tax!" }]}
                    >
                        <Input placeholder="Enter your tax" />
                    </Form.Item>

                    <Space>
                        <Button
                            onClick={() => { form.resetFields(); setEditModal(false) }}
                            className="secondary-button"
                        >
                            Discard
            </Button>
                        <Button type="submit" htmlType="submit">
                            Update
            </Button>
                    </Space>
                </Form>
            </Modal>



        </div>
    )
}

export default BusinessInfoRrenderer;