import React, { useState } from 'react';
import { Row, Col, Space, Form, Select, message, Divider, Radio } from 'antd';
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import Cart from '../../../components/card/card';
import Checkbox from '../../../components/checkbox/Checkbox';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import NewSalesCustomer from './NewSalesCustomer'
import ExistingCustomer from './ExistingCustomer';
const { Option } = Select;

const animals = [
    { id: 123, animal: 'Dog', status: 'Alive', price: '120' }, { id: 223, animal: 'Dog', status: 'Busy', price: '160' },
    { id: 323, animal: 'Cat', status: 'Alive', price: '300' }, { id: 423, animal: 'Dog', status: 'Dead', price: '150' },
    { id: 523, animal: 'Hen', status: 'Dead', price: '120' }, { id: 623, animal: 'Hen', status: 'Dead', price: '300' },];

function NewSale() {
    const [tabIndex, setTabIndex] = useState('New')

    const ticked = []
    const onFinish = values => {
        message.success("successfully submit")
        //console.log(values);
    };

    function onChangeChecked(e) {
        //console.log('checked = ', e.target.value);
        ticked.push(e.target.value)
        console.log("ticked", ticked)
    }

    return (
        <div>
            <Form onFinish={onFinish}>
                <Row >
                    <Col xs={24} className="textAlign-sm-box">
                        <span className="primary-text primary-text-heading ">New Sale</span>
                        <div className="textAlign-sm-right textAlign-margintop-neg ">
                            <Space >
                                <Button >Discard</Button>
                                <Button htmlType="submit">Continue</Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
                <br />

                <Row gutter={50}>
                    <Col xs={24} md={12} lg={8} className="textAlign-md-box"  >
                        <div className="primary-contrast-background-color2 fs-170">Select animal</div>
                        <Row gutter={10}>
                            <Col xs={24} md={18} lg={20} className="textAlign-md-box">
                                <Input className="" placeholder="Search animal" className="greybuttonsearch" prefix={<SearchOutlined />} />
                            </Col>
                            <Col xs={24} md={6} lg={4} className="textAlign-md-box">
                                <Button>Filters</Button>
                            </Col>
                        </Row>

                        <br />

                        {animals.map((animal) => (
                            <div style={{ marginTop: "9px" }}>
                                <Cart>
                                    <Row>
                                        <Col xs={22}>
                                            <Space>
                                                <img src={require('../../../../assets/images/logo.png')} width={'70'} alt="logo" />
                                                <Space direction="vertical">
                                                    <h2 className="primary-text fs-150">{animal.id}</h2>
                                                    <Space>
                                                        <span className="secondary-text">Animal Category:</span>
                                                        <span className="primary-text">{animal.animal}</span>
                                                    </Space>
                                                    <Space>
                                                        <span className="secondary-text">Status:</span>
                                                        <span className="primary-text">{animal.status}</span>
                                                    </Space>
                                                </Space>
                                            </Space>
                                        </Col>
                                        <Col xs={2}>
                                            <Checkbox options={animals} onChange={onChangeChecked} value={animal}></Checkbox>
                                        </Col>
                                    </Row>

                                </Cart>
                            </div>
                        ))}


                    </Col>


                    <Col xs={24} md={12} lg={8}>
                        <div className="primary-contrast-background-color2 fs-170">Price</div>

                        {animals.map((animal) => (
                            <div>
                                <Row >
                                    <Col xs={22}>
                                        <Space>
                                            <CloseOutlined />
                                            <span className="primary-text fs-120">Animal id {animal.id}</span>
                                        </Space>
                                    </Col>
                                    <Col xs={2}>
                                        <span className="primary-text fs-120">${animal.price}</span>
                                    </Col>
                                </Row>
                                <div style={{ marginTop: "20px" }}></div>
                            </div>
                        ))}


                        <Divider />
                        <Row >
                            <Col xs={22}>
                                <Space>
                                    <span className="secondary-text fs-120">Total</span>
                                </Space>
                            </Col>
                            <Col xs={2}>
                                <span className="primary-text fs-150">$800</span>
                            </Col>
                        </Row>

                        <div style={{ marginTop: "30px" }}></div>
                        <div className="primary-contrast-background-color2 fs-170">Payment Option</div>
                        <span className="primary-text fs-110">Pyment Option:</span>
                        <div style={{ marginTop: "15px" }}></div>
                        <Form.Item name="installment">
                            <Select
                                placeholder="Select installment"
                                className="customSelect">
                                <Option value="2 months installment">2 months installment</Option>
                                <Option value="1 months installment">1 months installment</Option>
                            </Select>
                        </Form.Item>

                    </Col>

                    <Col xs={24} md={12} lg={8} className="textAlign-md-box">
                        <div className="primary-contrast-background-color2 fs-170">Customer Info</div>

                        <div className="customerinfo-radio setting-radio-btn-switch-two ">
                            <Radio.Group value={tabIndex} onChange={(index) => { setTabIndex(index.target.value) }} style={{ marginBottom: 16 }}>
                                <Radio.Button value="New">New Customer</Radio.Button>
                                <Radio.Button value="Existing">Existing Customer</Radio.Button>
                            </Radio.Group>
                        </div>


                        {tabIndex === "New" ? <NewSalesCustomer /> : <ExistingCustomer />}
                    </Col>
                </Row>


            </Form>

        </div>

    )
}






export default NewSale;