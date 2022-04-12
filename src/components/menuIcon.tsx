import { ReactNode } from "react";
import {
    UserOutlined,
    HomeOutlined,
    SettingOutlined
  } from '@ant-design/icons';

export default function getMenuIcon(key: string): ReactNode {
    switch (key) {
        case '/home':
            return <HomeOutlined />;
        case '/user':
            return <UserOutlined />;
        case '/right':
            return <SettingOutlined />;
        default:
            return null;
    }  
} 