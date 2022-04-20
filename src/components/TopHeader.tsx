import React, { useState } from 'react';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GithubFilled,
} from '@ant-design/icons';
import { LayoutModelState, Dispatch, connect } from 'umi';

interface LayoutProps {
  layout: LayoutModelState;
  dispatch: Dispatch;
}

const { Header } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="admin">超级管理员</Menu.Item>
    <Menu.Item key="exit">
      <a rel="noopener noreferrer" href="#/login">
        退出登录
      </a>
    </Menu.Item>
  </Menu>
);

function TopHeader(props: LayoutProps) {
  const { layout, dispatch } = props;

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {React.createElement(
        layout.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: 'trigger',
          style: { fontSize: '20px' },
          onClick: () => dispatch({ type: 'layout/toggleCollapsed' }),
        },
      )}
      <span
        style={{
          marginLeft: '16px',
          fontSize: '18px',
          height: '64px',
          lineHeight: '64px',
        }}
      >
        {layout.header}
      </span>
      <div style={{ float: 'right' }}>
        <span>欢迎登录系统</span>
        <Dropdown overlay={menu} placement="bottomRight">
          <GithubFilled style={{ fontSize: '24px', paddingLeft: '8px' }} />
        </Dropdown>
      </div>
    </Header>
  );
}

export default connect(({ layout }: { layout: LayoutModelState }) => {
  return {
    layout: layout,
  };
})(TopHeader);
