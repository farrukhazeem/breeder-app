import React from 'react'
import { Row, Col, Typography, List, Space, Divider } from 'antd';
import './SubInventory.scss';

const { Title, Text } = Typography;

function Inventory(props) {
    console.log(props);
    // const inventoryData = transformInventoryData(props.data);
    // const categoryStatistic = props.types;
    return props.data ? props.data.map(inv => (
        <div className="inv-main-tier">
            <Divider />

            <Row>
                <Col md={4} xs={24}>
                    <Title level={3}>{inv.category.name} ({inv.items ? inv.items.length : 0})</Title>
                </Col>
                <Col md={20} xs={24} style={{ paddingTop: 11 }}>
                    <List

                        style={{ float: 'right' }}
                        grid={{ column: 5 }}
                        dataSource={getCategoryStatics(inv, props.types)}
                        renderItem={item => <div style={{ marginLeft: "35px" }}><span className="secondary-text">{item.name}:</span><span>{item.value}</span></div>}
                    />
                </Col>
            </Row>

            <List
                size="large"
                dataSource={inv.items}
                renderItem={item => (<List.Item className='inv-list-item'>{InventorySubCat(item, props.types)}</List.Item>)}
            />
        </div>
    )) : (<></>);



}


const InventorySubCat = (data, types) => {
    return (
        <Row style={{ width: '100%' }}>
            <Col md={4} xs={24} className='flex-middle'>
                <Text strong>{data.name}</Text>
            </Col>
            <Col md={20} xs={24}>
                <List
                    size="large"
                    style={{ float: 'right' }}
                    grid={{ gutter: 1, column: 6 }}
                    itemLayout="vertical"
                    dataSource={getStatics(data, types)}
                    renderItem={item => <div style={{ marginLeft: 20 }} className='inv-sub-cat-item'>{InventoryStaticValues(item)}</div>}
                />
            </Col>
        </Row>
    )
}


const getStatics = (data, types) => {
    // return [...[{ name: 'Total', value: data.total }], ...types.map(type => ({ name: type, value: data[type.toLowerCase()] }))];
    return [...types.map(type => ({ name: type, value: data[type.toLowerCase()] }))];

}


const getCategoryStatics = (data, types) => {
    return types.map(type => ({ name: type, value: data[type.toLowerCase()] }));
}



const InventoryStaticValues = (dataStats) => {
    return (
        <Space direction="vertical" align="center" size="small">
            <Text style={{ fontSize: 30 }} strong className="secondary-text">{dataStats.value}</Text>
            <Text strong>{dataStats.name}</Text>
        </Space>
    )
}


export default Inventory;