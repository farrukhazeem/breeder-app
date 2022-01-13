import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import './sidebar.scss';
import { getUserFromLocalStorage } from '../../helpers/helperFuctions'
import routes from '../../helpers/routes'

const { Title } = Typography;
const { Sider } = Layout;


function Sidebar(props) {
    console.log(props);

    const selectedRoute = () => {
        const tempRoute = routes.filter(value => (value.route === props.location.pathname))[0] || routes.filter(value => (value.route === `/${props.location.pathname.split('/')[1]}`))[0];
        return tempRoute ? [tempRoute.key.toString()] : null
    }
    return (
        <Sider
            trigger={null}
            breakpoint="lg"
            collapsible
            collapsed={props.collapsed}
            className="primary-background app-sider"
        >
            <div className="logo">
                {/* <Link to={"/businessprofile"}> <img className="logoImg" style={{ background: "white" }} width={props.collapsed ? '50' : '100'} src={require('../../../assets/images/logo.png')} alt="Logo" />
                </Link> */}
                <Link to={"/businessprofile"}>
                    {/* <Title level="1" style={{ fontSize: props.collapsed ? 20 : 38 }} className="primary-contrast-text logoTitle" >Logly</Title> */}
                    <img style={{ padding: '15px 10px', width: 300 }} src={require('../../../assets/images/Logo_Logly.png')} />
                </Link>
            </div>
            <Menu
                theme="light"
                mode="inline"
                className="primary-background"
                selectedKeys={selectedRoute()}
                onClick={() => { console.log('click on menu') }}
            >
                {
                    routes.filter(e => e.notaccess !== getUserFromLocalStorage())
                        .map(e => (
                            // icon={e.icon()}  Removed icon in menu.item
                            <Menu.Item key={e.key} >
                                <Link to={e.route}>{e.name}</Link>
                            </Menu.Item>
                        ))
                }
            </Menu>
        </Sider>

    );



}

export default withRouter(Sidebar);