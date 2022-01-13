import React, { useEffect, useState } from 'react';
import Button from '../../../components/button/button';
import { Row, Col, Radio, message } from 'antd';
import { Link } from 'react-router-dom'
import MyNotification from '../../Notification/MyNotification'
import { useDispatch } from 'react-redux';
import { EnableLoader, DisableLoader } from '../../../redux/actions/loader_action';
import { getNotification, deleteNotification } from '../../../redux/actions/notification_action';

function Notification() {
    const [size, setsize] = useState('staffnotification');
    const [notificaitons, setNotificaitons] = useState([]);
    const [type, setType] = useState('adminnotification');

    const dispatch = useDispatch();
    const getData = () => {
        dispatch(EnableLoader());
        dispatch(getNotification(type)).then(response => {
            console.log(response);
            dispatch(DisableLoader())
            if (response.payload.status === 200) {
                setNotificaitons(response.payload.data);
            }
        })
    }

    useEffect(() => {
        getData()
    }, [type])

    const deleteNotificationFunc = (id) => {
        dispatch(EnableLoader())
        dispatch(deleteNotification(id)).then(response => {
            dispatch(DisableLoader())
            if (response.payload.status === 200) {
                getData(type);
            }
            else {
                message.error(response.payload.message)
            }
        })
    }

    return (
        <>
            <Row >
                <Col xs={24} md={8} className="">
                    <h2 className="primary-text primary-text-heading">Push notifications</h2>
                </Col>
                <Col xs={24} md={8} style={{ textAlign: "center" }} className="">
                    <div className="textAlign-md-box-layer setting-radio-btn-switch-two">

                        <Radio.Group value={type} onChange={(e) => setType(e.target.value)} >
                            <Radio.Button value="adminnotification">My notifications</Radio.Button>
                            <Radio.Button value="adminstaffnotification">Notification Send</Radio.Button>
                        </Radio.Group>
                    </div>
                </Col>

                <Col xs={24} md={8} >
                    <div className="textAlign-md-right textAlign-md-box-layer" ><Button className="secondary-button"><Link to={"/admin/notification/create"}>Create notification</Link></Button></div>
                </Col>

            </Row>
            <MyNotification data={notificaitons ? notificaitons : []} deleteNotificationFunc={(id) => deleteNotificationFunc(id)} />
        </>
    )

}

export default Notification;