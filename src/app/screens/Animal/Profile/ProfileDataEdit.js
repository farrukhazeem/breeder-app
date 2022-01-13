import { CheckOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React from 'react'
import Input from '../../../components/input/input'
import ProfileDataEditFormGenertor from './ProfileDataEditFormGenerator';

export default function ProfileDataEdit(props) {
    const { data, onChangeData, value, onSaveData, hidden, key, form, attribute } = props;
    const currentItem = form ? (form.formStructure?.filter(e => e.name === attribute)[0] ? form.formStructure?.filter(e => e.name === attribute)[0] : {}) : {};

    // console.log(form && form.formStructure.filter(e => e.name===attribute));
    // console.log(attribute);
    // console.log(value);


    return (


        <ProfileDataEditFormGenertor {...props} formStructure={currentItem} selected={form} />
        // <Form.Item
        //   initialValue={value}

        //   hidden={hidden}
        //   name={key}
        //   rules={[
        //     {
        //       required: true,
        //       message: "Please enter the value",
        //     },
        //   ]}
        // >
        //   <Input
        //     // value={value}
        //     defaultValue={value}
        //     onChange={(ev) => { console.log(ev.target.value); onChangeData(ev.target.value); }}
        //     suffix={
        //         <CheckOutlined className="site-form-item-icon" onClick={onSaveData} />
        //     }
        //     // placeholder={"Enter Quantity"}
        //   />
        // </Form.Item>
    )
}
