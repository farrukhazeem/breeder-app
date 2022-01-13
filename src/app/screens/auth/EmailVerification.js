import React, { useEffect } from "react";
import axios from 'axios'
import { baseUrl } from '../../config/globalConfig';
import './login/login.scss';
import { Form, Typography, Row, Col, message } from 'antd';
import Cookies from "universal-cookie";

const { Title } = Typography;
const cookies = new Cookies();

function EmailVerification(props) {
  useEffect(() => {
    //remove auth
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      localStorage.removeItem("w_auth");
      cookies.remove("w_auth");
        //
    let verifytoken = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    axios.get(`${baseUrl}/user/verify/` + verifytoken).then(response => {
      message.info(response.data.message)
      props.history.push('/login')
    }
    )
  }, [])
  return (

    <div className="login-body">

      <Row>
        <Col span={12}><div></div></Col>

        <Col span={12} className="loginMain" >
          <div className="app">
            <div className="loginContainer">
              <Title level={2}>Verifying email ...</Title>
            </div>
          </div>
        </Col>
      </Row>
    </div>


  )
}



export default EmailVerification;