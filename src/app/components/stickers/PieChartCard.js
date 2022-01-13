import React from 'react';
//import { UserOutlined } from '@ant-design/icons';
import { Progress, Row, Col, Typography } from 'antd';
import Card from '../card/card';
import './PieChartCard.scss';

const { Title, Text } = Typography;

function PieChartCard(props) {
    return (
        <Card {...props} className='pie-chart-card-main'>

            {/* <Col span={10} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}  >
                    <Progress type="circle" percent={props.percentage} width={50} strokeWidth={12} />
                </Col> */}
            <div style={{ textAlign: "center" }}>
                <Title level={4} style={{ marginBottom: 0 }}>{props.totalCount}</Title>
                <Text strong style={{ fontSize: 12 }}>{props.titleText}</Text>
            </div>
        </Card>
    );
}



export default PieChartCard;