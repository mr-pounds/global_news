import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'umi';
import SideMenu from '@/components/SideMenu';
import TopHeader from '@/components/TopHeader';
import { Layout } from 'antd';
import './index.less';

interface PropsInterface {
  children: React.ReactNode;
}

export default function index(props: PropsInterface) {
  const history = useHistory();
  const location = useLocation();
  const { Content } = Layout;

  useEffect(() => {
    if (location.pathname === '/') {
      history.push('/home');
    }
  });
  return (
    <Layout>
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
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
