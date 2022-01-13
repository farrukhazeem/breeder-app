import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import { Row, Col, Radio, message } from 'antd';
import './Notification.scss'
import { Link } from 'react-router-dom'
import MyNotification from './MyNotification'
import StaffNotification from './StaffNotification'
import { useDispatch } from 'react-redux';
import { EnableLoader, DisableLoader } from '../../redux/actions/loader_action';
import { getNotification, deleteNotification } from '../../redux/actions/notification_action';
function Notification() {
    // const [togglevalue, settogglevalue] = useState(true)
    const [type, setType] = useState('adminstaffnotification');
    const [notificaitons, setNotificaitons] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        getData(type);
    }, [type])


    const getData = (notifType) => {
        dispatch(EnableLoader())
        dispatch(getNotification(notifType)).then(response => {
            dispatch(DisableLoader())
            if (response.payload.status === 200) {
                setNotificaitons(response.payload.data);
            }
        })
    }


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



    // const onChange = (checked) => {
    //     settogglevalue(!togglevalue)
    // }

    return (
        <>
            <Row >
                <Col xs={24} md={8} className="">
                    <h2 className="primary-text primary-text-heading">Push notifications</h2>
                </Col>
                <Col xs={24} md={8} style={{ textAlign: "center" }} className="">
                    <div className="textAlign-md-box-layer setting-radio-btn-switch-two">

                        <Radio.Group value={type} onChange={(e) => setType(e.target.value)} >
                            <Radio.Button value="adminstaffnotification">My notifications</Radio.Button>
                            <Radio.Button value="staffnotification">Staff_Notifications</Radio.Button>
                        </Radio.Group>
                    </div>

                </Col>
                <Col xs={24} md={8} >
                    <div className="textAlign-md-right textAlign-md-box-layer" ><Button ><Link to={"/notification/create"}>Create notification</Link></Button></div>
                </Col>

            </Row>

            {type === "adminstaffnotification" ?
                <MyNotification data={notificaitons} deleteNotificationFunc={(id) => deleteNotificationFunc(id)} />
                : <StaffNotification data={notificaitons} deleteNotificationFunc={(id) => deleteNotificationFunc(id)} />}
        </>
    )

}

export default Notification;