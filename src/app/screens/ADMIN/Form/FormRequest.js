import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import Card from "../../../components/card/card";
import { Row, Col, Typography, Space, Empty, message, Divider, Modal, Radio } from "antd";
import { useDispatch } from "react-redux";
import {
    EnableLoader,
    DisableLoader,
} from "../../../redux/actions/loader_action";
import { Link } from "react-router-dom";
import { modifyFormStructureValuesGet, modifyFormStructureValuesAdd } from "../../../redux/actions/form_action";
import moment from 'moment';


const { Title } = Typography;

function FormRequest() {
    const [formItems, setFormItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getForms();
    }, []);


    const getForms = () => {
        dispatch(EnableLoader());
        dispatch(modifyFormStructureValuesGet()).then((response) => {
            dispatch(DisableLoader());
            console.log("response==>>", response);
            if (response.payload.status === 200) {
                setFormItems(response.payload.data);
            }
        });
    }

    const AddItemToField = (formId, formStructureId, _id, value, status) => {
        let values = {}
        values.formId = formId._id;
        values.formStructureId = formStructureId;
        values._id = _id;
        values.value = value;
        values.status = status
        console.log(values)
        dispatch(EnableLoader());
        dispatch(modifyFormStructureValuesAdd(values)).then((response) => {
            dispatch(DisableLoader());
            console.log("response==>>", response);
            if (response.payload.status === 200) {
                getForms();
                message.success(response.payload.message)
            }
            else {
                message.error(response.payload.message)
            }
        });
    }

    return (
        <div>
            {formItems && formItems.length > 0 ?
                <>
                    {formItems.map(e => (
                        <Card
                            className="animal-list-card"
                            style={{
                                width: "100%;",
                                minWidth: "300px",
                                marginTop: "10px",
                            }}
                        >
                            <Row>
                                <Col xs={24} md={6}>
                                    <Space>

                                        <Space direction="vertical">
                                            <div className="primary-text">
                                                Type: {e.type}

                                            </div>
                                            <span className="secondary-text" style={{ fontSize: 12 }}>
                                                {" "}
                                                Category: {e.categoryId.name}
                                            </span>
                                        </Space>
                                    </Space>
                                </Col>

                                <Col xs={24} md={6}>
                                    <Space>
                                        {/* <img
                                src={d.categoryId.icon && d.categoryId.icon.split("/").pop() !== "null" ?
                                    d.categoryId.icon : require("../../../../assets/images/avatar.png")}
                                style={{ borderRadius: 50, width: 40, height: 40 }}
                                alt="logo"
                            /> */}

                                        <Space direction="vertical">
                                            <div className="primary-text">
                                                Item: {e.value}

                                            </div>
                                            <span className="secondary-text" style={{ fontSize: 12 }}>
                                                {" "}
                                                Registered date: {moment(e.createdAt).format("DD MMM, YYYY")}
                                            </span>
                                        </Space>
                                    </Space>
                                </Col>

                                <Col sm={24} lg={6}>
                                    <Space direction="vertical">
                                        <div className="primary-text">
                                            Item Added In: {e.formId.formStructure.filter(d => d._id === e.formStructureId)[0].displayName} Field

                                        </div>
                                        <span className="secondary-text" style={{ fontSize: 12 }}>
                                            {" "}
                                            Requested By: {e.requestedBy.name}
                                        </span>
                                    </Space>
                                </Col>

                                <Col sm={24} lg={6}>
                                    <Space>
                                        <Button className="inner-primary-btn" onClick={() => AddItemToField(e.formId, e.formStructureId, e._id, e.value, "approved")}>Approve</Button>
                                        <Button className="inner-primary-btn" onClick={() => AddItemToField(e.formId, e.formStructureId, e._id, e.value, "rejected")}>Reject</Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    ))
                    }
                </>

                :
                <div style={{ width: "100%", marginTop: 30 }}>
                    <Empty description={"No Request Found!"} />
                </div>

            }

        </div>
    );
}

export default FormRequest;
