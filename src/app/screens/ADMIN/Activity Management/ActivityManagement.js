import React, { useState, useEffect } from 'react'
import { Row, Col, Space, Card, message } from "antd";
import Button from '../../../components/button/button'
import { getCategoriesByType, createCategory, deleteCategory, updateCategory } from "../../../redux/actions/category_action";
import { EnableLoader, DisableLoader } from "../../../redux/actions/loader_action";
import { useDispatch } from 'react-redux';
import moment from 'moment'
import ModalActivity from './ModalActivity'

export default function ActivityManagement() {
    const [categories, setCategories] = useState([]);
    const [visible, setvisible] = useState(false)
    const [detail, setDetail] = useState({})
    const [Animals, setAnimals] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        getCategories();
        getCategoryAnimal()
    }, []);

    const removeClick = (id) => {
        dispatch(EnableLoader());
        dispatch(deleteCategory(id)).then(response => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                message.success(response.payload.message)
                getCategories()
            } else {
                message.error(response.payload.message)
            }
        });
    }

    const getCategories = () => {
        dispatch(EnableLoader());
        dispatch(getCategoriesByType('activity')).then(response => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                console.log("activity==>>", response.payload.data)
                setCategories(response.payload.data);
            } else {
                setCategories(null);
            }
        });
    }


    const getCategoryAnimal = () => {
        dispatch(EnableLoader());
        dispatch(getCategoriesByType('animal')).then(response => {
            console.log("response", response)
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                setAnimals(response.payload.data);
            } else {
                setAnimals([]);
            }
        });
    }



    const createCategoryFunc = (values) => {
        dispatch(EnableLoader());
        if (Object.keys(detail).length === 0) {
            values.isDefault = true; values.type = "activity";
            dispatch(createCategory(values)).then(response => {
                dispatch(DisableLoader());
                if (response.payload.status === 200) {
                    message.success(response.payload.message)
                    getCategories()
                } else {
                    message.error(response.payload.message)
                }
            })
        }
        else {
            dispatch(updateCategory(detail._id, values)).then(response => {
                console.log("values", values)
                dispatch(DisableLoader());
                if (response.payload.status === 200) {
                    message.success(response.payload.message)
                    getCategories()
                } else {
                    message.error(response.payload.message)
                }
            })
        }

    }

    return (
        <div>
            <Row>
                <Col xs={24} md={10} className="">
                    <h2 className="primary-text primary-text-heading">Default Activity Category Management</h2>
                </Col>
                <Col xs={24} md={6} style={{ textAlign: "center" }} className=""></Col>

                <Col xs={24} md={8}>
                    <div className="textAlign-md-right textAlign-md-box-layer">
                        <Button className="secondary-button" onClick={() => { setvisible(true); }}>Add new default category</Button>
                    </div>
                </Col>
            </Row>

            <div>
                {categories && categories.map(e => (
                    <div>
                        <Card
                            className="animal-list-card"
                            style={{ width: "100%;", minWidth: "300px", marginTop: "10px", }}
                        >
                            <Row>
                                <Col xs={24} md={8}>
                                    <Space>
                                        <Space direction="vertical">
                                            <div className="primary-text fw-100">
                                                {e.name}
                                            </div>
                                            <span className="secondary-text" style={{ fontSize: 12 }}>
                                                {" "}
                                                 Date: {moment(e.createdAt).format("DD MMM, YYYY")}
                                            </span>
                                        </Space>
                                    </Space>
                                </Col>

                                <Col sm={24} lg={8}></Col>

                                <Col sm={24} lg={8}>
                                    <div>
                                        <Space>
                                            <Button className="inner-primary-btn" onClick={() => { setvisible(true); setDetail(e) }}>
                                                Edit
                                            </Button>
                                            <Button className="inner-primary-btn" onClick={() => { removeClick(e._id) }}>Remove</Button>
                                        </Space>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </div>

                ))}
            </div>
            <ModalActivity visible={visible} setvisible={setvisible} detail={detail} setDetail={setDetail}
                createCategory={(values) => createCategoryFunc(values)}
                Animals={Animals} />
        </div>
    )
}
