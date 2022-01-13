import React, { Component, useState } from "react";
//import { UserOutlined } from '@ant-design/icons';
import { Input, InputNumber } from "antd";
import "./input.scss";

function FlatNumberInput(props) {
  const [number, setNumber] = useState((!(props.value === null) || !(props.value === undefined)) ? props.value : '');
  const onChange = (e) => {
    console.log(e);
    const { value } = e.target;
    console.log(value);
    const reg = /^\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      setNumber(value);
      props.onChange(value);
    }
  };

  //   const onBlur = () => {
  //     const { value, onBlur, onChange } = this.props;
  //     console.log(value);
  //     let valueTemp = value;
  //     if (value.charAt(value.length - 1) === '.' || value === '-') {
  //       valueTemp = value.slice(0, -1);
  //     }
  //     onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  //     if (onBlur) {
  //       onBlur();
  //     }
  //   };
  return (
    <Input
      {...props}
      value={number}
      onChange={onChange}
      className={
        props.className
          ? props.className + " customInput primary-text"
          : "customInput primary-text"
      }
    />
  );
}

export default FlatNumberInput;
