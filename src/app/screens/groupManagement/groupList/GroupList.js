

import React, { useEffect, useState } from "react";
import { Row, Col, List, Typography, Space, message } from "antd";
import Input from '../../../components/input/input';
import { SearchOutlined } from '@ant-design/icons';
import Button from '../../../components/button/button';
import Card from '../../../components/card/card';
import './GroupList.scss';
import { useDispatch } from "react-redux";
import { deleteGroup, getAllGroups } from '../../../redux/actions/group_action'
import { EnableLoader, DisableLoader } from '../../../redux/actions/loader_action'
import moment from 'moment';

import { Link } from "react-router-dom";
const { Text, Title } = Typography;


function GroupList() {
    const dispatch = useDispatch();
    const [groups, setgroups] = useState([]);
    const [keyword, setKeyword] = useState(null);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        dispatch(EnableLoader());
        dispatch(getAllGroups()).then(response => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                setgroups(response.payload.data);
            }
            else {
                message.error(response.payload.message)
            }
        });
    }

    const RemoveGroup = (id) => {
        dispatch(deleteGroup(id)).then(response => {
            if (response.payload.status === 200) {
                getData();
                message.success(response.payload.message)
            }
            else {
                message.error(response.payload.message)
            }
        })
    }

    const dateRendering = (name, value) => {
        return (
            <Space direction="vertical" style={{ textAlign: "center" }} >
                <Text className="secondary-text">{name}</Text>
                <Text>{moment(value).format("DD MMM, YYYY")}</Text>
            </Space>
        )
    }

    const ListGroupMangement = () => {
        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={groups ? groups.filter(filterData) : []}

                renderItem={item => (
                    <Card className="group-list-card">
                        <Row>
                            <Col xl={14} lg={14} md={12} sm={24} xs={24} className="textAlign-sm-box" style={{ marginTop: 10 }}>
                                <Link to={{ pathname: '/groups/detail', state: { id: item._id } }}><Title level={4}>{item.name}
                                    <img style={{ marginLeft: "5px", marginBottom: "5px" }} width={'30'} src={require('../../../../assets/images/edit.png')} alt="edit" /></Title></Link>
                                {/* <Text className="secondary-text" strong>{item.animals.length} animals</Text> */}
                            </Col>
                            <Col xl={10} lg={10} md={12} sm={24} xs={24} className="textAlign-sm-box">
                                <Row>
                                    <Col xl={8} lg={8} md={8} sm={12} xs={24} >
                                        {dateRendering('Creation date', item.createdAt)}
                                    </Col>
                                    <Col xl={8} lg={8} md={8} sm={12} xs={24} >
                                        {dateRendering('Last updated', item.updatedAt)}
                                    </Col>
                                    <Col xl={8} lg={8} md={8} sm={12} xs={24} className="textAlign-sm-box">
                                        <Button className="inner-white-btn" onClick={() => RemoveGroup(item._id)}>Remove</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                )}
            />
        )
    }


    const searchData = (e) => {
        setKeyword(e.target.value);
    }
    const filterData = (group) => {
        if (!keyword) return group;
        if (!(group.name.toLowerCase().search(keyword.toLowerCase()) === -1)) return group;
        return null;
    }

    return (
        <div>
            <Row >
                <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                    <h2 className="primary-text primary-text-heading textAlign-sm-box ">Group Management</h2>
                </Col>

                <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Row gutter={10}>
                        <Col xl={16} lg={16} md={12} sm={24} xs={24} className="textAlign-sm-box">
                            <Input placeholder="Search animal" onChange={searchData} className="greybuttonsearch" prefix={<SearchOutlined />} />
                        </Col>
                        <Col xl={8} lg={8} md={12} sm={24} xs={24} className="textAlign-sm-box">
                            <Link to={"/groups/create"}><Button className="secondary-button" block>Create new group</Button></Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="group-list">
                {ListGroupMangement()}
            </div>
        </div>
    )

}




export default GroupList;