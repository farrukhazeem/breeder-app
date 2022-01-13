import React from 'react';
import { Row, Col, Space, Typography } from 'antd';
import Button from '../../../components/button/button';
import Card from '../../../components/card/card';
import './GroupDetail.scss';

const { Text, Title } = Typography;

export default function AssignEmp(props) {
    const { setempAddModal, empAddModal, Employees, selectedEmployee, removeEmployee, setEmployees } = props

    const onRemoveEmp = (e) => {
        const removed = Employees.saveEmp.filter(arr => arr._id !== e._id)
        //console.log("RemoveEmp", removed)
        setEmployees({ ...Employees, ...{ saveEmp: removed } })
    }

    return (
        <div className="gd-assign-emp-main">

            <Row>
                <Col span={12}>
                    <Title level={3}>Assigned Employees</Title>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button onClick={() => setempAddModal(!empAddModal)}>Assign employee</Button>
                </Col>
            </Row>

            <Row gutter={10}>
                {selectedEmployee && selectedEmployee.map((e) => (
                    <Col lg={4} md={6} sm={12} xs={24} key={e._id}>
                        <Card className="gd-emp-card">
                            <Space direction='vertical'>
                                <img src={e.image ? e.image : require('../../../../assets/images/emp/men3.png')} style={{ borderRadius: "25px" }} width={'50'} alt="logo" />
                                <Text strong>{e.name}</Text>
                            </Space>
                            <div className="removeEmp">
                                <a onClick={() => removeEmployee(e)}>Remove</a>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
