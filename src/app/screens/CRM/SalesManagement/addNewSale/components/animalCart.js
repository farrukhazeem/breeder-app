import React from 'react';
import Card from '../../../../../components/card/card';
import QuantityChange from './quantityChange';
import { Space, Avatar, Typography, List, Row, Col, Divider } from 'antd';
import { UserOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function AnimalCart(props) {

    const cardBody = (data) =>
        <Row className="animal-cart-item">
            <Col span={12}>
                <Space className="animal-cart-item">
                    <img src={data.image ? data.image : require(`../../../../../../assets/images/gallery/1st image@2x.png`)} style={{ borderRadius: "30px", width: 45, height: 45 }} alt="logo" />
                    <Space direction="vertical">
                        <Text strong style={{ fontSize: 20 }}>{data.data.name}</Text>
                        {/* {data.itemType==='animal'? <Text strong><span className="secondary-text">Breed:</span> {data.data.breed}</Text> : <Text strong><span className="secondary-text">Breed:</span> {data.data.breed}</Text> } */}
                        <Text strong><span className="secondary-text">{data.itemType==='animal' ? 'Animal ID': 'Product ID'}:</span> {data._id.substring(0, 6)}</Text>
                    </Space>
                </Space>
            </Col>
            <Col span={5} className="center-align-items">
                <QuantityChange item={data} {...props} />
            </Col>
            <Col span={4} className="center-align-items">
                <Text strong>${data.data.price}</Text>
            </Col>
            <Col span={3} className="center-align-items">
                <CloseOutlined onClick={() => props.removeAnimal(data)} />
            </Col>
            <Divider />
        </Row>

    // return props.data.map(e => <Card className="animal-list-card">{cardBody(e)}</Card>)
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.data}
            renderItem={item => (
                <List.Item>
                    {cardBody(item)}
                </List.Item>
            )}
        />
    )
}

export default AnimalCart;