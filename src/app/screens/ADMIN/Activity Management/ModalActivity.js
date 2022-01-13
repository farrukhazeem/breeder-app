import React, { useState, useEffect } from 'react';
import { Modal, Typography, Form, Space, Input, Select } from 'antd';
import Button from '../../../components/button/button'

const { Title } = Typography;
const { Option } = Select;


function ModalActivity(props) {
    const { visible, setvisible, detail, setDetail, createCategory, Animals } = props
    const [form] = Form.useForm();
    //console.log(detail)
    const [finishClicked, setFinishClicked] = useState(false);

    useEffect(() => {
        form.resetFields()
        if (detail) {
            form.setFieldsValue({ ...detail });
        }

    }, [detail])

    const onDiscard = () => {
        form.resetFields(); setvisible(false); setDetail({})
    }

    const onFinish = values => {
        //dispatch(EnableLoader());
        console.log('edit finish', values);
        form.resetFields(); setDetail({});
        setvisible(false)
        createCategory(values);

    }


    return detail ? (
        <>
            <Modal visible={visible} footer={null} closable={false} centered>
                <div style={{ paddingRight: "20px" }}>
                    <Form form={form} onFinish={onFinish}
                        initialValues={{ ['name']: detail.name, }}>
                        <Title level={3} strong>{Object.keys(detail).length > 0 ? "Edit" : "Add"} Category</Title>
                        <br />

                        <div className="primary-text fs-120 textAlign-sm-modalleft">Category Name:</div>
                        <Form.Item name="name"
                            validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                            rules={[{ required: true, message: 'Please enter name' },
                            {
                                pattern: new RegExp(/^[a-zA-Z ]+$/i),
                                message: "numbers and special characters not allowed"
                            },
                            { min: 3, message: 'Name should not be less than 3 characters.' },
                            { max: 50, message: 'Nameshould not be more than 50 characters.' },]}
                        >
                            <Input style={{ width: "90%" }} placeholder="Enter activity name" className="textAlign-sm-marginLeft customInput" />
                        </Form.Item>



                        <div className="primary-text fs-120 textAlign-sm-modalleft">Select Animals:</div>
                        <Form.Item name="animals"
                            rules={[{ required: true, message: "Please select animals" }]}
                        >
                            <Select
                                style={{ width: "90%" }}
                                mode="multiple"
                                // onChange={(status) => statusChange({ status: status })}
                                placeholder="Select Animals"
                                className="customSelect textAlign-sm-marginLeft"
                            >
                                {Animals.map((breed) => (
                                    <Option value={breed._id}>{breed.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>


                        <Space>
                            <Button className="secondary-button" onClick={() => onDiscard()}>Discard</Button>
                            <Button className="secondary-button" onClick={() => setFinishClicked(true)}
                                htmlType="submit">{Object.keys(detail).length > 0 ? "Update" : "Add"}</Button>
                        </Space>
                    </Form>
                </div>
            </Modal>

        </>
    ) : null;

}


export default ModalActivity;