import React from 'react';
import {
    DesktopOutlined,
} from '@ant-design/icons';

const routes = [
    {
        key: 1,
        name: 'Home',
        route: '/dashboard',
        notaccess: "Individual",
        icon: () => <DesktopOutlined />
    },
    {
        key: 2,
        name: 'CRM',
        route: '/sales',
        notaccess: "Individual",
        icon: () => <DesktopOutlined />
    },

    {
        key: 3,
        name: 'Reports',
        route: '/reports',
        notaccess: "Individual",
        icon: () => <DesktopOutlined />
    },
    {
        key: 4,
        name: 'Form',
        route: '/form',
        notaccess: "",
        icon: () => <DesktopOutlined />
    },
    {
        key: 5,
        name: 'Team Members',
        route: '/employees',
        notaccess: "",
        icon: () => <DesktopOutlined />
    },
    {
        key: 6,
        name: 'Inventory',
        route: '/inventory',
        notaccess: "Individual",
        icon: () => <DesktopOutlined />
    },
    {
        key: 7,
        name: 'Animal',
        route: '/animal',
        notaccess: "",
        icon: () => <DesktopOutlined />
    },
    {
        key: 8,
        name: 'Products',
        route: '/product',
        notaccess: "Individual",
        icon: () => <DesktopOutlined />
    },
    {
        key: 9,
        name: 'Groups',
        route: '/groups',
        notaccess: "",
        icon: () => <DesktopOutlined />
    },
    {
        key: 10,
        name: 'Subscriptions',
        route: '/subscription',
        notaccess: "",
        icon: () => <DesktopOutlined />
    },
    // {
    //     key: 11,
    //     name: 'Notifications',
    //     route: '/notification',
    //     icon: () => <DesktopOutlined />
    // },
    {
        key: 11,
        name: 'Activity Management',
        route: '/activity-management',
        notaccess: "",
        icon: () => <DesktopOutlined />
    },
    {
        key: 12,
        name: 'Contacts',
        route: '/contact',
        notaccess: "",
        icon: () => <DesktopOutlined />
    },

]

export default routes