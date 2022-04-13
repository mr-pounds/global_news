import { ReactNode } from "react";
import {
    UserOutlined,
    HomeOutlined,
    SettingOutlined,
    FileAddOutlined,
    FileProtectOutlined,
    CarryOutOutlined
  } from '@ant-design/icons';

const mapKeyToIcon = new Map([
    ['/home', <HomeOutlined />],
    ['/user', <UserOutlined />],
    ['/right', <SettingOutlined />],
    ['/news', <FileAddOutlined />],
    ['/audit', <FileProtectOutlined />],
    ['/publish', <CarryOutOutlined />]
]) 

export default function getMenuIcon(key: string): ReactNode {
    if(mapKeyToIcon.has(key)) {
    return mapKeyToIcon.get(key)
    }
    return null
} 