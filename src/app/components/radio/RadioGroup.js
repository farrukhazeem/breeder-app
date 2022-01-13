import React from 'react';
import { Radio } from 'antd';
import './RadioGroup.scss';


function RadioComponent(props) {
    return (
        <Radio.Group {...props} className="app-radiobx"></Radio.Group>
    );
}

export default RadioComponent;