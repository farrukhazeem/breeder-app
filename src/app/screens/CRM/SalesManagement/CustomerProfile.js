import React, { useState, useEffect } from 'react';
import { Row, Col, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Button from '../../../components/button/button'
import Input from '../../../components/input/input'
import Cart from '../../../components/card/card'
import moment from 'moment'
import { getBreederSaleList } from "../../../redux/actions/sales_action";
import { EnableLoader, DisableLoader } from "../../../redux/actions/loader_action";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

const types = ['All purchases', 'yearly', 'montly', 'Borrowed'];

function CustomerProfile(props) {
    const { item } = props.location.state;
    const [Sales, setSales] = useState([])
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        if (item._id) {
            dispatch(EnableLoader());
            dispatch(getBreederSaleList(item._id)).then((response) => {
                dispatch(DisableLoader());
                console.log(response);
                if (response.payload.status === 200) {
                    setSales(response.payload.data);
                }
            });
        }
    }, [item])

    const inputKeywordChange = (event) => {
        setKeyword(event.target.value);
    }


    const filterData = (item) => {
        if (!keyword) return item;
        if (!(item.saleUniqueId.search(keyword) === -1)) return item;
        // return null;
    }


    return (
        <>
            <Row>
                <Col xs={24} md={24} xl={12} className="textAlign-sm-box" >
                    <h2 className="primary-text primary-text-heading">Customer Profile</h2>
                </Col>

                <Col xs={24} md={12} xl={5} className="textAlign-sm-box">
                    <Row>
                        <Col xs={24} lg={20} className="primary-text">
                            <Input onChange={inputKeywordChange} placeholder="Search purchase" className="greybuttonsearch" prefix={<SearchOutlined />} />
                        </Col>
                    </Row>
                </Col>

            </Row>


            <Row>
                <Col xs={24} md={12} lg={10} className="textAlign-sm-box">
                    <span className="primary-contrast-background-color2 fs-180">{item.name}</span>
                    <div></div>
                    <Space direction="vertical">
                        <Space>
                            <span className="secondary-text fs-110">Email: </span>
                            <span className="primary-text fs-110">{item.email}</span>
                        </Space>
                        <Space>
                            <span className="secondary-text fs-110">Phone: </span>
                            <span className="primary-text fs-110">{item.phone}</span>
                        </Space>
                        <Space>
                            <span className="secondary-text fs-110">Address: </span>
                            <span className="primary-text fs-110">{item.city}, {item.state}</span>
                        </Space>
                    </Space>

                    <br /><br />
                    {Sales.length > 0 &&
                        <>
                            <div className="primary-contrast-background-color2 fs-180">Purchase info</div>

                            <Space>
                                <Cart style={{ width: '160px', height: "128px", }} className="primary-contrast-background">
                                    <div style={{ textAlign: "center" }}><b className="primary-text primary-text-heading">{Sales.length}</b></div>
                                    <div style={{ textAlign: "center" }}><b className="secondary-text">No.of purchases</b></div>
                                </Cart>



                                <Cart style={{ width: '160px', height: "128px" }} className="primary-contrast-background">
                                    <div style={{ textAlign: "center" }} className="primary-text primary-text-heading">${Sales.map(r => r.totalPrice).reduce((e, t) => e + t)}</div>
                                    <div style={{ textAlign: "center" }}><b className="secondary-text">Total Purchase Amount</b></div>
                                </Cart>
                            </Space>
                            <div style={{ marginTop: "20px" }}></div>
                        </>
                    }
                </Col>

                <Col xs={0} lg={2}></Col>

                <Col xs={24} md={12} lg={12} className="textAlign-sm-box">
                    <div className="primary-contrast-background-color2 fs-180">Purchase History</div>
                    {Sales.length > 0 ? Sales.filter(filterData).map(e => (
                        <Cart style={{ marginTop: "10px" }}>
                            <Row>
                                <Col xs={24} lg={12}>
                                    <Space direction="vertical">
                                        <span className="primary-contrast-background-color2 fs-130"># {e.saleUniqueId}</span>
                                        <div className=" primary-contrast-background-color2 ">
                                            On:{moment(e.createdAt).format('DD MMM, YYYY ')}
                                        </div>
                                        <div className="primary-contrast-background-color2 ">
                                            Payment Option: {e.isInstallment ? "Installments" : "No Installment"}
                                        </div>
                                    </Space>
                                </Col>

                                <Col xs={24} lg={12} className="textAlign-sm-box">
                                    <Space direction="vertical">
                                        <Space>
                                            <span className="primary-contrast-background-color2 fs-130">${e.totalPrice}</span>
                                        </Space>
                                        <div className="primary-contrast-background-color2 ">
                                            Paid: {e.isPaid ? "Paid" : "Unpaid"}
                                        </div>
                                        {e.downpayment ?
                                            <div className=" primary-contrast-background-color2 ">
                                                Down payment: {e.downpayment}
                                            </div>
                                            : null}
                                        {/* <div className="primary-contrast-background-color2 ">
                                            Receivable amount: $450
                                    </div> */}

                                    </Space>
                                </Col>
                            </Row>
                        </Cart>
                    )) :
                        <b>No  Sale found</b>
                    }


                    {/* <div style={{ marginTop: "20px" }}></div>
                    <div className="primary-contrast-background-color2 fs-180">Purchase History</div>
                    {
                        types.splice(0, 3).map((type) => (
                            <Cart style={{ marginTop: "10px" }}>
                                <Row>
                                    <Col xs={24} lg={12}>
                                        <Space direction="vertical">
                                            <span className="primary-contrast-background-color2 fs-130">Order Id</span>
                                            <div className=" primary-contrast-background-color2 ">
                                                Sold On:{moment("2018-05-18T04:00:00.000Z").format('DD MMM, YYYY ')}
                                            </div>
                                            <div className="primary-contrast-background-color2 ">
                                                Sold amount: $100
                                            </div>
                                        </Space>
                                    </Col>
                                </Row>
                            </Cart>
                        ))
                    } */}


                </Col>
            </Row>
        </>
    )
}


export default CustomerProfile;