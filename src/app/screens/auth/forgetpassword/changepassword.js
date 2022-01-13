import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Typography, message } from 'antd';
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import { EnableLoader, DisableLoader } from '../../../redux/actions/loader_action';
import { useDispatch } from "react-redux";
import { passwordChange } from '../../../redux/actions/user_actions'

const { Title } = Typography;


function ChangePassword(props) {
  const dispatch = useDispatch();
  const [finishClicked, setFinishClicked] = useState(false);

  const onFinish = values => {
    dispatch(EnableLoader());
    dispatch(passwordChange(window.location.pathname.split("/")[2], values)).then(response => {
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success("password changed successfully! ")
        props.history.push('/login')
      }
      else {
        message.error(response.payload.message)
      }
    })
  }

  const onClick = () => {
    setFinishClicked(true);
  }


  return (

    <div className="app">
      <div className="">
        <Title style={{ textAlign: "center" }} level={2}>Reset Password</Title>
        <span style={{ visibility: "hidden" }}>Enter the password and confirm field to change password</span>
        <div style={{ marginTop: "20px" }}></div>

        <Form onFinish={onFinish}>
          <Form.Item name="password" validateFirst="true" validateTrigger={finishClicked ? "onChange" : "onSubmit"}
            rules={[{ required: true, message: 'Please enter your password!' },

            { min: 8, message: 'Password must be minimum 8 characters' },
            { max: 50, message: 'Password must be maximum 50 characters' },
            {
              pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
              message: "Password must have 1 upper case, 1 lower case character and 1 number"
            },
            ]}
          >

            <Input.Password placeholder='Please enter new password!' />
          </Form.Item>

          <Form.Item name="confirm" validateFirst="true" validateTrigger="onSubmit"
            rules={[
              {required: true,message: 'Please confirm your password!', },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "Password and Confirm password does not matched"
                  );
                },
              }),
            ]}
          >

            <Input.Password placeholder='Please retype new password!' />
          </Form.Item>



          <Button type="primary" htmlType="submit" className="secondary-button" block onClick={onClick}>
            Submit</Button>

        </Form>
      </div>

    </div>

  )
}


export default ChangePassword;