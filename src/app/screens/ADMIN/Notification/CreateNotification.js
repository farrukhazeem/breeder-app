import React, { useEffect, useState } from 'react';
import Button from '../../../components/button/button';
import { Row, Col, Select, Space, Form, Input, message } from 'antd';
import Checkbox from '../../../components/checkbox/Checkbox'
import { useDispatch } from 'react-redux';
import { DisableLoader, EnableLoader } from '../../../redux/actions/loader_action';
import { createNotification } from '../../../redux/actions/notification_action';
import { getAllUsers } from '../../../redux/actions/user_actions';
const { Option } = Select;

const { TextArea } = Input;

function CreateNotification(props) {
    const [checkboxVal, setcheckboxVal] = useState('all')
    const [checkall, setcheckall] = useState(true)
    const [checkone, setcheckone] = useState(false);
    const [user, setUser] = useState([]);

    const dispatch = useDispatch();


    useEffect(() => {
        getBreeders();
    }, [])



    const getBreeders = () => {
        dispatch(EnableLoader());
        dispatch(getAllUsers('breeder')).then((response) => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                setUser(response.payload.data);
            }
        });
    }



    const statuses = ['Breeder 1', 'Breeder 2', 'Breeder 3', 'Breeder 4', 'Pregnant'];

    const onChangeVal = (e) => {
        setcheckboxVal(e.target.value)
        setcheckall(!checkall)
        setcheckone(!checkone)
    }




    const onFinish = values => {
        console.log('Success:', values);

        dispatch(EnableLoader());
        dispatch(createNotification({ ...values, ...{ users: (checkboxVal === 'all') ? 'all' : values.breeders, notificationType: 'admin', notificationSubType: 'announcement', type: 'adminstaffnotification' } })).then(response => {
            dispatch(DisableLoader());
            console.log(response);
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
                        <span className="secondary-text fs-160">Select breeder(s)</span>
                        <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">This notification is for :</div>
                        <Col xs={24}>
                            <Checkbox className="customInput primary-text" value="all" checked={checkboxVal === "all"} onChange={onChangeVal} >All breeder</Checkbox>
                        </Col>
                        <Col xs={24}>
                            <Checkbox className="customInput primary-text" value="one" checked={checkboxVal === "one"} onChange={onChangeVal}>A particular breeder</Checkbox>
                        </Col>
                        <Col xs={24}>
                            {
                                checkboxVal === "one" ?

                                    <Col xs={24} >
                                        <div className="primary-text name-top">Breeder:</div>
                                        <Form.Item name="breeders" >
                                            <Select mode="multiple" style={{ width: "70%" }}
                                                placeholder="Select breeder" className="customSelect"
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {user.map(u => (
                                                    <Option value={u._id} key={u._id}>{u.name}</Option>
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