import React, { useState, useEffect } from 'react'
import { Row, Col, message, Space } from 'antd';
import Cart from '../../components/card/card';
import { Form, Switch } from 'antd';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom'
import passwordGenerator from '../../config/passwordGenerator';
import './Employee.scss';
import { useDispatch } from "react-redux";
import { getEmp, updateEmp } from '../../redux/actions/user_actions'
import { EnableLoader, DisableLoader } from '../../redux/actions/loader_action'


export default function Employee(props) {
    const dispatch = useDispatch();

    const [empinfo, setempinfo] = useState({})
    const [form] = Form.useForm();
    const [appStatus, setappStatus] = useState(false)
    const [managementStatus, setmanagementStatus] = useState(false)
    const [active, setActive] = useState(false)
    const [image, setimage] = useState({})

    const [finishClicked, setFinishClicked] = useState(false);
    const onClick = () => {
        setFinishClicked(true);
    }

    useEffect(() => {
        dispatch(getEmp(window.location.pathname.split("/")[3])).then(response => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                setempinfo(response.payload.data)
                setActive(response.payload.data.active)
                setappStatus(response.payload.data.canAccessMobileApp)
                setmanagementStatus(response.payload.data.canAccessInventoryManagement)
                form.resetFields()
            }
            else {
                message.error(response.payload.message)
            }
        })
    }, [])


    const onFinish = values => {
        //console.log(values);
        dispatch(EnableLoader());
        const formdata = new FormData()
        if (image.file !== undefined) {
            formdata.append('file', image.file, image.file.name);
        }
        for (var key in values) {
            formdata.append(key, values[key]);
        }
        formdata.set('canAccessMobileApp', appStatus); formdata.set('canAccessInventoryManagement', managementStatus); formdata.set('active', active);
        dispatch(updateEmp(formdata, window.location.pathname.split("/")[3])).then(response => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                message.success(response.payload.message)
            }
            else {
                message.error(response.payload.message)
            }
        })

        //props.history.push('/employees')
    };

    const autoGeneratePassword = () => {
        form.setFieldsValue({ password: passwordGenerator.generate(10) });
    }

    const handleChange = (event) => {
        console.log(event.target.files[0])
        setimage({ file: event.target.files[0] })

    }

    return (
        <div>

            <Form form={form} onFinish={onFinish}
                initialValues={{
                    ['email']: empinfo.email, ['name']: empinfo.name,
                    ['phone']: empinfo.phone, ['address']: empinfo.address,
                    ['password']: empinfo.password
                }}>


                <Row >
                    <Col xs={24} className="textAlign-sm-box">
                        <span className="primary-text primary-text-heading ">Edit Team member{}</span>
                        <div className="textAlign-sm-right textAlign-margintop-neg ">
                            <Space >
                                <Link to={"/employees"}><Button className="secondary-button">  Discard Changes</Button></Link>
                                <Button htmlType="submit" onClick={onClick} className="secondary-button">Save Changes</Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
                <br />
                <Space>
                    <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
                        {image.file ?
                            <img src={URL.createObjectURL(image.file)} style={{ borderRadius: "45px" }} width={'90'} height={'90'} alt="logo" />
                            :
                            empinfo.image ? <img src={empinfo.image} style={{ borderRadius: "45px", width: 90, height: 90 }} alt="logo" />
                                : ""
                        }

                    </div>
                    <Form.Item name="file3" className='emp-input-custom'>
                        {<span>
                            <a className="primary-text" style={{ cursor: 'pointer' }}>Upload new picture</a>
                            <Input id="image" type="file" onChange={(e) => handleChange(e)}></Input>
                        </span>}

                        {/* <Upload {...props}>
                            <u className="primary-text" style={{ cursor: 'pointer', fontWeight: "bold" }}>Upload new picture</u>
                        </Upload> */}
                    </Form.Item>
                </Space>


                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xxl={12}>

                        <Cart style={{ margin: "10px" }} className="primary-contrast-background">
                            <h2 className="primary-text">Edit Team member</h2>
                            <br />

                            <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Team member Name :</div>
                            <Form.Item name="name" validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                                placeholder="Team member name"
                                rules={[
                                    { required: true, message: 'Please enter Team member name' },
                                    {
                                        pattern: new RegExp(/^[a-zA-Z ]+$/i),
                                        message: "numbers and special characters not allowed"
                                    },
                                    { min: 3, message: 'Team member name  should not be less than 3 characters.' },
                                    { max: 50, message: 'Team member name should not be more than 50 characters.' },]}
                            >
                                <Input id="name" placeholder="Enter Team member Name" type="text" ></Input>
                            </Form.Item>


                            <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Email :</div>
                            <Form.Item validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                                name="email" validateFirst="true"
                                placeholder="Email address"
                                rules={[
                                    { required: true, message: 'Please enter team member email!' },
                                    { max: 50, message: 'Email should not be more than 50 characters!' },
                                    { type: 'email', message: 'Invalid email' }]}
                            >
                                <Input id="email" placeholder="Enter team member email" type="email" ></Input>
                            </Form.Item>


                            <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Phone :</div>
                            <Form.Item validateTrigger={finishClicked ? "onChange" : "onSubmit"}
                                name="phone" validateFirst="true"
                                rules={[
                                    { required: true, message: 'Please enter team member phone number' },
                                    {
                                        pattern: new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/i),
                                        message: "Mobile number is invalid"
                                    },]}
                            >
                                <Input id="phone" placeholder="Enter team member phone number (e.g. xxx-xxx-xxxx)" type="phone" ></Input>
                            </Form.Item>


                            <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Address :</div>
                            <Form.Item name="address" validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                                rules={[{ required: true, message: 'Please input employee address' }]}
                            >

                                <Input id="address" placeholder="Enter address " type="address" ></Input>
                            </Form.Item>

                            <Row>
                                <Col xs={24} md={18}>

                                    <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Password :</div>
                                    <Form.Item name="password" validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                                        rules={[
                                            { required: true, message: 'Please input password ' }]}
                                    >
                                        <Input.Password id="password" placeholder="Enter password " type="password" />
                                    </Form.Item>

                                </Col>
                                <Col >
                                    <div style={{ margin: "3px", fontSize: "15px", visibility: "hidden" }}>Generate Password :</div>
                                    <Button onClick={autoGeneratePassword}>Generate Password</Button>
                                </Col >
                            </Row>

                        </Cart>

                    </Col>


                    <Col xs={24} sm={24} md={12} lg={12} xxl={12}>

                        <Cart style={{ width: '90%;', margin: "10px" }} className="primary-contrast-background">
                            <h2 className="primary-text">Edit Team member</h2>
                            <br /><br />

                            <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Mobile App :</div>
                            <Form.Item name="appStatus">
                                <Switch defaultChecked={appStatus} style={{ color: "red" }} onChange={() => setappStatus(!appStatus)} />
                                <span className="primary-text-span" style={{ margin: "3px", marginLeft: "10px", fontSize: "15px" }}>{appStatus ? "Active" : "Not Active"}</span>
                            </Form.Item>


                            <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Inventory management :</div>
                            <Form.Item name="managementStatus">
                                <Switch defaultChecked={managementStatus} onChange={() => setmanagementStatus(!managementStatus)} />
                                <span className="primary-text-span" style={{ margin: "3px", marginLeft: "10px", fontSize: "15px" }}>{managementStatus ? "Active" : "Not Active"}</span>
                            </Form.Item>



                            <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Status :</div>
                            <Form.Item name="active">
                                <Switch defaultChecked={active} onChange={() => setActive(!active)} />
                                <span className="primary-text-span" style={{ margin: "3px", marginLeft: "10px", fontSize: "15px" }}>{active ? "Active" : "Not Active"}</span>
                            </Form.Item>
                        </Cart>

                    </Col>

                </Row>


            </Form>
        </div>
    )
}
