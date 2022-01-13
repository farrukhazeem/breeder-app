import React from 'react';
import {  Form } from 'antd';
import Input from '../../../components/input/input';

function NewSalesCustomer (){
    return (
        <div>
            <div style={{marginTop:"5px"}}></div>
            <span className="primary-text fs-110">First Name:</span>
            <div style={{marginTop:"15px"}}></div>
            <Form.Item name="name"
                rules={[{ required: true, message: 'Please input first name!' }]}>
                <Input placeholder="Enter first name"/>
            </Form.Item>

            <span className="primary-text fs-110">Last Name:</span>
            <Form.Item name="lastname"
                rules={[{ required: true, message: 'Please input last name!' }]}>
                <Input placeholder="Enter last name"/>
            </Form.Item>


            <span className="primary-text fs-110">Address:</span>
            <Form.Item name="address"
                rules={[{ required: true, message: 'Please input customer address!' }]}>
                <Input placeholder="Enter customer address"/>
            </Form.Item>

            <span className="primary-text fs-110">Phone:</span>
            <Form.Item name="phone"
                rules={[{ required: true, message: 'Please input phone number!' }]}>
                <Input placeholder="Enter phone number"/>
            </Form.Item>

            <span className="primary-text fs-120"><u>Add secondary phone number</u></span>

            <div className="primary-text fs-110">Email:</div>
            <Form.Item name="email"
                rules={[{ required: true, message: 'Please input email!' },{
                    type:"email",message:"Invalid email!"
                }]}>
                <Input placeholder="Enter email"/>
            </Form.Item>

            <span className="primary-text fs-120"><u>Add secondary email</u></span>
        </div>
    );
}

export default NewSalesCustomer;
