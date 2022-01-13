import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Space, message, Select, Collapse, Checkbox, List, Typography, Input, Modal, Empty, DatePicker, TimePicker, Upload, Alert, } from 'antd';
import Button from '../../../components/button/button'
import Cart from '../../../components/card/card'
import Input2 from '../../../components/input/input'
//import Checkbox from '../../../components/checkbox/Checkbox'
import { connect, useDispatch, useSelector } from 'react-redux';
import { EnableLoader, DisableLoader } from '../../../redux/actions/loader_action';
import { getForms, modifyFormStructureValues, updateForm } from '../../../redux/actions/form_action';
import RadioGroup from '../../../components/radio/RadioGroup';
import { getUserId } from '../../../redux/actions/user_actions';
import { InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Dragger } = Upload;


const { Panel } = Collapse;
const { Option } = Select;


function AddValueModal(props) {
    return (
        <Modal
            title="Basic Modal"
            visible={props.visible}
            onCancel={() => props.close()}
            footer={null}
            closable={false}
            centered={true}
        >
            <div style={{ paddingRight: "20px" }}>
                <Form form={props.form}
                    onFinish={props.submitValue}
                >
                    <Typography.Title level={3} strong>
                        Add Value
            </Typography.Title>

                    <Row style={{ justifyContent: "center" }}>
                        <Form.Item style={{ width: "90%" }}
                            name="value"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter value!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter value" />
                        </Form.Item>
                    </Row>
                    <br />
                    <Space>
                        <Button
                            className="secondary-button"
                            onClick={props.close}
                        >
                            Discard
              </Button>
                        <Button className="secondary-button" htmlType="submit">
                            Add
              </Button>
                    </Space>
                </Form>
            </div>

        </Modal>
    )
}

function validationSection(id, values, valueChangeModalVisible, onValueChangeModalOpen, onValueChangeModalClose, onValueChangeModalSubmit, form, setFormStructureId) {
    // const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <List
                bordered
                dataSource={values}
                renderItem={item => (
                    <List.Item >
                        <Typography.Text>{item.name}</Typography.Text>
                    </List.Item>
                )}
            />
            <Button className="margin-top-10" onClick={() => { onValueChangeModalOpen(); setFormStructureId(id) }}>Add Item</Button>
            <AddValueModal visible={valueChangeModalVisible} close={onValueChangeModalClose} submitValue={onValueChangeModalSubmit} form={form} />
        </>
    )
}



function FormData(props) {
    let forms = useSelector(state => state.form?.getform && state.form.getform?.data
        ? state.form.getform?.data : null);
    let user = useSelector(state => state.user?.userData?.data ? state.user.userData.data : {});

    const [list, setList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [previewForm, setPreviewForm] = useState([]);
    const [userId, setUserId] = useState(getUserId());
    const [valueChangeModalVisible, setValueChangeModalVisible] = useState(false);
    const [formNotAvailable, setFormNotAvailable] = useState(false);
    const [formNotAvailableData, setFormNotAvailableData] = useState('');
    const [FormStructureId, setFormStructureId] = useState('');
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(EnableLoader())
        dispatch(getForms(props.location.state.type)).then(response => {
            dispatch(DisableLoader());

            if (response.payload.status === 200) {
                // setuserinfo(response.payload.data)

                if (window.location.pathname === '/form/create') {
                    //console.log(response.payload.data);
                    if (!response.payload.data[0]) {
                        setFormNotAvailableData('No any form is Added by admin');
                        setFormNotAvailable(true);
                        return false;
                    } else {
                        const tList = response.payload.data.filter(e => !(e.breedersId.includes(userId)));
                        setList(tList);
                        //console.log(tList[0]);
                        if (!tList[0]) {
                            setFormNotAvailableData('No any form is remaining!')
                            setFormNotAvailable(true);
                            return false;
                        }
                        // setSelectedItem(response.payload.data[0]);
                        // console.log('breeder');
                        // console.log({...tList[0], ...{breedersId: [...tList[0].breedersId, ...[{_id:userId}]], formStructure: tList[0].formStructure.map(e => ((e.validation?.required===true) ? {...e, ...{breedersId: (e.breedersId && e.breedersId[0]) ? [...e.breedersId, ...[e.breedersId.filter(eb => (eb._id === userId))[0] ? [] : {_id:userId}]]: [{_id: userId}]}}: e))}});

                        // setSelectedItem({...tList[0], ...{breedersId: [...tList[0].breedersId, ...[{_id:userId}]], formStructure: tList[0].formStructure.map(e => ((e.validation?.required===true) ? {...e, ...{breedersId: (e.breedersId && e.breedersId[0]) ? [...e.breedersId, ...[e.breedersId.filter(eb => (eb._id === userId))[0] ? [] : {_id:userId}]]: [{_id: userId}]}}: e))}})
                        //console.log(addRequiredFields(tList[0]));
                        setSelectedItem(addRequiredFields(tList[0]))
                        setPreviewForm(tList[0]?.formStructure.filter(e => (e.mandatory === true)))
                    }
                } else {
                    setList(response.payload.data.filter(e => (e._id === props.location.state.id)));
                    const tList = response.payload.data.filter(e => (e._id === props.location.state.id));
                    setSelectedItem({ ...tList[0], ...{ breedersId: [...tList[0].breedersId, ...[{ _id: userId }]], formStructure: tList[0].formStructure.map(e => ((e.mandatory === true) ? { ...e, ...{ breedersId: e.breedersId ? [...e.breedersId, ...[e.breedersId.filter(eb => (eb._id === userId))[0] ? [] : { _id: userId }]] : [{ _id: userId }] } } : e)) } })
                    // setSelectedItem(response.payload.data.filter(e => (e._id===props.location.state.id))[0]);
                }
            }
        })
    }, [])

    const onValueChangeModalSubmit = (value, item) => {
        // data to submit
        //console.log(list)
        // console.log(FormStructureId);
        // console.log(item.name);
        // console.log(selectedItem);
        const data = {
            formStructureId: FormStructureId, formId: selectedItem._id, data: value, type: props.location.state.type,
            categoryId: list[0] && list[0].categoryId._id ? list[0].categoryId._id : ""
        };
        //console.log(data);
        dispatch(EnableLoader());
        dispatch(modifyFormStructureValues(data)).then(response => {
            // console.log(response);
            dispatch(DisableLoader());
            if (response.payload.status === 200) {
                form.resetFields()
                message.success(response.payload.message)
                setValueChangeModalVisible(false);
            } else {
                message.error(response.payload.message);
            }
        });
        // const value = {}
    }

    const onValueChangeModalClose = () => {
        setValueChangeModalVisible(false);
    }

    const onValueChangeModalOpen = () => {
        setValueChangeModalVisible(true);
    }


    const onChangeChecked = (e) => {

        if (e.target.checked) {
            setSelectedItem({ ...selectedItem, ...{ formStructure: selectedItem.formStructure.map(ev => ((ev._id === e.target.value._id) ? { ...ev, ...{ breedersId: ev.breedersId ? [...ev.breedersId, ...[{ _id: userId }]] : [{ _id: userId }] } } : ev)) } })
            setPreviewForm([...previewForm, e.target.value])
        } else {
            setSelectedItem({ ...selectedItem, ...{ formStructure: selectedItem.formStructure.map(ev => ((ev._id === e.target.value._id) ? { ...ev, ...{ breedersId: ev.breedersId.filter(bid => !(bid._id === userId)) } } : ev)) } })
            setPreviewForm(previewForm.filter(item => !(item._id === e.target.value._id)));
        }
    }

    const onFinish = values => {
        message.success(window.location.pathname === '/create/form' ? "Form created successfully" : "Form updated successfully")
        props.history.push('/form')
    };


    const collapsableItem = (value, index, child) => {
        return (
            <>
                <div style={{ position: 'absolute', marginLeft: 39, marginTop: -10 }}>
                    {child}
                </div>
                <Collapse accordion={true} ghost style={{ borderRadius: 8 }}>
                    {/* {sectop.map((sec, idx) => ( */}
                    <Panel key={index}>
                        {validationSection(value._id, value.values, valueChangeModalVisible, onValueChangeModalOpen, onValueChangeModalClose, (itemValue) => onValueChangeModalSubmit(itemValue, value), form, setFormStructureId)}
                    </Panel>

                    {/* ))} */}
                </Collapse>

            </>
        )
    }


    const categoryItem = (value, index) => {
        return (
            <div key={index}>
                <Checkbox className="customInput primary-text" value={value} style={{ fontSize: "16px", marginTop: "0px" }} defaultChecked={(value.breedersId && value.breedersId.slice(0).reverse().map(i => (i._id === userId))[0]) ? true : false} onChange={onChangeChecked}>{value.displayName}</Checkbox>
            </div>
        )
    }
    const textWrap = (child, index) => {
        return <div key={index} style={{ marginLeft: 40 }}>
            {child}
        </div>
    }

    const renderSwitchCategories = (value, index) => {

        // if (value.onlyBusiness) { return }
        switch (value.type) {
            case 'text':
            case 'number':
            case 'textarea':
            case 'date':
                return textWrap(categoryItem(value, index), index);
            case 'radio':
            case 'select':
            case 'checkbox':
                return collapsableItem(value, index, categoryItem(value, index))
            default:
                return null
        }

        // (value.type === 'text') && categoryItem(value, index)
        //                         (value.type === 'radio') && collapsableItem(value, index, categoryItem(value, index))
    }

    const changeValueOfPreviewForm = (item, value) => {

        setPreviewForm(previewForm.map(e => ((e._id === item._id) ? { ...e, ...{ value } } : e)));
    }

    const renderFormPreview = (item, index) => {
        switch (item.type) {
            case 'text':
            case 'email':
                return <Form.Item name={item.name}
                //rules={[{ required: true, message: 'Please input breed' }]}
                >
                    <Input2 placeholder={`Enter your ${item.name}`}></Input2>
                </Form.Item>;
            case 'number':
                return <Form.Item name={item.name}
                //rules={[{ required: true, message: 'Please input breed' }]}
                >
                    <Input2 placeholder={`Enter your ${item.name}`}></Input2>
                </Form.Item>;
            case 'password':
                return <Form.Item name={item.name}
                //rules={[{ required: true, message: 'Please input breed' }]}
                >
                    <Input2.Password placeholder={`Enter your ${item.name}`}></Input2.Password>
                </Form.Item>;

            case 'select':
                return <Form.Item name={item.name}
                //rules={[{ required: true, message: 'Please select field1!' }]}
                >
                    <Select
                        placeholder={`Select ${item.name}`}
                        className="customSelect "
                    >
                        {item.values.map(type => (
                            <Option value={type.value}>{type.name}</Option>
                        ))}
                    </Select>
                </Form.Item>;

            case 'radio':
                return <Form.Item name={item.name}
                //rules={[{ required: true, message: 'Please select field1!' }]}
                >
                    <RadioGroup onChange={(ev) => { changeValueOfPreviewForm(item, ev.target.value); }} value={item.value} options={item.values.map((e) => ({ label: e.name, value: e.value }))} />
                    {/* {item.values.map(e => (<Radio value={e.value}>{e.value}</Radio>) )} */}
                    {/* <RadioGroup >
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        </RadioGroup> */}


                </Form.Item>

            case 'checkbox':
                return (<Form.Item name={item.displayName}>
                    <Checkbox.Group >
                        {item.values.map((e, index) => (

                            <Space style={{ marginLeft: index !== 0 ? 20 : 0 }} key={e}>
                                <Checkbox value={e.value}></Checkbox>
                                <span className="secondary-text" >{e.name}</span>
                            </Space>

                        ))}
                    </Checkbox.Group>
                </Form.Item>)
            case 'textarea':
                return <Form.Item name={item.displayName}>
                    <TextArea row={item.noOfLines} style={{ width: "90%" }} className="customInput" id="textarea" />
                </Form.Item>
            case 'password':
                return <Form.Item name={item.displayName} >
                    <Input2.Password placeholder={`Enter your ${item.displayName}`}></Input2.Password>
                </Form.Item>;
            case 'date':
                return (
                    <Form.Item name={item.displayName} style={{ marginTop: -10 }}>
                        < DatePicker format={'DD MMM, YYYY'} value={item.date} //onChange = {(date, dateString) => onChangePicker(date, dateString, e, idx)}
                            style={{ padding: 8, borderRadius: 8, width: '100%', marginTop: 10 }} />
                    </Form.Item>)
            case 'time':
                return (
                    <Form.Item name={item.displayName} style={{ marginTop: -10 }}>
                        < TimePicker value={item.date} //onChange = {(date, dateString) => onChangePicker(date, dateString, e, idx)}
                            style={{ padding: 8, borderRadius: 8, width: '100%', marginTop: 10 }} />
                    </Form.Item>)
            case 'image':
                return (
                    <Form.Item name={item.displayName}>
                        <Dragger {...props} accept="image/*">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-hint">Support for uploading Images only</p>
                        </Dragger>
                    </Form.Item >
                )
            case 'pdf':
                return (
                    <Form.Item name={item.displayName}>
                        <Dragger {...props} accept="application/pdf">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-hint">Support only pdf</p>
                        </Dragger>
                    </Form.Item >
                )

            default:
                return null;
        }
    }


    const onChangeList = (event) => {

        //console.log(event);
        // debugger;
        //console.log(list.filter(e => (e._id === event))[0]);
        //console.log(addRequiredFields(refreshFields(list.filter(e => (e._id === event))[0])));
        setSelectedItem(addRequiredFields(refreshFields(list.filter(e => (e._id === event))[0])));
        setPreviewForm(list.filter(e => (e._id === event))[0].formStructure.filter(e => (e.validation?.required === true)))
        // console.log(list)

    }

    const addRequiredFields = (item) => {
        //console.log(item);
        // setSelectedItem({...response.payload.data[0], ...{breedersId: [...response.payload.data[0].breedersId, ...[{_id:userId}]], formStructure: response.payload.data[0].formStructure.map(e => ((e.validation?.required===true) ? {...e, ...{breedersId: e.breedersId ? [...e.breedersId, ...[e.breedersId.filter(eb => (eb._id === userId))[0] ? [] : {_id:userId}]]: [{_id: userId}]}}: e))}})
        return { ...item, ...{ formStructure: item?.formStructure.map(e => ((e.mandatory === true) ? { ...e, ...{ breedersId: e.breedersId ? [...e.breedersId, ...[e.breedersId.filter(eb => (eb._id === userId))[0] ? [] : { _id: userId }]] : [{ _id: userId }] } } : e)) } }
    }

    const refreshFields = (item) => {
        return item //{ ...item, ...{ formStructure: item.formStructure.map(e => ({ ...e, ...{ breedersId: e.breedersId.filter(eb => !(eb._id === userId)) } })) } }
    }


    const onSaveChanges = () => {

        dispatch(EnableLoader());

        // const item = selectedItem.breedersId.filter(eb => (eb._id===userId))[0] ? selectedItem : {...selectedItem, ...{breedersId: [...selectedItem.breedersId, ...[{_id:userId}]]}}
        dispatch(updateForm(selectedItem._id, selectedItem)).then(response => {
            dispatch(DisableLoader());
            if (response.payload.status == 200) {
                message.success(response.payload.editMessage);
                props.history.push('/form');
            } else {
                message.error(response.payload.message);
            }
        })
    }

    const onCreate = () => {

        dispatch(EnableLoader());

        const item = selectedItem.breedersId.filter(eb => (eb._id === userId))[0] ? selectedItem : { ...selectedItem, ...{ breedersId: [...selectedItem.breedersId, ...[{ _id: userId }]] } }
        dispatch(updateForm(selectedItem._id, item)).then(response => {
            dispatch(DisableLoader());
            if (response.payload.status == 200) {
                message.success(response.payload.message);
                props.history.push('/form');
            } else {
                message.error(response.payload.message);
            }
        })

    }


    return ((list[0] && selectedItem) ?
        <>
            <Form onFinish={onFinish}>
                <Row >
                    <Col xs={24} className="textAlign-sm-box">
                        <span className="primary-text primary-text-heading ">{window.location.pathname === '/form/create' ? "Create a new Form" : "Edit form"}</span>
                        <div className="textAlign-sm-right textAlign-margintop-neg ">
                            <Space >
                                <Button className="secondary-button" onClick={() => {
                                    props.history.push('/form')
                                }} >Discard</Button>
                                <Button className="secondary-button" onClick={(window.location.pathname === '/form/create') ? onCreate : onSaveChanges} >{window.location.pathname === '/form/create' ? "Create" : "Save changes"}</Button>
                            </Space>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xxl={12}>

                        <Cart style={{ width: '90%;', height: "auto", margin: "10px", maxWidth: "800px", minWidth: "300px" }} className="primary-contrast-background">
                            {window.location.pathname === '/form/create' ?
                                <div>
                                    <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">Select {props.location.state.type === 'animal' ? 'Animal' : 'Product'} Category :</div>
                                    <div className="width-sm-50">
                                        <Form.Item name="category">
                                            <Select defaultValue={list[0].categoryId.name}
                                                placeholder="Select Category"
                                                className="customSelect "
                                                onChange={onChangeList}
                                            >
                                                {list.map(type => (
                                                    <Option value={type._id}>{type.categoryId.name}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                                : null}


                            {selectedItem.formStructure.map((value, index) => {
                                if (user?.subscriber?.subscriptionId?.packageType === "Individual" && value.onlyBusiness) { return }
                                if (!value.mandatory === true) {
                                    return <div>
                                        {renderSwitchCategories(value, index)}
                                        <br />
                                    </div>
                                }
                            }
                            )}
                        </Cart>
                    </Col>


                    <Col xs={24} sm={24} md={12} lg={12} xxl={12}>

                        <Cart style={{ width: '90%;', height: "auto", margin: "10px", maxWidth: "800px", minWidth: "300px" }} className="primary-contrast-background">
                            <h2 className="primary-contrast-background-color"> Form preview</h2>
                            <br />
                            {
                                // previewForm.map((item, index) => {
                                selectedItem.formStructure.map((item, index) => {
                                    // console.log("item==>>", item,item.onlyBusiness);
                                    if (item.breedersId && item.breedersId.filter(i => (i._id == userId))[0]) {
                                        if (user?.subscriber?.subscriptionId?.packageType === "Individual" && item.onlyBusiness) { return }
                                        return (
                                            <div>
                                                <div style={{ margin: "3px", fontSize: "15px" }} className="primary-text">{item.displayName}:</div>
                                                {renderFormPreview(item, index)}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                })}
                        </Cart>
                    </Col>
                </Row>
            </Form>
        </> : <>

            {formNotAvailable && (<div style={{ width: '100%', marginTop: 30 }}><Empty description={formNotAvailableData} /></div>)}

        </>
    )

}

//   let user = useSelector(state => state.user && state.user.userData && state.user.userData.data ? state.user.userData.data : {});
// const mapStateToProps = (state) => {
//     return {forms: state.form.getform ? state.form.getform.data : null}
// }
// export default connect(mapStateToProps)(FormData);
export default FormData;

