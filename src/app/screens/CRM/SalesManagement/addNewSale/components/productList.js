import React from 'react';
import Card from '../../../../../components/card/card';
import { Space, Avatar, Typography } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function ProductList(props) {
    const cardBody = (data) => <div>
        <PlusOutlined onClick={() => props.addToCart({...data, itemType: 'product'})} className="animal-card-add-button" />
        <Space>
            <img src={data.image ? data.image : require(`../../../../../../assets/images/familytree/parent2@2x.png`)} style={{ borderRadius: "10px", width: 45, height: 45 }} alt="logo" />
            <Space direction="vertical">
                <Text strong><span className="secondary-text">Name:</span> {data.data.name}</Text>
                <Text strong><span className="secondary-text">Product ID:</span> {data._id.substring(0, 6)}</Text>
                <Text strong><span className="secondary-text">Price:</span> {data.data.price}</Text>
            </Space>
        </Space>
    </div>
    return props.data.map(e => <Card className="animal-list-card">{cardBody(e)}</Card>)
}

export default ProductList;