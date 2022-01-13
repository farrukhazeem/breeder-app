import React ,  {Component} from 'react';
//import { UserOutlined } from '@ant-design/icons';
import { Input, InputNumber } from 'antd';
import './input.scss';


class NumberInput extends Component {
  
    render() {
        return (
            <InputNumber {...this.props} className={this.props.className ? this.props.className + ' customInput primary-text' : 'customInput primary-text'} />
        );
    }
}


export default NumberInput;
