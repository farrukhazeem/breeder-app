import React, { useEffect, useState } from 'react'
import { Row, Col, Divider, Space, Form, Select, Menu, Dropdown, message, Modal, Typography, DatePicker } from 'antd';
import Input from '../../../components/input/input'
import Card from '../../../components/card/card'
import Button from '../../../components/button/button'
import { Link } from 'react-router-dom'
import { SearchOutlined, FilterFilled, MoreOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { DisableLoader, EnableLoader } from '../../../redux/actions/loader_action';
import { getAllUsers, blockBreeder, deleteBreeder, approveBreeder, resendEmailBreeder } from '../../../redux/actions/user_actions';
import moment from 'moment';
import { getSubscriptions, updateSubscriber } from "../../../redux/actions/subscription_action";

const { Option } = Select;

export default function AccountManagement() {

    const [form] = Form.useForm();
    const [user, setUser] = useState([]);

    const [Visible, setVisible] = useState(false);
    const [Selected, setSelected] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        dispatch(EnableLoader());
        dispatch(getAllUsers('breeder')).then((response) => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                setUser(response.payload.data);
            }
        })
    }

    const types = ['Alive', 'Dead', 'Sold', 'Borrowed', 'Pregnant'];

    const [keyword, setKeyword] = useState(null);
    const searchData = (e) => {
        setKeyword(e.target.value);
    }
    const filterData = (user) => {
        if (!keyword) return user;
        if (user?.name && !(user?.name.toLowerCase().search(keyword.toLowerCase()) === -1)) return user;
        if (user?.email && !(user?.email.toLowerCase().search(keyword.toLowerCase()) === -1)) return user;
        if (!(user.state.toLowerCase().search(keyword.toLowerCase()) === -1)) return user;
        if (!(user.city.toLowerCase().search(keyword.toLowerCase()) === -1)) return user;
        if (!(user.uid.toString().toLowerCase().search(keyword.toLowerCase()) === -1)) return user;
        return null;
    }


    const BlockBreeder = (d) => {
        dispatch(EnableLoader());
        dispatch(blockBreeder({ isblocked: !d.isblocked }, d._id)).then((response) => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                getData();
                message.success(response.payload.message);
            }
            else {
                message.success(response.payload.message);
            }
        })
    }


    const DeleteBreederEmp = (d) => {
        dispatch(EnableLoader());
        dispatch(deleteBreeder(d._id)).then((response) => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                getData();
                message.success(response.payload.message);
            }
            else {
                message.success(response.payload.message);
            }
        })
    }

    const ResendEmail = (d) => {
        dispatch(EnableLoader());
        dispatch(resendEmailBreeder(d._id)).then((response) => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {

                message.success(response.payload.message);
            }
            else {
                message.success(response.payload.message);
            }
        })
    }

    const ApproveBreeder = (d) => {
        dispatch(EnableLoader());
        dispatch(approveBreeder(d._id)).then((response) => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                getData();
                message.success(response.payload.message);
            }
            else {
                message.success(response.payload.message);
            }
        })
    }

    const menu = (d) => (
        <Menu>
            <Menu.Item key="1">
                <Link onClick={() => BlockBreeder(d)}>{d.isblocked ? 'Activate' : 'Block'}</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link onClick={() => DeleteBreederEmp(d)}>Delete</Link>
            </Menu.Item>
            {!d.verified &&
                <Menu.Item key="3">
                    <Link onClick={() => ResendEmail(d)}>Resend Email</Link>
                </Menu.Item>}
            {!d.verified &&
                <Menu.Item key="4">
                    <Link onClick={() => ApproveBreeder(d)}>Approve</Link>
                </Menu.Item>
            }
        </Menu>
    );


    useEffect(() => {
        getSubscription()
    }, [])

    const [subscriptionData, setSubscriptionData] = useState([]);
    const getSubscription = () => {
        dispatch(EnableLoader());
        dispatch(getSubscriptions()).then((response) => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                getData();
                var resArr = [];
                response.payload.data.forEach(function (item) {
                    var i = resArr.findIndex(x => x.name == item.name);
                    if (i <= -1) { resArr.push(item); }
                });
                setSubscriptionData(resArr)
            }
        });
    }

    const onFinish = (values) => {
        values.userId = Selected.userId
        dispatch(EnableLoader());
        dispatch(updateSubscriber(Selected.subscriber, values)).then((response) => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                getData();
                form.resetFields()
                message.success(response.payload.message);
                setVisible(false)
            }
            else {
                message.success(response.payload.message);
            }
        })

    }


    const [statusFilter, setstatusFilter] = useState("All")
    const filterDataStatus = (user) => {
        if (statusFilter === "All")
            return user;
        if (statusFilter === "Active") { if (user && user.isblocked === false) return user; }
        else
            if (user && user.isblocked === true) { return user; }

    }

    return (
        <div >
            <h2 className="primary-text primary-text-heading">Account Management</h2>
            <Divider />

            <Row>
                <Col span={12}>
                    <Input onChange={searchData}
                        placeholder="What are you looking for?"
                        className="greybuttonsearch2"
                        prefix={<SearchOutlined />} />
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                    <Space >

                        <Select placeholder="Select Status" defaultValue="All"
                            className="customSelect" style={{ minWidth: "150px" }} onChange={(e) => setstatusFilter(e)}>
                            {["All", "Active", "Blocked"].map(type => (
                                <Option value={type} key={type}>{type}</Option>
                            ))}
                        </Select>

                        {/* <Form.Item name="filters">
                            <Input
                                placeholder="Filters"
                                className="greybuttonsearch2" style={{ width: "160px" }}
                                suffix={<FilterFilled />} />
                        </Form.Item> */}

                        {/* <Form.Item name="sort" >
                            <Select placeholder="Sort by" style={{ minWidth: "130px" }}
                                className="customSelect">
                                {types.map(type => (
                                    <Option value={type}>{type}</Option>
                                ))}
                            </Select>
                        </Form.Item> */}
                    </Space >
                </Col>
            </Row>


            {user.filter(filterDataStatus).filter(filterData).map((d) => (
                <Card
                    style={{
                        width: "100%;", height: "auto", minWidth: "300px", marginTop: "10px",
                    }}>
                    <Row>
                        <Col xs={24} lg={6}>
                            <Space>

                                <Space direction="vertical">
                                    <span className="primary-text" style={{ fontSize: "18px", fontWeight: "bold" }}>
                                        <Space>
                                            <Link className="primary-text">
                                                {d.name}
                                            </Link>
                                            {d.verified &&
                                                <img src={require('../../../../assets/images/icons/completed.png')} style={{ width: 20, height: 20 }} />
                                            }
                                        </Space>
                                    </span>
                                    <span>
                                        <Typography.Text className="primary-text"><Typography.Text className='secondary-text'>Care Giver ID:</Typography.Text> {d.uid}</Typography.Text>
                                    </span>
                                    <Button className="inner-primary-btn-green" onClick={() => { setSelected({ subscriptionId: d.activeSubscription?.subscriptionId?._id, userId: d._id, subscriber: d.activeSubscription?._id }); setVisible(true); }}>{d.activeSubscription?.subscriptionId?.name}</Button>
                                </Space>
                            </Space>
                        </Col>

                        <Col xs={24} lg={4}>
                            <Row>
                                <Col xs={12} md={20}>
                                    <span className="secondary-text">
                                        Subscription Date
                  </span>
                                </Col>
                                <Col xs={12} md={20}>
                                    <span className="primary-text">{moment(d.activeSubscription?.fromDate).format("DD MMM, YYYY")}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} lg={4}>
                            <Row>
                                <Col xs={12} md={20}>
                                    <span className="secondary-text">Expiry</span>
                                </Col>
                                <Col xs={12} md={20}>
                                    <span className="primary-text">{moment(d.activeSubscription?.toDate).format("DD MMM, YYYY")}</span>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={24} lg={4}>
                            <Row>
                                <Col xs={12} md={20}>
                                    <span className="secondary-text">
                                        Location
                                    </span>
                                </Col>
                                <Col xs={12} md={20}>
                                    <span className="primary-text">{d.city}, {d.state}</span>
                                </Col>
                            </Row>
                        </Col>


                        <Col xs={24} lg={2}>
                            <Row>
                                <Col xs={12} md={20}>
                                    <span className="secondary-text">
                                        Status
                                </span>
                                </Col>
                                <Col xs={12} md={20}>
                                    <span className="primary-text">{d.isblocked ? 'Blocked' : 'Active'}</span>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={24} lg={4} className="textAlign-md-box">
                            <Space style={{ marginTop: 5 }}>
                                <Button className="inner-primary-btn">
                                    <Link to={{ pathname: "/admin/account/detail", state: { id: d._id } }}>View Details</Link></Button>

                                <Dropdown overlay={() => menu(d)} trigger={['click']}>
                                    <MoreOutlined style={{ fontSize: 25 }} />
                                </Dropdown>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            ))}


            <Modal visible={Visible} footer={null} closable={false} centered>
                <div>
                    <b className="primarytext primary-text-heading" style={{ fontSize: 20 }}>
                        Change Package
                     </b>
                </div>
                <br />
                <Form onFinish={onFinish} form={form}>
                    {/* <CardElement options={CARD_OPTIONS} /> */}
                    <Form.Item name="subscriptionId"
                        rules={[{ required: true, message: "Please select Package" }]}>
                        <Select placeholder="Select package" style={{ minWidth: "130px" }}
                            className="customSelect">
                            {subscriptionData.filter(e => e._id !== Selected.subscriptionId)
                                .map(type => (
                                    <Option value={type._id}>{type.name}</Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="toDate"
                        rules={[{ required: true, message: "Please select Expiry Date" }]}>
                        < DatePicker placeholder='Expiry Date' format={'DD MMM, YYYY'} //onChange = {(date, dateString) => onChangePicker(date, dateString, e, idx)}
                            disabledDate={d => !d || d.isSameOrBefore(moment(new Date()).format("DD MMM, YYYY"))}
                            style={{ padding: 8, borderRadius: 8, width: '100%', marginTop: 10 }} />
                    </Form.Item>
                    <Space>
                        <Button
                            className="secondary-button"
                            onClick={() => { setVisible(false); form.resetFields(); }}>
                            Discard
            </Button>
                        <Button type="submit" htmlType="submit">
                            Update
            </Button>
                    </Space>
                </Form>
            </Modal>
        </div>
    )
}
