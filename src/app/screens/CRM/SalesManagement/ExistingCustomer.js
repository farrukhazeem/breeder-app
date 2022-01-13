import React,{useState} from 'react';
import { Space,  Form, Select,} from 'antd';
const { Option } = Select;

const customers = [
    {id: 1,name:"Robert",email: 'robert@breeder.com',phone:'+1 232234221',address:'ABC area'},
    {id: 2,name:"Kelvin",email: 'kelvin@breeder.com',phone:'+1 230034221',address:'XYZ area'},
    {id: 3,name:"New",email: 'new@breeder.com',phone:'+1 442234221',address:'New ABC area'},];

function ExistingCustomer (){
    // const [selected, setselected] = useState('');

    return (
        <div>   
            <div style={{marginTop:"5px"}}></div>
            <span className="primary-text fs-110">Customer:</span>
            <div style={{marginTop:"15px"}}></div>
            <Form.Item name="Existing"
                rules={[{ required: true, message: 'Please select customer!' }]}>
                <Select placeholder="Select existing Customer"
                    className="customSelect">
                       {customers.map((customer)=>(
                         <Option value={customer.id}>{customer.name}</Option>
                        ))}      
                </Select>
            </Form.Item>


            <Space direction="vertical">
                <Space>
                    <span className="secondary-text fs-110">Email: </span>
                    <span className="primary-text fs-110">abc@gmail.com</span>
                </Space>
                <Space>
                    <span className="secondary-text fs-110">Phone: </span>
                    <span className="primary-text fs-110">+1 2234433222</span>
                </Space>
                <Space>
                    <span className="secondary-text fs-110">Address: </span>
                    <span className="primary-text fs-110">ABC road area</span>
                </Space>
            </Space>
            
        </div>
    );
}
    
export default ExistingCustomer;
    