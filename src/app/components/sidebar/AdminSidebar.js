import React from 'react';
//import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import {
    DesktopOutlined,
} from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import './sidebar.scss';

const { Title } = Typography;
const { Sider } = Layout;



const routes = [
    {
        key: 0, name: 'Dashboard',
        route: '/admin/dashboard', icon: () => <DesktopOutlined />
    },
    {
        key: 1, name: 'Account Management',
        route: '/admin/account', icon: () => <DesktopOutlined />
    },
    {
        key: 2, name: 'Package Management',
        route: '/admin/package', icon: () => <DesktopOutlined />
    },
    {
        key: 4, name: 'Category Management',
        route: '/admin/category', icon: () => <DesktopOutlined />
    },
    {
        key: 5, name: 'Form Management',
        route: '/admin/form', icon: () => <DesktopOutlined />
    },
    {
        key: 6, name: 'Reports',
        route: '/admin/report', icon: () => <DesktopOutlined />
    },
    {
        key: 7, name: 'Notification',
        route: '/admin/notification', icon: () => <DesktopOutlined />
    },
    {
        key: 8, name: 'Setting',
        route: '/admin/settings', icon: () => <DesktopOutlined />
    },
    {
        key: 9, name: 'Activity Management',
        route: '/admin/activity', icon: () => <DesktopOutlined />
    },

]



function AdminSidebar(props) {
    console.log(props);

    const selectedRoute = () => {
        const tempRoute = routes.filter(value => (value.route.split("/")[2] === props.location.pathname.split("/")[2]))[0] || routes.filter(value => (value.route.split("/")[2] === `/${props.location.pathname.split('/')[3]}`))[0];
        // debugger
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

                <Title style={{ fontSize: props.collapsed ? 20 : 38 }} className="primary-contrast-text logoTitle" >Logly</Title>

            </div>
            <Menu
                theme="light"
                mode="inline"
                className="primary-background"
                selectedKeys={selectedRoute()}
                onClick={() => { console.log('click on menu') }}
            >
                {
                    routes.map(e => (
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

export default withRouter(AdminSidebar);