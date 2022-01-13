import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import { Row, Col, Select, Space, Form, Input, Result, message } from 'antd';
import Checkbox from '../../components/checkbox/Checkbox';
import { useDispatch } from 'react-redux';
import { DisableLoader, EnableLoader } from '../../redux/actions/loader_action';
import { getAllEmp } from '../../redux/actions/user_actions';
import { createNotification } from '../../redux/actions/notification_action';

const { Option } = Select;

const { TextArea } = Input;

function CreateNotification(props) {
    const [checkboxVal, setcheckboxVal] = useState('all')
    const [checkall, setcheckall] = useState(true)
    const [checkone, setcheckone] = useState(false)
    const [employees, setEmployees] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState('all');


    const statuses = ['Total', 'Alive', 'Sick', 'Dead', 'Pregnant', 'Total', 'Alive', 'Sick', 'Dead', 'Pregnant'];



    const dispatch = useDispatch()
    useEffect(() => {
        getEmployees();
    }, [])


    const getEmployees = () => {
        dispatch(EnableLoader());
        dispatch(getAllEmp()).then(response => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                setEmployees(response.payload.data);
            }
        })
    }


    const onChangeVal = (e) => {
        setcheckboxVal(e.target.value)
        setcheckall(!checkall)
        setcheckone(!checkone)
    }

    const onFinish = values => {
        console.log('Success:', values);
        dispatch(EnableLoader());



        dispatch(createNotification({ ...values, ...{ users: (checkboxVal === 'all') ? 'all' : values.employee, notificationType: 'employee', notificationSubType: 'announcement' } })).then(response => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                message.success(response.payload.message);
                props.history.goBack()
            }
            else {
                message.error(response.payload.message);
            }
        });
    };
    return (
        <>

            <Form onFinish={onFinish}>
                <Row >
                    <Col xs={24} className="textAlign-sm-box">
                        <span className="primary-text primary-text-heading ">Create Notifications</span>
                        <div className="textAlign-sm-right textAlign-margintop-neg ">
                            <Space >
                                <Button className="secondary-button" onClick={() => props.history.push('/notification')}>Discard</Button>
                                <Button className="secondary-button" htmlType="submit">Notify</Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={24} md={12} lg={10} >
                        <span className="secondary-text fs-160">Notification details</span>
                        <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Notification title :</div>
                        <Form.Item name="title"
                            rules={[
                                {
                                    required: true, message: 'Please input title!',
                                },]}
                        >
                            <Input style={{ width: "80%" }} placeholder="Enter title" className="customInput" />
                        </Form.Item>

                        <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Notification message :</div>
                        <Form.Item name="description"
                            rules={[
                                {
                                    required: true, message: 'Please input message!',
                                },]}
                        >
                            <TextArea style={{ width: "80%", fontFamily: "Arial", }} id="textarea" className="customInput" rows={4} placeholder="Enter your notification message"></TextArea>
                        </Form.Item>
                    </Col>
                    <div style={{ marginLeft: "30px" }}></div>
                    <Col xs={24} md={12} lg={10}>
                        <span className="secondary-text fs-160">Select employee(s)</span>
                        <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">This notification is for :</div>
                        <Col xs={24}>
                            <Checkbox className="customInput primary-text" value="all" checked={checkboxVal === "all"} onChange={onChangeVal} >All Employees</Checkbox>
                        </Col>
                        <Col xs={24}>
                            <Checkbox className="customInput primary-text" value="one" checked={checkboxVal === "one"} onChange={onChangeVal}>A particular employee</Checkbox>
                        </Col>
                        <Col xs={24}>
                            {
                                checkboxVal === "one" ?

                                    <Col xs={24} >
                                        <div className="primary-text name-top">Employee:</div>
                                        <Form.Item name="employee" >
                                            <Select style={{ width: "70%" }}
                                                onChange={(e) => { setSelectedEmployee(e) }}
                                                placeholder="Select Employee" className="customSelect">
                                                {employees && employees.map(emp => (
                                                    <Option value={emp._id}>{emp.name}</Option>
                                                ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    : null

                            }
                        </Col>
                    </Col>


                </Row>

            </Form>
        </>
    )
}
export default CreateNotification;