import React ,  {Component} from 'react';
//import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './input.scss';
const { Search } = Input;
const { TextArea } = Input;

const  CustomPassword = (props) => {
    return (
        <Input.Password {...props} className={props.className ? props.className + ' customInput primary-text' : 'customInput primary-text'} />
    );
}
const SearchInput = (props) => {
    return (
        <Search
        {...props} className={props.className ? props.className + ' customInput primary-text' : 'customInput primary-text'}
          size="middle"
     
    />
    );
}

const CustomTextArea = (props) => {
    return (
        <TextArea   {...props} className={props.className ? props.className + ' customInput primary-text' : 'customInput primary-text'} />
    )
}

class CustomInput extends Component {
    static Password = CustomPassword;
    static Search = SearchInput;
    static TextArea = CustomTextArea;
    render() {
        return (
            <Input {...this.props} className={this.props.className ? this.props.className + ' customInput primary-text' : 'customInput primary-text'} />
        );
    }
}






export default CustomInput;