import React from 'react';
//import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';


function CustomButton(props) {
    return (
        <div>
            <Button  {...props} style={ { ...{borderRadius: 8, border: 'none', height: '39px',minWidth: "100px"}, ...props.style ? props.style : {}}} className={props.className ? props.className + ' primary-background primary-contrast-text' : 'primary-background primary-contrast-text'}>{props.children}</Button>
        </div>
    );
}

export default CustomButton;