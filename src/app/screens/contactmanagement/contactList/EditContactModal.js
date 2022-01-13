import React, { useState, useEffect } from 'react';
import { Modal, Typography, Form, Space, Input, Select } from 'antd';
import Button from '../../../components/button/button'
import { EnableLoader, DisableLoader } from '../../../redux/actions/loader_action';
import { useDispatch } from "react-redux";
import { getStates, getCityByState } from '../../../redux/actions/location_action'
import InputPhoneNumber from "react-phone-number-input/input";

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

function EditContactModal(props) {

    const dispatch = useDispatch();
    const [states, setstates] = useState([])
    const [cities, setcities] = useState([])
    const { modalEditContactvisible, ChangeEditModalContact, detail, setdetail, clickUpdateContact, form } = props

    //console.log(detail)
    const [finishClicked, setFinishClicked] = useState(false);
    const onClick = () => {
        setFinishClicked(true);
    }

    useEffect(() => {
        // form.resetFields()
        if (detail) {
            form.setFieldsValue({ ...detail, email: detail.email[0], phone: detail.phone[0] });
        }
    }, [detail])

    useEffect(() => {
        dispatch(getStates()).then(response => {
            //console.log(response);
            if (response.payload.status === 200) {
                setstates(response.payload.data)
            }
        })

    }, [])

    const stateChange = (value) => {
        if (value) {
            dispatch(EnableLoader())
            //console.log(value);
            let id = states.filter((state, index, array) => (state.name === value))[0].id;
            dispatch(getCityByState(id)).then(response => {
                dispatch(DisableLoader())
                if (response.payload.status === 200) {
                    form.setFieldsValue({ city: undefined });
                    setcities(response.payload.data)
                }
            })
        }
        else {
            form.setFieldsValue({ city: undefined });
        }
    }


    const onFinish = values => {
        //dispatch(EnableLoader());
        console.log('edit finish');
        form.resetFields()
        clickUpdateContact(values, detail._id);
        // dispatch(editContact(values)).then(response => {
        //     //dispatch(DisableLoader());
        //     if (response.payload.status === 200) {
        //         message.success(response.payload.message)
        //         ChangeEditModalContact()
        //     }
        //     else {
        //         message.error(response.payload.message)
        //     }
        // })

    }

    const onDiscard = () => {
        ChangeEditModalContact(null)
    }

    const limitPhoneNumber = (element) => {
        console.log(element);
        if (
            form.getFieldValue("phone") &&
            form.getFieldValue("phone").length > 11
        ) {
            element.preventDefault();
        }
    };

    const phoneNumberChange = (value) => {
        form.setFieldsValue({ phone: value });
    };


    return detail ? (
        <>
            <Modal visible={modalEditContactvisible} footer={null} closable={false} centered>
                <div style={{ paddingRight: "20px" }}>
                    <Form form={form} onFinish={onFinish}
                    >
                        <Title level={3} strong>Edit Contact</Title>
                        <br />
                        <Title className="primary-text primary-text fs-120 textAlign-sm-modalleft" level={4} >{detail.category.name}</Title>


                        <Form.Item name="name"
                            validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                            rules={[{ required: true, message: 'Please enter name' },
                            {
                                pattern: new RegExp(/^[a-zA-Z ]+$/i),
                                message: "numbers and special characters not allowed"
                            },
                            { min: 3, message: 'Full name  should not be less than 3 characters.' },
                            { max: 50, message: 'Full name should not be more than 50 characters.' },]}
                        >
                            <Input style={{ width: "90%" }} placeholder="Enter name" className="textAlign-sm-marginLeft customInput" />
                        </Form.Item>


                        <div className="primary-text fs-120 textAlign-sm-modalleft">Email:</div>
                        <Form.Item name="email"
                            validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                            rules={[
                                { required: true, message: 'Please enter  email!' },
                                { max: 50, message: 'Email should not be more than 50 characters!' },
                                { type: 'email', message: 'Invalid email' }
                            ]}
                        >
                            <Input style={{ width: "90%" }} placeholder="Enter email address" className="textAlign-sm-marginLeft customInput" />
                        </Form.Item>



                        <div className="primary-text fs-120 textAlign-sm-modalleft">Phone:</div>
                        <Form.Item
                            validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                            name="phone"
                            validateFirst="true"
                            rules={[
                                { required: true, message: "Please enter your phone number" },]}

                        >
                            <Input
                                onKeyDown={limitPhoneNumber}
                                hidden
                                placeholder="Enter phone number (e.g. xxx-xxx-xxxx)"
                            />
                            {form.getFieldValue("phone") && <InputPhoneNumber style={{ width: "90%" }}
                                country="US"
                                value={form.getFieldValue("phone")}
                                placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
                                className="ant-input customInput primary-text  textAlign-sm-marginLeft"
                                error={"Phone number required"}
                                onKeyDown={limitPhoneNumber}
                                onChange={phoneNumberChange}
                            />}



                        </Form.Item>


                        <div className="primary-text fs-120 textAlign-sm-modalleft">State:</div>
                        <Form.Item name="state" validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                            rules={[
                                { required: true, message: 'Please select state' }
                            ]}
                        >
                            <Select style={{ width: "90%", textAlign: "left" }}
                                placeholder="Select state" allowClear onChange={stateChange}
                                className="customSelect textAlign-sm-marginLeft "
                            >
                                {states.map((e) => (
                                    <Option value={e.name}>{e.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>


                        <div className="primary-text fs-120 textAlign-sm-modalleft">City:</div>
                        <Form.Item name="city" validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                            rules={[
                                { required: true, message: 'Please select city' }
                            ]}
                        >
                            <Select style={{ width: "90%", textAlign: "left" }}
                                placeholder="Select city" allowClear
                                className="customSelect textAlign-sm-marginLeft "
                            >
                                {cities.map((e) => (
                                    <Option value={e.name}>{e.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>


                        <div className="primary-text fs-120 textAlign-sm-modalleft">Address:</div>
                        <Form.Item name="address" validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                            rules={[
                                {
                                    required: true, message: 'Please enter address!',
                                },]}
                        >
                            <TextArea placeholder="Address" id="textarea" style={{ fontFamily: "Arial", width: "90%", textAlign: "left" }}
                                className="textAlign-sm-marginLeft customInput" />

                        </Form.Item>


                        <Form.Item name="category" hidden>
                        </Form.Item>

                        <Space>
                            <Button className="secondary-button" onClick={() => onDiscard()}>Discard</Button>
                            <Button className="secondary-button" htmlType="submit">Update</Button>
                        </Space>
                    </Form>
                </div>
            </Modal>

        </>
    ) : null;

}


export default EditContactModal;