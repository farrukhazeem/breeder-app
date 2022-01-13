import React, { useEffect, useState } from "react";
import { Radio, Space, Avatar, Row, Col, Switch, message } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import "./Settings.scss";
import Card from "../../components/card/card";
import Button from "../../components/button/button";
import BusinessInfoRrenderer from "./businessInfoRrenderer";
import PaymentInfo from "./paymentInfo";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import notificationList from "../../config/notificationSettings";
import { auth, editDetail, updateEmp, userDetail } from "../../redux/actions/user_actions";
import { DisableLoader, EnableLoader } from "../../redux/actions/loader_action";
import FacebookLogin from "react-facebook-login";
import InstagramLogin from "react-instagram-login";
import TwitterLogin from "react-twitter-login";

const settingAttrs = {
  paymentInfo: "paymentInfo",
  socialMedia: "socialMedia",
  notification: "notification",
  businessInfo: "businessInfo",
};

function Settings(props) {
  console.log(props);
  const [tabIndex, setTabIndex] = useState(settingAttrs.paymentInfo);
  const [notificationSettings, setNotificationSettings] = useState(
    props.user.userData?.data?.notificationSettings
  );
  const [socialConn, setSocialConn] = useState(props.user.userData?.data?.socialConnects);
  const [currUser, setCurrUser] = useState({});
  const [socialLinkType, setsocialLinkType] = useState(null);

  const dispatch = useDispatch();


  useEffect(() => {
    getData();
  }, [])


  const getData = () => {
    dispatch(EnableLoader());
    dispatch(auth()).then(response => {
      dispatch(DisableLoader())
      console.log(response);
      if (response.payload.status === 200) {
        setCurrUser(response.payload.data);
        setSocialConn(response.payload.data.socialConnects);
      }
    });
  }


  const onFinishSocialConnect = (values, type) => {
    dispatch(EnableLoader());
    dispatch(editDetail({ socialConnects: { ...socialConn, [type]: values } })).then(response => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        getData();
      }
    })
  };

  const unlinkConnect = (type) => {
    dispatch(EnableLoader());
    dispatch(editDetail({ socialConnects: { ...socialConn, [type]: null } })).then(response => {
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        getData();
      }
    })
  }

  const responseFacebook = (response) => {
    console.log(response);
    if (!response.userID) return message.error('Can not connect to facebook');
    onFinishSocialConnect(response, 'facebook');
  };


  const componentClicked = (ev) => {
    console.log("clicked");

    console.log(ev);
  };

  const responseInstagram = (response) => {
    console.log(response);
  };

  const authHandler = (err, data) => {
    console.log(err, data);
  };
  const socialMediaRenderer = () => {
    return (
      <div className="setting-social-media-rendrer">
        <h2 className="primarytext primary-text-heading">
          Connect to social media
        </h2>
        <div className="card-list">
          <Card className="card">
            <Row>
              <Col span={12} xs={24} lg={18}>
                <Space size={20}>
                  <Avatar size={45} icon={<FacebookOutlined />} />
                  <span className="primary-text fs-120">Facebook</span>

                  {(socialConn && socialConn.facebook) && <Space direction="vertical">
                    <span className="secondary-text">Connected</span>
                    <span className="primary-text">{socialConn.facebook.name}</span>
                  </Space>}
                </Space>
              </Col>
              <Col span={12} xs={24} lg={6} className="link-unlink">
                {(socialConn && socialConn.facebook) ? (<Button className="link-unlink-btn" onClick={() => unlinkConnect("facebook")}>Unlink</Button>) : (<FacebookLogin
                  appId="729875944281868"
                  autoLoad={false}
                  icon={<Button className="link-unlink-btn">Link</Button>}
                  textButton=""
                  buttonStyle={{
                    padding: 0,
                    backgroundColor: "inherit",
                    border: 0,
                    borderColor: "white",
                  }}
                  fields="name,email,picture"
                  onClick={componentClicked}
                  callback={responseFacebook}
                />)}

              </Col>
            </Row>
          </Card>

          {/* <Card className="card">
            <Row>
              <Col span={12} xs={24} lg={18}>
                <Space size={20}>
                  <Avatar size={45} icon={<TwitterOutlined />} />
                  <span className="primary-text fs-120">Twitter</span>
                  <Space direction="vertical">
                    <span className="secondary-text">Connected</span>
                    <span className="primary-text">Kevin Peterson</span>
                  </Space>
                </Space>
              </Col>
              <Col span={12} xs={24} lg={6} className="link-unlink">
                <TwitterLogin
                  authCallback={authHandler}
                  consumerKey={"E6FhsghRQajcWdIWj7lJ0UNIV"}
                  consumerSecret={"segz9Q8sqh7rOn3EFUDfauQsoIavjxjrqhfnd1PUOCmzjVKyck"}
                />
              </Col>
            </Row>
          </Card> */}
          {/* <Card className="card">
            <Row>
              <Col span={12} xs={24} lg={18}>
                <Space size={20}>
                  <Avatar size={45} icon={<LinkedinOutlined />} />
                  <span className="primary-text fs-120">Linkedin</span>
                </Space>
              </Col>
              <Col span={12} xs={24} lg={6} className="link-unlink">
                <InstagramLogin
                  clientId="5fd2f11482844c5eba963747a5f34556"
                  buttonText="Login"
                  cssClass={"instagramButtonClass"}
                  onSuccess={responseInstagram}
                  onFailure={responseInstagram}
                >
                  <Button className="link-unlink-btn">Unlink</Button>
                </InstagramLogin>
              </Col>
            </Row>
          </Card> */}

          {/* Instagram Card */}

          {/* <Card className="card">
            <Row>
              <Col span={12} xs={24} lg={18}>
                <Space size={20}>
                  <Avatar size={45} icon={<InstagramOutlined />} />
                  <span className="primary-text fs-120">Instagram</span>
                </Space>
              </Col>
              <Col span={12} xs={24} lg={6} className="link-unlink">
                <InstagramLogin
                  clientId="5fd2f11482844c5eba963747a5f34556"
                  buttonText="Login"
                  cssClass={"instagramButtonClass"}
                  onSuccess={responseInstagram}
                  onFailure={responseInstagram}
                >
                  <Button className="link-unlink-btn">Unlink</Button>
                </InstagramLogin>
              </Col>
            </Row>
          </Card> */}
        </div>
      </div>
    );
  };

  const changeNoticationSetting = (data) => {
    console.log(data);
    console.log({ ...notificationSettings, ...data });
    setNotificationSettings({ ...notificationSettings, ...data });
    dispatch(EnableLoader());
    dispatch(
      updateEmp(
        { notificationSettings: { ...notificationSettings, ...data } },
        props.user.userData.data._id
      )
    ).then((response) => {
      dispatch(DisableLoader());
      console.log(response);
      if (response.payload.status === 200) {
        message.success("Notification settings updated successfully");
      }
    });
  };

  const notificaitonRenderer = () => {
    return (
      <div className="setting-notification-renderer">
        <h2 className="primarytext primary-text-heading">
          Notification settings
        </h2>
        <div className="setting-notification-list">
          {notificationList.map((e) => (
            <div className="list ">
              <Row>
                <Col span={12}>
                  <span className="primary-text fs-120">{e.option}</span>
                </Col>
                <Col span={12} className="switch-notif">
                  <Switch
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    onChange={(event) =>
                      changeNoticationSetting({ [e.attribute]: event })
                    }
                    checked={notificationSettings[e.attribute]}
                  />
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </div>
    );
  };




  return (
    <div>
      <div className="setting-radio-btn-switch" style={{ width: 412 }}>
        <Radio.Group
          value={tabIndex}
          onChange={(index) => {
            setTabIndex(index.target.value);
          }}
          style={{ marginBottom: 16 }}
        >
          <Radio.Button value={settingAttrs.paymentInfo}>
            Payment Info
          </Radio.Button>
          {/* <Radio.Button value={settingAttrs.socialMedia}>
            Social Media
          </Radio.Button> */}
          <Radio.Button value={settingAttrs.notification}>
            Notification
          </Radio.Button>
          <Radio.Button value={settingAttrs.businessInfo}>
            Business Info.
          </Radio.Button>
        </Radio.Group>
      </div>

      <div>
        {tabIndex === settingAttrs.paymentInfo && <PaymentInfo
          // data={currUser} 
          data={props.user?.userData?.data}
          getData={getData} />}
        {tabIndex === settingAttrs.socialMedia && socialMediaRenderer()}
        {tabIndex === settingAttrs.notification && notificaitonRenderer()}
        {tabIndex === settingAttrs.businessInfo && <BusinessInfoRrenderer
          data={props.user?.userData?.data}
          getData={getData} />}
      </div>
    </div>
  );
}

const mapStateToPops = (state) => {
  console.log(state);
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    dispatch,
  };
};
export default connect(
  mapStateToPops,
  mapDispatchToProps
)(withRouter(Settings));
