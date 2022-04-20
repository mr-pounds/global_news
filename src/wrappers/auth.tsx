import { Redirect } from 'umi';
import { message } from 'antd';

function getCookie(cname: string) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
}

export default (props: any) => {
  console.log(props);
  var token = getCookie('token');

  if (token !== '') {
    return <div style={{ height: '100%' }}>{props.children}</div>;
  } else {
    message.error('登录信息已失效，请重新登录');
    return <Redirect to="/login" />;
  }
};
