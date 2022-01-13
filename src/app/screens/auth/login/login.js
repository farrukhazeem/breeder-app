import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import './login.scss';
import { Form, Typography, Row, Col } from 'antd';
//import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { EnableLoader, DisableLoader } from '../../../redux/actions/loader_action';
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import Checkbox from '../../../components/checkbox/Checkbox';
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { loginUser } from '../../../redux/actions/user_actions';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const { Title } = Typography;


function Login(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)
  const [passwordValidtion, setPasswordValidation] = useState(null);
  const [emailValidation, setEmailValidation] = useState(null);
  const [finishClicked, setFinishClicked] = useState(false);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };
  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';


  const onFinish = values => {
    values.email = values.email.toLowerCase()
    //console.log('login submit called', values);

    dispatch(EnableLoader());

    dispatch(loginUser({ ...values, deviceToken: localStorage.getItem('deviceToken') })).then(response => {

      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        cookies.set('w_auth', response.payload.data.token);
        window.localStorage.setItem('userId', response.payload.data.userId);
        window.localStorage.setItem('user', JSON.stringify(response.payload.data.user));
        window.localStorage.setItem('w_auth', response.payload.data.token);
        window.localStorage.setItem('subscriber', JSON.stringify(response.payload.data.subscriber));
        if (rememberMe === true) {
          window.localStorage.setItem('rememberMe', response.payload.data.email);
        } else {
          localStorage.removeItem('rememberMe');
        }

        props.history.push('/main')
      }
      else {
        setFormErrorMessage(response.payload.message)
        //setFormErrorMessage('Check your Account or Password again')
        setTimeout(() => {
          setFormErrorMessage("")
        }, 3000);
      }
    })

    //props.enableSpinner();
    //setTimeout(() => {
    //  props.disableSpinner();
    //}, 2000);
  }

  const fieldChanged = (value) => {
    console.log(value);
    // debugger; 
    // value.forEach((val) => {
    //   if(val.name[0] === 'email') {
    //     if()
    //   }
    // });
    if (value[0]) {
      if (value[0].name[0] === 'password') {
        if (value[0].value === '') {
          setPasswordValidation(null)
        } else {
          if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/g.test(value[0].value)) {
            setPasswordValidation('error')
          } else {
            setPasswordValidation(null);
          }
        }
      }
    }
    // if(value.name[0] === 'password') {

    // }

  }

  const onClick = () => {
    setFinishClicked(true);
  }


  return (
    <Form onFinish={onFinish}

      initialValues={{
        ['email']: initialEmail, ['role']: "breeder"
      }}>
      <div className="login-body">

        <Row>
          <Col span={12}><div></div></Col>

          <Col span={12} className="loginMain" >
            <img width={250} className="registerMainImage" style={{ display: 'block', float: 'right' }} src={require('../../../../assets/images/Logo_Logly_colour.png')} />
            <div className="app_login_register">

              <div className="loginContainer">
                <Title level={2}>Lets Get Started</Title>
                <form style={{ width: '350px', marginTop: 50 }}>


                  {formErrorMessage && (
                    <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                  )}
                  <Form.Item style={{ marginTop: 10 }} name="email" validateTrigger={finishClicked ? "onChange" : "onSubmit"}

                    rules={[{ required: true, message: 'Please input your email!' },
                    { type: "email", message: 'Please provide valid email!' },
                    { max: 50, message: 'Maximum 50 characters are required!' }]}

                  >
                    <Input placeholder="Enter your email" />

                  </Form.Item>


                  <Form.Item name="password" validateTrigger={finishClicked ? "onChange" : "onSubmit"} validateFirst="true"
                    //{...(passwordValidtion === 'error') ? { validateStatus: 'error' } : null}
                    //{...(passwordValidtion === 'error') ? { help: (passwordValidtion === 'error') ? 'Should have 1 upper case and a number!' : null } : null}
                    rules={[{ required: true, message: 'Please input your password!' },

                    { min: 8, message: 'Password must be minimum 8 characters' },
                    // {
                    //   pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
                    //   message: "Password must have 1 upper case, 1 lower case character and 1 number"
                    // },
                    { max: 50, message: 'Password must be maximum 50 characters' }]}

                  >
                    <Input.Password placeholder="Enter your password" type="password" />

                  </Form.Item>

                  <Form.Item name="role" hidden={true}>
                    <Input />
                  </Form.Item>


                  <Form.Item>
                    <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>



                    <Link to={'/forgetpassword'} className="login-form-forgot primary-color" style={{ float: 'right', fontWeight: 'bold' }}>
                      <u>Forgot password?</u>
                    </Link>

                    <div>

                      <Button type="primary" htmlType="submit" className="login-form-button secondary-button" style={{ minWidth: '100%' }} onClick={onClick}>
                        Login</Button>
                    </div>

                    <div style={{ bottom: 65, position: 'fixed' }} className="primary-text">
                      Don't have an account yet? Register <Link to={"/register"} className="primary-color" style={{ fontWeight: 'bold' }}><u>here</u></Link>
                    </div>
                  </Form.Item>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Form>

  )
}



export default withRouter(Login);