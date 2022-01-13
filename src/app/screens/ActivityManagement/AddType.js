import React, { useEffect } from 'react';
import { Row, Modal, Typography, Form, Space, message, Radio, } from 'antd';
import Button from '../../components/button/button'
import Input from '../../components/input/input'
const { Title } = Typography;

function TypeModal(props) {
    const [typeForm] = Form.useForm();
    const { modaltype, ChangeModalType, AddType } = props


    const onFinish = values => {
        //message.success("successfully type credated")
        AddType(values.type)
        ChangeModalType()
        typeForm.resetFields();
    };


    return (
        <>
            <Modal visible={modaltype} footer={null} closable={false} centered={true}>
                <div style={{ paddingRight: "20px" }}>
                    <Form form={typeForm} onFinish={onFinish}>
                        <Title level={3} strong>Add Type</Title>

                        <Row style={{ justifyContent: "center" }}>
                            <Form.Item name="type" style={{ width: "95%", marginLeft: 15 }}
                                rules={[
                                    {
                                        required: true, message: 'Please select type!',
                                    },
                                    {
                                        pattern: new RegExp(/^[a-zA-Z ]+$/i),
                                        message: "numbers and special characters not allowed"
                                    },
                                ]}
                            >
                                {/* <RadioGroup style={{textAlign:"center"}}>
                                    <Radio value="Feed">Feed</Radio>
                                    <Radio value="Vaccines">Vaccines</Radio>
                                </RadioGroup> */}
                                <Input placeholder="Enter type" />
                            </Form.Item>
                        </Row>
                        <br />
                        <Space>
                            <Button className="secondary-button" onClick={() => { ChangeModalType(); typeForm.resetFields(); }}>Discard</Button>
                            <Button className="secondary-button" htmlType="submit">Add</Button>
                        </Space>

                    </Form>
                </div>
            </Modal>
        </>
    )

}

export default TypeModal;