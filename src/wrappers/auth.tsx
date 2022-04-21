import { Redirect, connect, history } from 'umi';
import { message } from 'antd';
import { LayoutModelState } from '@/models/layout';
import { ReactNode } from 'react';

function getCookie(cname: string) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
}

function checkPermission(pathname: string, menuList: Array<string>) {
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i] === pathname) {
      return true;
    }
  }
  return false;
}

interface LayoutProps {
  layout: LayoutModelState;
  children: ReactNode;
}

function AuthWrapper(props: LayoutProps) {
  const { children, layout } = props;
  // console.log(history.location.pathname, layout.menuList)

  var token = getCookie('token');

  if (token !== '') {
    if (
      checkPermission(
        history.location.pathname,
        layout.menuList as Array<string>,
      )
    ) {
      return <div style={{ height: '100%' }}>{children}</div>;
    } else {
      return <Redirect to="/403" />;
    }
  } else {
    message.error('登录信息已失效，请重新登录');
    return <Redirect to="/login" />;
  }
}

export default connect(({ layout }: { layout: LayoutModelState }) => {
  return {
    layout: layout,
  };
})(AuthWrapper);
