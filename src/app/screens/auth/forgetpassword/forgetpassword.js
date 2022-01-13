import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Typography, message } from 'antd';
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import { connect } from "react-redux";
import { forgetPassword } from '../../../redux/actions/user_actions';
import { FORGET_PASSWORD_SUCCESS } from "../../../redux/types";
import { DisableLoader, EnableLoader } from "../../../redux/actions/loader_action";

const { Title } = Typography;


function ForgetPassword(props) {
  const [finishClicked, setFinishClicked] = useState(false);
  const { dispatch } = props;
  const onFinish = values => {
    values.email = values.email.toLowerCase()
    //console.log(values);
    dispatch(EnableLoader());
    dispatch(forgetPassword(values)).then(response => {
      dispatch(DisableLoader());
      if (response.type === FORGET_PASSWORD_SUCCESS) {
        message.success("Email send successfully");
        props.history.push('/login');
      } else {
        message.error(response.payload);
      }
    });

    // props.history.push('/changepassword')

    // console.log('Success:', values);
  };

  const onClick = () => {
    setFinishClicked(true);
  }

  return (
    <>

      <div className="app">
        <div className="">
          <Title style={{ textAlign: "center" }} level={2}>Find your account</Title>
          <span >Enter the email address associated with your account</span>
          <div style={{ marginTop: "20px" }}></div>

          <Form onFinish={onFinish}>
            <Form.Item name="email" validateFirst="true" validateTrigger={finishClicked ? "onChange" : "onSubmit"}
              rules={[{ required: true, message: 'Please enter your email!' },

              { max: 50, message: 'Maximum 50 characters are required!' },
              { type: "email", message: 'Please provide valid email!' },]}

            >

              <Input placeholder='Please enter email!' />
            </Form.Item>

            <div>

              <Button type="primary" htmlType="submit" className="secondary-button" block onClick={onClick}>
                Send</Button>
            </div>
          </Form>
        </div>

      </div>
    </>
  )
}


const mapStateToPops = (state) => {
  console.log(state);
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    dispatch
  }
}

export default connect(mapStateToPops, mapDispatchToProps)(withRouter(ForgetPassword));