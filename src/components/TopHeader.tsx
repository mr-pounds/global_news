import React, { useState} from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GithubFilled
} from '@ant-design/icons';

const { Header } = Layout;
const menu = (
    <Menu>
      <Menu.Item>
          超级管理员
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#/login">
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

export default function TopHeader() {
    
    const [collapsed, changeCollapsed] = useState(false)
    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                style:{fontSize: '20px'},
                onClick: () => changeCollapsed(!collapsed),
            })}
            <div style={{float: 'right'}}>
                <span>欢迎登录系统</span>
                <Dropdown overlay={menu} placement="bottomRight">
                    <GithubFilled style={{fontSize: '24px', paddingLeft: '8px'}}/>
                </Dropdown>
            </div>
        </Header>
    )
}
