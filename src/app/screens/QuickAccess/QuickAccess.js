import React from "react";
import { Col, Row, Space, Typography } from "antd";
import Card from "../../components/card/card";
import LayoutHeader from "../layout/LayoutHeader";
import './QuickAccess.scss';
const { Title } = Typography;

export default function QuickAccess(props) {
  return (
    <LayoutHeader>
      <div className="quickAccessBody">
        <Row gutter={100} className="qa-row">
          <Col span={8} className="qa-col">
            <Card className="qa-card" onClick={() => props.history.push('/dashboard')} >
              <Space className="qa-card-space" size={25}>
                <img src={require('../../../assets/images/icons/Dasboard.png')} />
                <Title className="qa-card-space-title" level={4}>Dashboard</Title>
              </Space>
            </Card>
          </Col>
          <Col span={8} className="qa-col">
            <Card className="qa-card" onClick={() => props.history.push('/sales')} >
              <Space className="qa-card-space" size={25}>
                <img src={require('../../../assets/images/icons/Sales Management.png')} />
                <Title className="qa-card-space-title" level={4}>Sales Management</Title>
              </Space>
            </Card>
          </Col>
          <Col span={8} className="qa-col">
            <Card className="qa-card" onClick={() => props.history.push('/activity-management')} >
              <Space className="qa-card-space" size={25}>
                <img src={require('../../../assets/images/icons/Activity Management.png')} />
                <Title className="qa-card-space-title" level={4}>Activity Management</Title>
              </Space>
            </Card>
          </Col>
          <Col span={8} className="qa-col">
            <Card className="qa-card" onClick={() => props.history.push('/contact')}  >
              <Space className="qa-card-space" size={25}>
                <img src={require('../../../assets/images/icons/Contact Management.png')} />
                <Title className="qa-card-space-title" level={4}>Contact Management</Title>
              </Space>
            </Card>
          </Col>
          <Col span={8} className="qa-col">
            <Card className="qa-card" onClick={() => props.history.push('/animal')} >
              <Space className="qa-card-space" size={25}>
                <img src={require('../../../assets/images/icons/Animal Management.png')} />
                <Title className="qa-card-space-title" level={4}>Aninmal Management</Title>
              </Space>
            </Card>
          </Col>
          <Col span={8} className="qa-col">
            <Card className="qa-card" onClick={() => props.history.push('/product')} >
              <Space className="qa-card-space" size={25}>
                <img src={require('../../../assets/images/icons/Product Management.png')} />
                <Title className="qa-card-space-title" level={4}>Product Management</Title>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </LayoutHeader>
  );
}
