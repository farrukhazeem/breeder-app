import React from 'react';
import Cart from '../../../components/card/card';
import { Row, Col, Form, Select, Space } from 'antd';
import Button from '../../../components/button/button';

const { Option } = Select;
const names = [{name:"Total animals"},
                {name:"Alive"},
                {name:"Sick"},
                {name:"Dead"},
                {name:"Pregnant"},  
                ]

const statuses = ['1st image@2x.png','2nd image@2x.png','3rd image@2x.png','4th image@2x.png','5th image@2x.png','6th image@2x.png'];
const data = { 'Quantity': 10, 'Sex': 'male', 'Age': 12, 'Breed': 'Pitbull', 'Height': '20cm', 'Color': 'green', 'Weight': '20 kgs', 'Status': 'alive' };
function Profilepage() {
    return (
      <div>
          Profile page
      </div>
    )
}

export default Profilepage;