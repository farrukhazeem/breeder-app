import React from 'react';
import { Row, Col, Space, message } from 'antd';
import Card from '../../components/card/card'
import Button from '../../components/button/button'
import { removeActivity } from '../../redux/actions/activity_action'
//import { EnableLoader, DisableLoader } from '../../../redux/actions/loader_action'
import { useDispatch } from "react-redux";

function SubActivity(props) {
    const dispatch = useDispatch();
    const { ChangeModal, item } = props


    const RemoveActivity = (id) => {
        console.log(id);
        dispatch(removeActivity(id)).then(response => {
            //dispatch(DisableLoader());
            if (response.payload.status === 200) {
                props.refreshData();
                message.success(response.payload.message)
            }
            else {
                message.error(response.payload.message)
            }
        })
    }
    ///

    return (
        <>
            <Card style={{ marginTop: "5px", width: "100%" }} key={item.id}>

                <Row gutter={10} >
                    <Col xs={24} lg={14} className="">
                        <Row>
                            <Col xs={24} className="">
                                <span className="fs-120" style={{ fontWeight: 'bold' }}>{item.name}</span>
                            </Col>

                            <Col xs={24} className="">
                                <div className="primary-text fs-110" style={{ width: "90%" }}>
                                    {item.description}
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={24} lg={4} className="" style={{ marginTop: "20px" }}>
                        <Row>
                            <Col xs={24} className="">
                                <div className="secondary-text fs-100">Type</div>
                            </Col>
                            <Col xs={24} className="">
                                <div className="primary-text fs-100">{item.categoryType}</div>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={24} lg={4} className=" textAlign-md-right" style={{ marginTop: "25px" }}>
                        <Space>
                            <Button className="inner-white-btn" onClick={() => { props.setCategory(); ChangeModal(item); }}>Edit</Button>
                            <Button className="inner-white-btn" onClick={() => RemoveActivity(item._id)}>Remove</Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

        </>
    )

}

export default SubActivity;