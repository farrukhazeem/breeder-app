import React, { useEffect, useState } from "react";
import { Radio, Space, Avatar, Row, Col, Switch, message } from "antd";
//import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
//import './Settings.scss';
//import Card from '../../../components/card/card';
//import Button from '../../../components/button/button';
import BusinessInfoRrenderer from "./businessInfoRrenderer";
import notificationList from "../../../config/notificationSettingsAdmin";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { DisableLoader, EnableLoader } from "../../../redux/actions/loader_action";
import { auth, updateEmp } from "../../../redux/actions/user_actions";

const settingAttrs = {
  notification: "notification",
  businessInfo: "businessInfo",
};

const notificationList2 = [
  {
    option: "Notification option 1",
    enable: true,
  },
  {
    option: "Notification option 2",
    enable: false,
  },
  {
    option: "Notification option 3",
    enable: true,
  },
  {
    option: "Notification option 4",
    enable: false,
  },
  {
    option: "Notification option 5",
    enable: false,
  },
  {
    option: "Notification option 6",
    enable: true,
  },
  {
    option: "Notification option 7",
    enable: true,
  },
  {
    option: "Notification option 8",
    enable: false,
  },
  {
    option: "Notification option 9",
    enable: true,
  },
  {
    option: "Notification option 10",
    enable: true,
  },
];
function Settings(props) {
  const [tabIndex, setTabIndex] = useState(settingAttrs.notification);
  const [notificationSettings, setNotificationSettings] = useState(
    props.user.userData?.data?.notificationSettings
  );
  const [currUser, setCurrUser] = useState({});

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
      }
    });
  }
  const changeNoticationSetting = (data) => {
    console.log(data);
    console.log({ ...notificationSettings, ...data });
    setNotificationSettings({ ...notificationSettings, ...data });
    dispatch(EnableLoader());
    dispatch(
      updateEmp(
        { notificationSettings: { ...notificationSettings, ...data } },
        props.user.userData?.data?._id
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
                    checked={notificationSettings && notificationSettings[e.attribute]}
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
      <div className="setting-radio-btn-switch-admin">
        <Radio.Group
          value={tabIndex}
          onChange={(index) => {
            setTabIndex(index.target.value);
          }}
          style={{ marginBottom: 16 }}
        >
          <Radio.Button value={settingAttrs.notification}>
            Notification
          </Radio.Button>
          <Radio.Button value={settingAttrs.businessInfo}>
            Account Settings
          </Radio.Button>
        </Radio.Group>
      </div>

      <div>
        {tabIndex === settingAttrs.notification && notificaitonRenderer()}
        {tabIndex === settingAttrs.businessInfo && <BusinessInfoRrenderer />}
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
