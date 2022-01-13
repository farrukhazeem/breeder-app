import React, { useState } from 'react'
import { Row, Col, Space, Form, Select, Empty, Modal, message } from 'antd';
import Input from '../../../../components/input/input'
import Card from '../../../../components/card/card'
import Button from '../../../../components/button/button'
import { SearchOutlined, FilterFilled, MoreOutlined } from "@ant-design/icons";
import moment from 'moment';

import { useDispatch } from "react-redux";
import { EnableLoader, DisableLoader } from "../../../../redux/actions/loader_action";
import { deleteAnimal } from "../../../../redux/actions/animal_action";
import { deleteProduct } from "../../../../redux/actions/product_action";
import { removeEmp } from "../../../../redux/actions/user_actions";

const { Option } = Select;

export default function A_P_E_detail(props) {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const { name, data } = props;
    const types = ['Alive', 'Dead', 'Sold', 'Borrowed', 'Pregnant'];

    const customerData = [
        { name: "Name goes here", date: "30th Jan ,2020", expiry: "30th Feb ,2020", location: "Burbank,California", status: "Active" },
        { name: "Name goes here", date: "30th Jan ,2020", expiry: "30th Feb ,2020", location: "Burbank,California", status: "Active" },
        { name: "Name goes here", date: "30th Jan ,2020", expiry: "30th Feb ,2020", location: "Burbank,California", status: "Active" },
    ]

    const filterData = (data) => {
        if (!keyword) return data;
        if (name === 'Employee') {
            if (!(data.name.toLowerCase().search(keyword.toLowerCase()) === -1)) return data;
            if (!(data.email.toLowerCase().search(keyword.toLowerCase()) === -1)) return data;
            return null;
        } else {
            if (!(data.data.name.toLowerCase().search(keyword.toLowerCase()) === -1)) return data;
            if (!(data.categoryName.toLowerCase().search(keyword.toLowerCase()) === -1)) return data;
            return null;
        }
    }


    const removeItem = (item) => {


        const DeleteAnimal = () => {
            console.log(item);
            // dispatch(EnableLoader())
            console.log('removing animals... ');
            dispatch(deleteAnimal(item._id)).then(response => {
                console.log(response);
                dispatch(DisableLoader());
                if (response.payload.status === 200) {
                    props.setrefreshData(Date.now());
                    message.success(response.payload.message);
                }
            })
        }


        const DeleteProduct = () => {
            console.log('in product');
            console.log(item);
            dispatch(EnableLoader())
            dispatch(deleteProduct(item._id)).then(response => {
                dispatch(DisableLoader());
                if (response.payload.status === 200) {
                    props.setrefreshData(Date.now());
                    message.success(response.payload.message);
                }
            })
        }

        const EmpDelete = () => {
            dispatch(EnableLoader());
            dispatch(removeEmp(item._id)).then((response) => {
                dispatch(DisableLoader());
                if (response.payload.status === 200) {
                    message.success(response.payload.message);
                } else {
                    message.error(response.payload.message);
                }
            });
        };

        Modal.confirm({
            title: "Confirm",
            content: "Are you sure you want to remove?",
            okText: "Yes",
            cancelText: "Cancel",
            onOk: name === "Animal" ? DeleteAnimal : name === "Product" ? DeleteProduct : EmpDelete,
        });

    }



    return data[0] ? (
        <div>
            <Row>
                <Col span={12}>
                    <Input
                        placeholder="Search for "
                        onChange={(event) => { console.log(event.target.value); setKeyword(event.target.value) }}
                        className="greybuttonsearch2"
                        prefix={<SearchOutlined />} />
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                    <Space >

                        <Form.Item name="filters">
                            <Input
                                placeholder="Filters"
                                className="greybuttonsearch2" style={{ width: "160px" }}
                                suffix={<FilterFilled />} />
                        </Form.Item>

                        {/* <Form.Item name="sort" >
                            <Select placeholder="Sort by"
                                className="customSelect">
                                {types.map(type => (
                                    <Option value={type}>{type}</Option>
                                ))}
                            </Select>
                        </Form.Item> */}
                    </Space >
                </Col>
            </Row>

            <div className="animal-list">
                {data.filter(filterData).map((d) => (
                    <Card className="animal-list-card"
                        style={{
                            width: "100%;", minWidth: "300px", marginTop: "10px",
                        }}>
                        <Row>

                            <Col xs={24} lg={9}>
                                <Space>
                                    <img
                                        src={name !== "Employee" ? (d.image ? d.image : require(`../../../../../assets/images/familytree/Animal@2x.png`)) :
                                            (d.image ? d.image : require(`../../../../../assets/images/emp/men2.png`))}
                                        width={"45"} style={{ borderRadius: 50 }}
                                        alt="logo"
                                    />

                                    <Space direction="vertical">
                                        <span className="primary-text"> {name !== "Employee" ? d.data.name : d.name} </span>
                                        <span className="secondary-text" style={{ fontSize: 12 }}> Registered date:  {moment(d.createdAt).format(
                                            "DD MMM, YYYY"
                                        )}</span>
                                    </Space>
                                </Space>
                            </Col>
                            <Col lg={1}></Col>

                            <Col xs={24} lg={6}>
                                <Row>
                                    <Col xs={12} md={20}>
                                        <span className="secondary-text">
                                            {name !== "Employee" ? `${name} Category` : "Username"}
                                        </span>
                                    </Col>
                                    <Col xs={12} md={20}>
                                        <span className="primary-text">  {name !== "Employee" ? d.categoryName : d.name}</span>
                                    </Col>
                                </Row>
                            </Col>


                            <Col xs={24} lg={4}>
                                <Row>
                                    <Col xs={12} md={20}>
                                        <span className="secondary-text">
                                            Status
                                </span>
                                    </Col>
                                    <Col xs={12} md={20}>
                                        {/* <span className="primary-text">{d.isActive ? 'Active': 'Unactive'}</span> */}
                                        <span className="primary-text">Active {name === "Animal" ? `(qty ${d.aliveQuantity})` : null}</span>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={24} lg={3} className="textAlign-md-box">
                                {name !== "Employee" ?
                                    <Button className="inner-primary-btn" onClick={() => removeItem(d)}>
                                        {d.isArchived ? "Activate" : "Archieve"}
                                    </Button>
                                    :
                                    d.isEmployeeActive ?
                                        <Button className="inner-primary-btn" onClick={() => removeItem(d)}>
                                            {console.log(d, "<--")}
                                       Block
                                    </Button>
                                        :
                                        <div style={{ margin: 13 }}> <b >Blocked</b></div>

                                }
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>

        </div>
    ) : (
            <div style={{ width: "100%", marginTop: 30 }}>
                <Empty description={"No Data Found!"} />
            </div>
        )
}
