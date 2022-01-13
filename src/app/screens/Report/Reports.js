import React, { useState } from 'react';
import { Row, Col, Modal, Typography, Form, Space, message } from 'antd';
import Card from '../../components/card/card'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import { Link } from 'react-router-dom'
const { Title } = Typography;
const names = [{ name: 'Staff Report', image: "Staff Report@2x.png" }, { name: 'Animal Report', image: "Animal Report@2x.png" }, { name: 'Inventory Report', image: "Inventory Report@2x.png" }];
function Report() {
    const onFinish = values => {
        message.success("successfully submit")
        setmodal(!modal)
    };
    const [modal, setmodal] = useState(false);
    return (
        <>
            <div className="primary-text primary-text-heading textAlign-sm-box">
                Generate MIS Reports</div>

            <div className="textAlign-sm-box">
                <Row className="textAlign-sm-box">
                    {names.map(name => (
                        <Col xs={24} lg={8} xl={8} className="">
                            <Card style={{ maxWidth: '340px', height: "270px", margin: "10px", paddingTop: "35px" }} className="">
                                <div style={{ textAlign: "center" }} >
                                    <div ><img className="textAlign-sm-box" width={'50'} src={require(`../../../assets/images/reports/${name.image}`)} alt="Logo" /> </div>
                                    <div style={{ marginTop: "10px" }}><Link to="/empmanagement/employee/2" className="primary-text fs-150 ">{name.name} </Link></div>
                                    <div ><Button className="secondary-button" onClick={() => setmodal(true)}>Generate Report</Button></div>
                                </div>

                            </Card>
                        </Col>
                    ))}
                </Row>



                <Modal visible={modal} footer={null} closable={false}
                    centered={true} >
                    <Form onFinish={onFinish}>
                        <Title level={3} strong>Generate MIS Report</Title>
                        <Row span={16}>
                            <Col span={16} >
                                Time period:
                            </Col>
                        </Row>
                        <Form.Item name="period"
                            rules={[
                                {
                                    //    required: true, message: 'Please input time period!',
                                },]}>
                            <Input style={{ width: "60%" }} placeholder="Enter time period" className="textAlign-sm-marginLeft" />
                        </Form.Item>
                        <Space>
                            <Button className="secondary-button" onClick={() => setmodal(!modal)}>Cancel</Button>
                            <Button className="secondary-button" htmlType="submit">Generate</Button>
                        </Space>
                    </Form>
                </Modal>
            </div>


        </>
    )
}

export default Report;