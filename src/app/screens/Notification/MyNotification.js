import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment'
import Card from '../../components/card/card'
import Button from '../../components/button/button'

const names = ['Notification Total', 'Notification Alive', 'Notification Sick', 'Notification final'];
function MyNotification({ data, deleteNotificationFunc }) {

    return (
        <>
            {
                data.map((notification) => (

                    <Card style={{ marginTop: "10px" }}>
                        <Row>
                            <Col md={22}>
                                <Row>
                                    <Col xs={24} className="">
                                        <span className="fs-130">{notification.title}</span>
                                    </Col>

                                    <Col xs={24} className="">
                                        <div className="secondary-text fs-100">
                                            Received On: {moment(notification.createdAt).format('DD MMM, YYYY (HH:mm:ss)')}
                                        </div>
                                    </Col>

                                    <Col xs={24} className="">
                                        <div className="primary-text fs-110" >
                                            {notification.description}
                                        </div>
                                    </Col>


                                </Row>
                            </Col>
                            <Col md={2} style={{ marginTop: 20 }}>
                                <Button className="secondary-button" onClick={() => deleteNotificationFunc(notification._id)}>Delete</Button>
                            </Col>
                        </Row>
                    </Card>
                ))
            }
        </>
    )

}

export default MyNotification;