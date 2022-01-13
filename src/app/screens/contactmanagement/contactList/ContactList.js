import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Space, List, message, Modal, Form, } from 'antd';
import Input from '../../../components/input/input';
import Button from '../../../components/button/button';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ContactModal from './ContactModal'
import CategoryModal from '../../ActivityManagement/CategoryModal'
import EditContactModal from './EditContactModal'
import './ContactList.scss';
import { getAllContact, getContact, removeContact, addContactCategory, editContactCategory, addContact, softRemoveContact, editContact, softRemoveContactByCategory } from '../../../redux/actions/contact_action'
//import { EnableLoader, DisableLoader } from '../../../redux/actions/loader_action'
import { useDispatch } from "react-redux";
import { createCategory, getCategoriesByType, updateCategory, deleteCategory } from '../../../redux/actions/category_action';
import { DisableLoader, EnableLoader } from '../../../redux/actions/loader_action';
// import {  } from 'antd/lib/form/Form';
const { Title, Text } = Typography;


function ContactList() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [categoryName, setcategoryName] = useState("");
    const [contacts, setcontacts] = useState([]);
    const [categories, setCategories] = useState(null);
    const [modalContactvisible, setmodalContactvisible] = useState(false);
    const [modalEditContactvisible, setmodalEditContactvisible] = useState(false);
    const [detail, setdetail] = useState(null);
    const [modalCategoryvisible, setmodalCategoryvisible] = useState(false);
    const [mode, setMode] = useState(null);

    const [filterContact, setFilterContact] = useState(null);

    const getData = () => {
        dispatch(EnableLoader());
        dispatch(getCategoriesByType('contact')).then(response => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                setCategories(response.payload.data)
            } else {
                message.error(response.payload.message)
            }
        })
        dispatch(getAllContact()).then(response => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                setcontacts(response.payload.data)
                setFilterContact(response.payload.data)
            } else {
                message.error(response.payload.message)
            }
        })
    }


    const filterKeyPress = (ev) => {
        let matched = [], search;
        search = ev.target.value
        if (search !== "") {
            matched = contacts.filter(e => e.name.toLowerCase().startsWith(search.toLowerCase()) || e.email[0].toLowerCase().startsWith(search.toLowerCase()))

            setFilterContact(matched)
        }
        else {
            setFilterContact(contacts)
        }

    };


    useEffect(() => {
        getData();
    }, []);








    const ChangeModalContact = (name) => {
        setcategoryName(name)
        setdetail(null);
        setMode('add');
        setmodalContactvisible(!modalContactvisible)
    }
    const ChangeEditModalContact = (item) => {
        // setcategoryName(categories.filter(e => (item.category._id === e._id))[0]);
        setdetail(item)
        setMode('edit');
        // setmodalContactvisible(!modalContactvisible)
        setmodalEditContactvisible(!modalEditContactvisible)
    }

    //category
    const AddContactCategory = (categoryName) => {
        // dispatch(addContactCategory(categoryName)).then(response => {
        //     //dispatch(DisableLoader());
        //     if (response.payload.status === 200) {
        //         message.success(response.payload.message)
        //     }
        //     else {
        //         message.error(response.payload.message)
        //     }
        // })
        dispatch(EnableLoader());
        dispatch(createCategory({ name: categoryName, active: true, type: 'contact' })).then(response => {
            dispatch(DisableLoader());
            console.log(response);
            if (response.payload.status === 200) {
                message.success(response.payload.message);
                getData();
            }
            else {
                message.error(response.payload.message)
            }
        });
    }

    const UpdateContactCategory = (categoryName, id) => {
        dispatch(EnableLoader());
        let value = {};
        value.name = categoryName
        dispatch(updateCategory(id, value)).then(response => {
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                message.success(response.payload.message)
                getData();
            }
            else {
                message.error(response.payload.message)
            }
        })
    }

    const ChangeModalCategory = (categoryName = "") => {
        setcategoryName(categoryName)
        setmodalCategoryvisible(!modalCategoryvisible)
    }


    const RemoveContact = item => {
        //dispatch(EnableLoader());
        dispatch(softRemoveContact(item._id)).then(response => {
            //dispatch(DisableLoader());
            if (response.payload.status === 200) {
                message.success(response.payload.message);
                getData();
            }
            else {
                message.error(response.payload.message)
            }
        })

    }


    const contactItemRenderer = (item) => {
        console.log(item);
        return (
            <div className="contact-list-category-item" style={{ width: '100%' }}>
                <Row>
                    <Col xl={16} md={16} sm={24}>
                        <Row gutter={40}>
                            <Col>
                                <Space direction="vertical">
                                    <Text className="secondary-text" strong>Name</Text>
                                    <Text strong>{item.name}</Text>
                                </Space>
                            </Col>
                            <Col>
                                <Space direction="vertical">
                                    <Text className="secondary-text" strong>Email</Text>
                                    <Text strong>{item.email}</Text>
                                </Space>
                            </Col>
                            <Col>
                                <Space direction="vertical">
                                    <Text className="secondary-text" strong>Phone</Text>
                                    <Text strong>{item.phone}</Text>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={8} md={8} sm={24} style={{ textAlign: 'right' }}>
                        <Space className="cat-item-action-button-space">
                            <Button className="cat-item-action-button inner-white-btn" onClick={() => ChangeEditModalContact(item)}>Edit</Button>
                            <Button className="cat-item-action-button inner-white-btn" onClick={() => RemoveContact(item)}>Remove</Button>
                        </Space>
                    </Col>
                </Row>
            </div>
        )
    }

    const deleteCategoriesById = (categoryId) => {
        dispatch(EnableLoader());
        dispatch(softRemoveContactByCategory(categoryId)).then(response => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                message.success(response.payload.message)
                getData();
            }
            else {
                message.error(response.payload.message)
            }
        })
    }

    const deleteAllContactsOfCategory = (category) => {
        console.log('deleteAllContactsOfCategory');
        deleteCategoriesById(category._id)

    }

    const DeleteCategory = (id) => {
        const onOkCalled = () => {
            deleteCategoriesById(id)
            dispatch(EnableLoader());
            dispatch(deleteCategory(id)).then(response => {
                dispatch(DisableLoader());
                if (response.payload.status === 200) {
                    message.success(response.payload.message)
                    getData();
                }
                else {
                    message.error(response.payload.message)
                }
            });
        };


        Modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: "Are you sure you want to remove category?",
            okText: "Yes",
            cancelText: "Cancel",
            onOk: onOkCalled,
        });
    }

    const categoriesWithContact = (contactListItem) => {
        return (
            <div className="contact-list-catcon">
                <Row>
                    <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Title level={4}>{contactListItem.name}
                            {!contactListItem.isDefault &&
                                <img onClick={() => ChangeModalCategory(contactListItem)} style={{ marginLeft: "5px", marginBottom: "5px" }} width={'30'} src={require('../../../../assets/images/edit.png')} alt="edit" />}
                            {!contactListItem.isDefault &&
                                <img onClick={() => DeleteCategory(contactListItem._id)} style={{ marginLeft: "5px", marginBottom: "5px" }} width={'30'} src={require('../../../../assets/images/delete2.png')} alt="delete" />}
                        </Title>
                    </Col>
                    <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24} style={{ textAlign: 'right' }}>
                        <Space className="action-button-space">
                            {contacts && contacts.filter(e => (e.category._id === contactListItem._id)).length > 0 &&
                                < Button className="cl-action-btn" onClick={() => deleteAllContactsOfCategory(contactListItem)}>Delete All</Button>
                            }
                            <Button className="cl-action-btn" onClick={() => ChangeModalContact(contactListItem)}>+ Add contact</Button>
                        </Space>
                    </Col>
                </Row>

                <List
                    size="large"
                    dataSource={filterContact ? filterContact.filter(e => (e.category._id === contactListItem._id)) : []}
                    renderItem={item => (
                        <List.Item>
                            {contactItemRenderer(item)}
                        </List.Item>
                    )}
                />
            </div >


        )
    }
    const clickAddContact = (values) => {
        console.log(values);
        dispatch(EnableLoader());
        dispatch(addContact(values)).then(response => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                form.resetFields()
                message.success(response.payload.message)
                ChangeModalContact();
                getData();
            }
            else {
                message.error(response.payload.message)
            }
        })
    }


    const clickUpdateContact = (values, id) => {
        dispatch(EnableLoader());
        dispatch(editContact(values, id)).then(response => {
            console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                message.success(response.payload.message)
                ChangeEditModalContact(null);
                getData();
            }
            else {
                message.error(response.payload.message)
            }
        })
    }

    return (
        <div>
            <Row>
                <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <h2 className="primarytext primary-text-heading">Contacts Management</h2>
                </Col>
                <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Row>
                        <Col xl={16} lg={16} md={12} sm={24} xs={24}>
                            <Input placeholder="Search Contact" className="greybuttonsearch" prefix={<SearchOutlined />}
                                onChange={filterKeyPress} />
                        </Col>
                        <Col xl={8} lg={8} md={12} sm={24} xs={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <Button className="secondary-button" onClick={() => ChangeModalCategory()} block>Add category</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {
                categories && categories.map(item => (categoriesWithContact(item)))
            }

            <CategoryModal modalCategoryvisible={modalCategoryvisible} ChangeModalCategory={() => ChangeModalCategory()} UpdateCategoty={(categoryName, id) => UpdateContactCategory(categoryName, id)} AddCategory={(categoryName) => AddContactCategory(categoryName)} categoryName={categoryName} />

            <ContactModal ChangeEditModalContact={ChangeEditModalContact} modalContactvisible={modalContactvisible} ChangeModalContact={ChangeModalContact} clickAddContact={clickAddContact} categoryName={categoryName} form={form} />
            <EditContactModal modalEditContactvisible={modalEditContactvisible} ChangeEditModalContact={ChangeEditModalContact} clickUpdateContact={clickUpdateContact} detail={detail} setdetail={setdetail} form={form} />

        </div>
    );
}

export default ContactList;