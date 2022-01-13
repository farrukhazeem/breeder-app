import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Select, Space, Empty } from 'antd';
import Input from '../../components/input/input';
import Allanimals from './Allanimals'
import Button from '../../components/button/button';
import { SearchOutlined } from '@ant-design/icons';
import AnimalProductList from '../AnimalProductList/AnimalProductList';
import { useDispatch } from 'react-redux';
import { EnableLoader, DisableLoader } from '../../redux/actions/loader_action';
import { getAnimals } from '../../redux/actions/animal_action';
import { getFormsByBreederAndCategoryType } from '../../redux/actions/form_action';
import { healthStatus, status } from '../../config/constants';

const { Search } = Input

const { Option } = Select;
const names = ['Alive', 'Dead'];

const animalTypes = ['Active', 'Archived', 'Both'];
function AnimalManagement() {
    const [animals, setAnimals] = useState(null);
    const [keyword, setKeyword] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [currHealthStatus, setCurrHealthStatus] = useState(null);
    const [categories, setCategories] = useState([]);



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(EnableLoader());
        dispatch(getAnimals()).then((response) => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                setAnimals(response.payload.data);
            }
        });
        dispatch(getFormsByBreederAndCategoryType('animal')).then((response) => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                setDataLoaded(true);
                setCategories(response.payload.data ? response.payload.data.map(e => e.categoryId) : null);
            }
        });
    }, [])



    const refreshData = (type = "Active") => {
        dispatch(EnableLoader());
        dispatch(getAnimals(type)).then((response) => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                setAnimals(response.payload.data);
            }
        })
    }

    const searchData = (e) => {
        setKeyword(e.target.value);
    }

    const filterData = (animal) => {
        console.log(keyword);
        console.log(animal);
        if (!keyword) return animal;
        if (animal._id && !(animal._id.search(keyword) === -1)) return animal;
        if (animal.data?.name && !(animal.data?.name.toLowerCase().search(keyword.toLowerCase()) === -1)) return animal;
        if (animal.data?.description && !(animal.data?.description.toLowerCase().search(keyword.toLowerCase()) === -1)) return animal;
        if (!(animal.categoryName.toLowerCase().search(keyword.toLowerCase()) === -1)) return animal;
        if (!(animal.addedBy.name.toLowerCase().search(keyword.toLowerCase()) === -1)) return animal;
        return null;
    }

    // const filterByStatus = (animal)=> {
    //     if(!currentStatus && !currHealthStatus) return animal;
    //     if(currHealthStatus && currentStatus) {

    //     }
    // }
    return (
        <div>
            <Row>
                <Col xs={24} md={14} className="textAlign-sm-box">
                    <h2 className="primary-text primary-text-heading">Animal Management</h2>
                </Col>
                <Col xs={24} md={10} className="textAlign-sm-right textAlign-sm-box">
                    <Input placeholder="Search animal" className="greybuttonsearch" onChange={searchData} prefix={<SearchOutlined />} />
                </Col>
            </Row>

            <Row style={{ marginTop: 10 }}>
                <Col xs={0} xl={12}></Col>
                <Col xs={24} xl={12} className="textAlign-sm-box" style={{ textAlign: "right" }}>

                    <Space>
                        <span className="primary-text hide-sm-box ">Showing</span>
                        {/*<Form.Item name="animals" style={{ marginTop: 24 }}>
                            <Select
                                placeholder="Life cycle status" className="customSelect"
                                onChange={(value) => setCurrentStatus(value)}
                            >
                                {status.map(name => (
                                    <Option value={name}>{name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                         */}
                        <Form.Item name="status" style={{ marginTop: 24, minWidth: 100 }}>
                            <Select
                                defaultValue={animalTypes[0]}
                                placeholder="Type" className="customSelect"
                                onChange={(value) => refreshData(value)}
                            >
                                {animalTypes.map(name => (
                                    <Option value={name}>{name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <div className="textAlign-sm-box">
                            <Space>
                                {/* <Link to={"/animal/register"}><Button disabled={!categories[0] ? true : false} className="secondary-button">Archived animals</Button></Link> */}
                                <Link to={"/animal/register"}><Button disabled={!categories[0] ? true : false} className="secondary-button">Register new Animal</Button></Link>
                            </Space>
                        </div>
                    </Space>

                </Col>
            </Row>


            <AnimalProductList data={animals ? animals.filter(filterData) : []} refreshData={refreshData} />
            {dataLoaded && !categories[0] && (<div style={{ width: '100%', marginTop: 30 }}><Empty description={'No Animal Form Added'} /></div>)}

        </div >
    )
}


export default AnimalManagement;