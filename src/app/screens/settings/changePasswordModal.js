import React from 'react';
import { Row, Col, Modal, Typography, Form, Space, message } from 'antd';
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import { useDispatch } from 'react-redux';
import { EnableLoader, DisableLoader } from '../../redux/actions/loader_action';
import { empPasswordChange } from '../../redux/actions/user_actions';
const { Title } = Typography;
function ChangePasswordModal(props) {
    const { modalpassword, onChangePasswordModal } = props

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        // message.success("Password changed successfully")
        // onChangePasswordModal()
        // dispatch(DisableLoader());
        dispatch(EnableLoader());
        dispatch(empPasswordChange(values)).then(response => {
            dispatch(DisableLoader())
            if (response.payload.status === 200) {
                form.resetFields();
                message.success(response.payload.message);
                onChangePasswordModal()
            }
            else {
                message.error(response.payload.message);
            }
        });
    };
    return (
        <>
            <Modal visible={modalpassword} footer={null} closable={false}
                centered={true} >
                <Form onFinish={onFinish} form={form}>
                    <Title level={3} strong>Change Password</Title>
                    <Row span={16}>
                        <Col span={16} >
                            <span className="primary-text fs-110">Current Password:</span>
                        </Col>
                    </Row>
                    <Form.Item name="password"
                        rules={[
                            {
                                required: true, message: 'Please input Current Password!',
                            },]}>
                        <Input.Password style={{ width: "60%" }} placeholder="Enter Current Password" className="textAlign-sm-marginLeft" />
                    </Form.Item>



                    <Row span={16}>
                        <Col span={16} >
                            <span className="primary-text fs-110">New Password:</span>
                        </Col>
                    </Row>

                    <Form.Item name="changePassword" validateFirst={true}
                        rules={[
                            {
                                required: true, message: 'Please input New Password!',
                            },
                            { min: 8, message: 'Password must be minimum 8 characters' },
                            {
                                pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
                                message: "Password must have 1 upper case, 1 lower case character and 1 number"
                            },
                            { max: 50, message: 'Password must be maximum 50 characters' },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') !== value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('Current and new password must be different');
                                },
                            })
                        ]}>
                        <Input.Password style={{ width: "60%" }} placeholder="Enter Confirm Password" className="textAlign-sm-marginLeft" />
                    </Form.Item>


                    <Row span={16}>
                        <Col span={16} >
                            <span className="primary-text fs-110">Confirm Password:</span>
                        </Col>
                    </Row>
                    <Form.Item name="confirmPassword" validateFirst={true}
                        rules={[
                            {
                                required: true, message: 'Please input Confirm Password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('changePassword') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('New and confirm password must be same');
                                },
                            })
                        ]}>
                        <Input.Password style={{ width: "60%" }} placeholder="Enter Confirm Password" className="textAlign-sm-marginLeft" />
                    </Form.Item>

                    <Space>
                        <Button className="secondary-button" onClick={() => { form.resetFields(); onChangePasswordModal() }}>Cancel</Button>
                        <Button className="secondary-button" htmlType="submit">Save new Password</Button>
                    </Space>
                </Form>
            </Modal>

        </>
    )
}

export default ChangePasswordModal;