import React, { useState } from "react";
import { Layout, Menu, Dropdown, Drawer, Space, message } from "antd";
import "./layout.scss";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import { connect, useDispatch } from "react-redux";
import { BellOutlined, DownOutlined } from "@ant-design/icons";

//import { EnableLoader, DisableLoader } from '../../redux/actions/loader_action';
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";
import { logoutUser } from "../../redux/actions/user_actions";

const { Header, Content } = Layout;

function AppLayout(props) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { userData } = props.user;

  const [mobile, setMobile] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  window.addEventListener("resize", (e) => {
    console.log(e.target.innerWidth);
  });

  const screenHandler = (width) => {
    if (width < 768) {
      if (!mobile) {
        setMobile(true);
      }
    } else {
      if (mobile) {
        setMobile(false);
      }
    }
  };

  const onCollapseChange = () => {
    setCollapsed(!collapsed);
  };

  const onLogout = () => {
    dispatch(EnableLoader());
    dispatch(logoutUser()).then((response) => {
      console.log("logout called");
      console.log(response);
      dispatch(DisableLoader());
      if (response.payload.status === 200) {
        message.success(response.payload.message);
        // console.log(props);
        // props.history.push('/login');
      } else {
        message.error(response.payload.message);
      }
    });
  };

  const menu = (
    <Menu style={{ textAlign: "center" }}>
      <Menu.Item key="1">
        <Link to={"/admin/settings"}>Settings</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => onLogout()}>
        <Link to={"/login"}>Logout</Link>
      </Menu.Item>

    </Menu>
  );

  return (
    <Layout theme="light" style={{ minHeight: "100vh", background: "white" }}>
      <AdminSidebar collapsed={collapsed} />
      <Layout className="site-layout" style={{ background: "white" }}>
        <div style={{ background: "var(--primary-color)", height: 64 }}>
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              background: "white",
              borderLeft: "1px solid #f0f0f0",
              borderRadius: "50px 0px 0px 0px",
            }}
          >
            <span style={{ float: "right", marginRight: 30 }}>
              <Dropdown trigger="click" overlay={menu}>
                <Space>
                  {/* <img src={require('../../../assets/images/emp/men2.png')} style={{ borderRadius: "45px" }} width={'50'} alt="logo" /> */}
                  <span className="fs-120 dropdown-avatar-text">
                    {userData ? userData.data.name : "Logly"}
                  </span>
                  <DownOutlined />
                </Space>
              </Dropdown>
            </span>
          </Header>
        </div>
        <Content
          className=""
          style={{
            margin: "0px 16px",
            padding: 24,
            minHeight: 280,
            // marginTop: -50,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToPops = (state) => {
  console.log(state);
  return {
    user: state.user,
  };
};

export default connect(mapStateToPops)(AppLayout);
