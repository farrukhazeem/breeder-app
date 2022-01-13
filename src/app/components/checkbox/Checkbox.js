import React from 'react';
//import { UserOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import './Checkbox.scss';


function CheckboxComponent(props) {
    return (
        <Checkbox {...props} className="app-chkbx"></Checkbox>
    );
}

export default CheckboxComponent;