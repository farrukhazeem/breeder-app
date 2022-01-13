import React from 'react';
import { Button, Typography } from 'antd';
import './quantityChange.scss';

const { Text } = Typography;

function QuantityChange(props) {
    console.log(props);
    return (
        <div className="quantity-change-main">
            <Button onClick={()=> props.onQuantityDecrease(props.item)}>
                -
            </Button>
            <Text>{props.item.selectedQuantity}</Text>
            <Button onClick={() => props.onQuantityIncrease(props.item)}>
                +
            </Button>
        </div>
    )
}

export default QuantityChange;