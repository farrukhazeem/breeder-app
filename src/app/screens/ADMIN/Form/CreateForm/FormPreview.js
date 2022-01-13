import React from "react";
import { Col, Row, Space, Form, Select, Radio, Checkbox, DatePicker, TimePicker, Upload, Input } from "antd";
import Input2 from '../../../../components/input/input'
import RadioGroup from '../../../../components/radio/RadioGroup';
import { InboxOutlined, EditOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const { Option } = Select;
const { Dragger } = Upload;

export default function FormPreview(props) {
    const { formStructure, ShowTraits, setdeletedFormStructure, deletedFormStructure,
        setselectedKey, setselectedField } = props
    console.log(formStructure);
    const renderFormPreview = (item, index) => {
        switch (item.type) {
            case 'text':
            case 'email':
            case 'number':
                return <Form.Item name={item.displayName}>
                    <Input2 placeholder={`Enter your ${item.displayName}`}></Input2>
                </Form.Item>
            case 'textarea':
                return <Form.Item name={item.displayName}>
                    <TextArea row={item.noOfLines} style={{ width: "90%" }} className="customInput" />
                </Form.Item>
            case 'password':
                return <Form.Item name={item.displayName} >
                    <Input2.Password placeholder={`Enter your ${item.displayName}`}></Input2.Password>
                </Form.Item>;

            case 'select':
                return <Form.Item name={item.displayName} >
                    <Select placeholder={`Select ${item.displayName}`}
                        className="customSelect ">
                        {item.values.map(e => (
                            <Option value={e.value} key={e.value}>{e.name}</Option>
                        ))}
                    </Select>
                </Form.Item>;

            case 'radio':
                return <Form.Item name={item.displayName} >
                    <RadioGroup >
                        {item.values.map(e => (<Radio value={e.value} key={e.value}>{e.name}</Radio>))}
                    </RadioGroup>
                </Form.Item>;
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

    const HandleEdit = (e) => {
        setselectedField(formStructure.filter(event => event === e)[0]);
        setselectedKey("2")
        // setdeletedFormStructure([...deletedFormStructure, formStructure.filter(event => event === e)[0]._id])
        // props.setformStructure(formStructure.filter(event => event !== e))
    }

    const HandleDelete = (e) => {
        setdeletedFormStructure([...deletedFormStructure, formStructure.filter(event => event === e)[0]._id])
        props.setformStructure(formStructure.filter(event => event !== e))
    }


    return (
        <>
            <h2 className="secondary-text fw-100">Form Preview</h2>
            <br />
            <Row gutter={10}>
                {formStructure.map((e) => (

                    <Col span={e.type === "image" || e.type === "pdf" ? 24 : 12}>

                        {(e.name === "traits" && !ShowTraits) && !(window.location.pathname === "/admin/form/edit") ?
                            null
                            :

                            <>
                                <Row style={{ justifyContent: "space-between" }}>
                                    <div style={{ margin: "3px", fontSize: "15px" }} >
                                        {e.displayName}:
                            </div>
                                    {["price", "traits", "name", "quantity", "breed", "dob", "sex"].includes(e.name) ?
                                        null
                                        :
                                        <Space>
                                            <div style={{ marginRight: "10px", fontSize: "15px", fontWeight: "bold", cursor: "pointer" }} onClick={() => HandleEdit(e)}><EditOutlined /></div>
                                            <div style={{ marginRight: "10px", marginTop: "-5px", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }} onClick={() => HandleDelete(e)}>x</div>
                                        </Space>}
                                </Row>
                                {renderFormPreview(e)}
                            </>
                        }
                    </Col>

                ))}
            </Row>
        </>
    )
}
