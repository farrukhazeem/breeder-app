import React from 'react'
import { Result, } from 'antd';
import { Link } from 'react-router-dom'
import Button from '../../components/button/button'

export default function NotFound() {
    return (

        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button className="inner-primary-btn">
                <Link to={{ pathname: "/" }}>Back Home</Link>
            </Button>}
        />
    )
}
