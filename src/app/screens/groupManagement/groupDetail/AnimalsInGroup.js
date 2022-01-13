import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Typography, Avatar, Modal, Checkbox } from 'antd';
import { EditFilled, SearchOutlined, UserOutlined, FilterFilled } from '@ant-design/icons'
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import Card from '../../../components/card/card';
import './GroupDetail.scss';

const { Text, Title } = Typography;

export default function AnimalsInGroup(props) {
    const { Animals, setAnimals } = props
    const [tempGroupAnimal, settempGroupAnimal] = useState([])

    const removeSelectedAnimalFromGroup = () => {
        let data = [];
        let GroupAnimaldata = tempGroupAnimal.map(t => t._id)
        data = Animals.saveAnimal.filter(e => GroupAnimaldata.indexOf(e._id) === -1)
        return data
    }

    const onRemoveGroupAnimals = () => {
        setAnimals({ ...Animals, ...{ filterGroupAnimals: Animals.filterGroupAnimals.concat(tempGroupAnimal) }, ...{ saveAnimal: removeSelectedAnimalFromGroup() } })
        settempGroupAnimal([])
    }

    const onRemoveAnimal = (remove) => {
        let data = Animals.saveAnimal.filter(e => e._id !== remove._id)
        setAnimals({ ...Animals, ...{ filterGroupAnimals: Animals.filterGroupAnimals.concat([remove]) }, ...{ saveAnimal: data } })
    }

    const onChangeAnimalCheckbox = (checkedValues) => {
        console.log("checkedValuesAnimal", checkedValues)
        settempGroupAnimal(checkedValues)
    }

    return (
        <>

            <Card className="primary-contrast-background">
                <Title level={3}>Animals in Group</Title>
                <Row gutter={10}>
                    <Col span={18}>
                        <Input placeholder="Search animal" className="greybuttonsearch" prefix={<SearchOutlined />} suffix={<FilterFilled />} />
                    </Col>
                    <Col span={4}>
                        <Button className="gd-items-card-btn" onClick={() => onRemoveGroupAnimals()}>Remove</Button>
                    </Col>
                </Row>

                <div className="gd-items-card-list">
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChangeAnimalCheckbox}>
                        {Animals.saveAnimal.map((e) => (
                            <Card className="gd-items-card" key={e._id}>
                                <Row>
                                    <Col span={16} >
                                        <div>
                                            <Space className='gd-animal-card-item-space'>
                                                <Checkbox value={e}></Checkbox>
                                                <img src={require('../../../../assets/images/familytree/Animal@2x.png')} width={'50'} alt="logo" />
                                                <Space direction="vertical">
                                                    <Text strong>{e._id}</Text>
                                                    <Text className="secondary-text">{e.groupName}</Text>
                                                    <Text className="secondary-text">Animal category: <Text strong>{e.name}</Text></Text>
                                                </Space>

                                            </Space>

                                        </div>
                                    </Col>
                                    <Col span={6} className='gd-animal-card-item-btn'>
                                        <Button className="inner-white-btn" onClick={() => onRemoveAnimal(e)}>Remove</Button>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </Checkbox.Group>
                </div>
            </Card>


        </>
    )
}
