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


function ContactModal(props) {
    const dispatch = useDispatch();
    const [states, setstates] = useState([])
    const [cities, setcities] = useState([])
    const { modalContactvisible, ChangeModalContact, categoryName, clickAddContact, mode, detail, ChangeEditModalContact, form } = props


    const [finishClicked, setFinishClicked] = useState(false);
    const onClick = () => {
        setFinishClicked(true);
    }
    console.log('in contact modal , mode ', props.mode);

    useEffect(() => {

        console.log('on add');
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
        // console.log(values);
        console.log(values);
        clickAddContact(values);
        // form.resetFields()
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


    return categoryName ? (
        <>
            <Modal visible={modalContactvisible} footer={null} closable={false} centered>
                <div style={{ paddingRight: "20px" }} id="area">
                    <Form form={form} onFinish={onFinish}

                        initialValues={{
                            ['category']: categoryName._id,

                        }}>
                        <Title level={3} strong>{mode === 'edit' ? 'Edit Contact' : 'Add a new Contact'}</Title>
                        <br />
                        <Title className="primary-text primary-text fs-120 textAlign-sm-modalleft" level={4} >{categoryName.name}</Title>


                        <div className="primary-text fs-120 textAlign-sm-modalleft">Name:</div>
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
                            <Input
                                autoComplete={"off"}
                                style={{ width: "90%" }} placeholder="Enter name" className="textAlign-sm-marginLeft customInput" />
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
                            <Input
                                autoComplete={"off"}
                                style={{ width: "90%" }} placeholder="Enter email address" className="textAlign-sm-marginLeft customInput" />
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

                            <InputPhoneNumber style={{ width: "90%" }}
                                country="US"
                                value={form.getFieldValue("phone")}
                                placeholder="Enter Phone number (e.g. (xxx) xxx-xxxx)"
                                className="ant-input customInput primary-text  textAlign-sm-marginLeft"
                                error={"Phone number required"}
                                onKeyDown={limitPhoneNumber}
                                onChange={phoneNumberChange}
                            />


                        </Form.Item>



                        <div className="primary-text fs-120 textAlign-sm-modalleft">State:</div>
                        <Form.Item name="state" validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                            rules={[
                                { required: true, message: 'Please select state' }
                            ]}
                        >
                            <Select
                                getPopupContainer={() => document.getElementById('area')}
                                style={{ width: "90%", textAlign: "left" }}
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
                            <Select
                                // defaultValue={null}
                                getPopupContainer={() => document.getElementById('area')}
                                // mode={'multiple'}
                                style={{ width: "90%", textAlign: "left" }}
                                placeholder="Select city" allowClear
                                className="customSelect textAlign-sm-marginLeft leftAlignData"
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
                            <TextArea placeholder="Address" id="textarea" style={{ width: "90%", textAlign: "left" }}
                                className="textAlign-sm-marginLeft customInput" />
                        </Form.Item>


                        <Form.Item name="category" hidden>
                        </Form.Item>

                        <Space>
                            <Button className="secondary-button" onClick={() => { ChangeModalContact(categoryName); form.resetFields() }}>Discard</Button>
                            <Button className="secondary-button" htmlType="submit" onClick={onClick}>Add</Button>
                        </Space>
                    </Form>
                </div>
            </Modal>

        </>
    ) : null;

}


export default ContactModal;