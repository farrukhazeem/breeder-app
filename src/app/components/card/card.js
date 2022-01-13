import React from 'react';
//import { UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import './card.scss';


function CardComponent(props) {
    return (

        <Card {...props}  className={props.className? props.className + ' card-body'  : 'card-body'}>
            {props.children}
        </Card>
    );
  }
  
  export default CardComponent;