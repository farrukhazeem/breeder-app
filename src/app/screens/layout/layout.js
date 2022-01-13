import React, { useState } from "react";
import { Layout, Menu, Dropdown, Drawer, Space, message } from "antd";
import "./layout.scss";
import Sidebar from "../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import { BellOutlined, DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/user_actions";
import { EnableLoader, DisableLoader } from "../../redux/actions/loader_action";

const { Header, Content } = Layout;

function AppLayout(props) {
  console.log(props);
  const { userData } = props.user;
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  // const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
  const toggleCollapsed = () => {
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

  // const enquireHandler = enquireScreen(mobile => {
  //     console.log('is Mobile enquire screen')
  //     console.log(mobile);
  //     // const { isMobile } = this.state
  //     // if (isMobile !== mobile) {
  //     //     this.setState({
  //     //         isMobile: mobile,
  //     //     })
  //     // }
  // });

  // unenquireScreen(enquireHandler);

  window.addEventListener("resize", (e) => {
    console.log(e.target.innerWidth);
    // screenHandler(e.target.innerWidth);
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

  const menu = (
    <Menu style={{ textAlign: "center" }}>
      <Menu.Item key="1">
        <Link to={"/businessprofile"}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={"/settings"}>Settings</Link>
      </Menu.Item>
      {/* <Menu.Item key="3">
        <Link to={"/about"}>About</Link>
      </Menu.Item> */}
      <Menu.Item key="4" onClick={() => onLogout()}>
        <Link to={"/login"}>Logout</Link>
      </Menu.Item>

    </Menu>
  );

  return (
    <Layout theme="light" style={{ minHeight: "100vh", background: "white" }}>
      {props.isDrawerEnable &&
        (mobile ? (
          <Drawer
            maskClosable
            closable={false}
            onClose={onCollapseChange}
            visible={!collapsed}
            placement="left"
            width={200}
            style={{
              padding: 0,
              height: "100vh",
            }}
          >
            <Sidebar collapsed={collapsed} />
          </Drawer>
        ) : (
            <Sidebar collapsed={collapsed} />
          ))}

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
            {/* {React.createElement(collapsed ? MenuOutlined : MenuOutlined, {
                        className: 'trigger',
                        onClick: toggleCollapsed,
                    })} */}

            <span style={{ float: "right", marginRight: 30 }}>
              <Dropdown trigger="click" overlay={menu}>
                <Space>
                  {/* <img src={require('../../../assets/images/emp/men2.png')} style={{ borderRadius: "45px" }} width={'50'} alt="logo" /> */}
                  <span className="fs-120 dropdown-avatar-text">
                    {userData ? (userData.data.businessName ? userData.data.businessName : userData.data.name) : "Logly"}
                  </span>
                  <DownOutlined />
                </Space>
              </Dropdown>
            </span>
            <span
              style={{ float: "right", marginRight: 30, fontSize: "1.5em" }}
            >
              <Link to={"/notification"} style={{ color: "#001529" }}>
                <BellOutlined style={{ fontWeight: "bold" }} />
              </Link>
            </span>
            <span
              style={{ float: "right", marginRight: 30, fontSize: "1.5em" }}
            >
              <Link to={{ pathname: "/setupWizard", state: { isAllowed: true } }} style={{ color: "#001529" }}>
                <ExclamationCircleOutlined style={{ fontWeight: "bold" }} />
              </Link>
            </span>
          </Header>
        </div>
        <Content
          className=""
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToPops, mapDispatchToProps)(AppLayout);
