import React, { useEffect } from 'react';
//import { UserOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import './SelectButton.scss';


function SelectButton(props) {
    //console.log(props);
    useEffect(() => {
        const cl = document.getElementsByClassName('ant-checkbox-inner')[props.index];
        cl.innerHTML += props.value
    },[])
    return (
        <Checkbox {...props} className="app-selectbtn-chkbx">

        </Checkbox>
    );
}

export default SelectButton;