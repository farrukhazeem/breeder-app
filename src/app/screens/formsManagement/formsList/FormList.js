import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Avatar, Typography, message, Dropdown, Menu, Select, Divider, Empty, Modal } from 'antd';
import Button from '../../../components/button/button';
import Card from '../../../components/card/card';
import { UserOutlined } from '@ant-design/icons';
import './FormList.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getAllForms, excludeBreederFromForm, updateForm, deleteForm } from '../../../redux/actions/form_action';
import { getAnimals } from '../../../redux/actions/animal_action';
import { getProduct } from '../../../redux/actions/product_action';
import { EnableLoader, DisableLoader } from '../../../redux/actions/loader_action';
import { getUserId } from '../../../redux/actions/user_actions';
import { CaretDownOutlined } from '@ant-design/icons';
import Form from 'antd/lib/form/Form';

const { Text } = Typography;
const formCatList = [
    {
        name: 'Cows Form',
        category: 'Cows',
        icon: 'Cow Form@2x.png',
    },
    {
        name: 'Horse Form',
        category: 'Horse',
        icon: 'Horse Form@2x.png',
    },
    {
        name: 'Goats Form',
        category: 'Goat',
        icon: 'Goats Form@2x.png',
    },
    {
        name: 'Sheeps Form',
        category: 'Sheeps',
        icon: 'Sheep Form@2x.png',
    },
    {
        name: 'Ducks Form',
        category: 'Ducks',
        icon: 'Ducks Form@2x.png',
    },
    {
        name: 'Camels Form',
        category: 'Camels',
        icon: 'Camels Form@2x.png',
    },
    {
        name: 'Dogs Form',
        category: 'Dogs',
        icon: 'Dogs Form@2x.png',
    },
]





function FormList() {
    const [list, setList] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [userId, setUserId] = useState(getUserId());
    const dispatch = useDispatch();
    useEffect(() => {
        getAllData();
    }, [])

    const getAllData = () => {
        dispatch(EnableLoader())
        dispatch(getAllForms()).then(response => {
            dispatch(DisableLoader());
            console.log(response);
            setDataLoaded(true);
            if (response.payload.status === 200) {
                // setuserinfo(response.payload.data)
                setList(response.payload.data);
            }
        })
    }

    const removeClick = (form, breederId) => {
        let check;
        const Check = () => {
            dispatch(form.categoryId.type === "animal"
                ? getAnimals() : getProduct()).then((response) => {
                    console.log("response==>>", response);
                    dispatch(DisableLoader());
                    if (response.payload.status === 200) {
                        check = form.categoryId.type === "animal" ?
                            response.payload.data.filter(e => e.categoryId._id === form.categoryId._id) :
                            response.payload.data.filter(e => e.categoryId === form.categoryId._id)
                        console.log("check==>>", check)
                        check.length > 0 ? message.error(`Can not remove category because ${form.categoryId.type === "animal" ? "animal" : "product"} is added on this category`) :
                            onOkCalled()

                    }
                });
        }

        const onOkCalled = () => {
            const resultForm = excludeBreederFromForm(form, breederId)
            console.log(resultForm, resultForm._id, "<--resultForm._id,");
            // console.log(breederId);
            dispatch(EnableLoader());
            dispatch(updateForm(resultForm._id, resultForm)).then(resultResponse => {
                console.log(resultResponse);
                dispatch(DisableLoader());
                if (resultResponse.payload.status === 200) {
                    message.success(resultResponse.payload.removeMessage);
                    getAllData();
                }
            });
        }

        Modal.confirm({
            title: "Confirm",
            content: "Are you sure you want to remove?",
            okText: "Yes",
            cancelText: "Cancel",
            onOk: Check,
        });
    }

    const menu = (
        <Menu>
            {/* {inventories.map(inventory => (
                <Menu.Item onClick={() => setSelectedInventory(inventory)}>
                    {inventory.title}
                </Menu.Item>
            ))} */}
            <Menu.Item>
                <Link to={`/`}>
                    Animal Form
            </Link>
            </Menu.Item>
            <Menu.Item>
                Product Form
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="br-form-list">
            <Row >
                <Col span={12} xs={24} md={12} className="textAlign-sm-box">
                    <h2 className="primary-text primary-text-heading">Form Management</h2>
                </Col>
                <Col span={12} className="textAlign-md-box textAlign-sm-right">
                    {/* <Button className="secondary-button"><Link to={'/form/create'}>Add a new form</Link></Button> */}
                    {/* <Dropdown overlay={menu}>
                        <Link className="primary-text" onClick={e => e.preventDefault()}>
                            Add a new form <CaretDownOutlined />
                        </Link>
                    </Dropdown> */}

                    <Select style={{ minWidth: 150 }}
                        defaultValue="Add a new form"
                        placeholder="Add a new form"
                        className="customSelect"
                    >
                        <Select.Option value="Animals"><Link to={{ pathname: '/form/create', state: { type: 'animal' } }}>Animal form</Link></Select.Option>
                        <Select.Option value="Product"><Link to={{ pathname: '/form/create', state: { type: 'product' } }}>Product form</Link></Select.Option>
                    </Select>

                </Col>
            </Row>
            <Row gutter={10}>
                {/* {formCatList.map(e => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Card className="form-list-card">
                            <Space direction='vertical'>
                                <img src={require(`../../../../assets/images/form/${e.icon}`)} width={'40'} alt="logo" />
                                <Text strong>{e.name}</Text>
                            </Space>
                            <div className="card-action">
                                <Row>
                                    <Col span={12} className="editform">
                                        <Link to={'/form/edit'}><Text strong>Edit Form</Text></Link>
                                    </Col>
                                    <Col span={12}>
                                        <Text strong>Remove</Text>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                ))} */}
                {list.filter(e => e.categoryId.type === 'animal')[0] && <Divider orientation="left">Animal Forms</Divider>}
                {list.filter(e => e.categoryId.type === 'animal').map(e => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Card className="form-list-card">
                            <Space direction='vertical'>
                                <img src={e.categoryId.icon && e.categoryId.icon.split("/").pop() !== "null" ?
                                    e.categoryId.icon : require("../../../../assets/images/avatar.png")} style={{ width: 40, height: 40, borderRadius: 20 }} alt="logo" />
                                <Text strong>{`${e.categoryId.name} Form`}</Text>
                            </Space>
                            <div className="card-action">
                                <Row>
                                    <Col span={12} className="editform">
                                        <Link to={{ pathname: '/form/edit', state: { id: e._id, type: 'animal' } }}><Text strong>Edit Form</Text></Link>
                                    </Col>
                                    <Col span={12}>
                                        <Link onClick={() => { removeClick(e, userId) }}><Text strong>Remove</Text></Link>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                ))}

                {list.filter(e => e.categoryId.type === 'product')[0] && <Divider orientation="left" style={{ marginTop: 40 }}>Product Forms</Divider>}
                {list.filter(e => e.categoryId.type === 'product').map(e => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Card className="form-list-card">
                            <Space direction='vertical'>
                                <img src={e.categoryId.icon && e.categoryId.icon.split("/").pop() !== "null" ?
                                    e.categoryId.icon : require("../../../../assets/images/avatar.png")} style={{ width: 40, height: 40, borderRadius: 20 }} alt="logo" />
                                <Text strong>{`${e.categoryId.name} Form`}</Text>
                            </Space>
                            <div className="card-action">
                                <Row>
                                    <Col span={12} className="editform">
                                        <Link to={{ pathname: '/form/edit', state: { id: e._id, type: 'product' } }}><Text strong>Edit Form</Text></Link>
                                    </Col>
                                    <Col span={12}>
                                        <Link onClick={() => { removeClick(e, userId) }}><Text strong>Remove</Text></Link>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                ))}
                {dataLoaded && !list[0] && (<div style={{ width: '100%', marginTop: 30 }}><Empty description={'No Form Created'} /></div>)}
            </Row>

        </div>
    )
}

export default FormList;