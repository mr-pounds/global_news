import style from './login.css';
import { Form, Input, Button, message } from 'antd';
import { request } from 'umi';
import { Md5 } from 'ts-md5';
import { useState } from 'react';
import setCookie from './setCookie';

interface LoginError {
  error: boolean;
  message: string;
}

export default function Login() {
  const [loginError, setLoginError] = useState<LoginError>();

  const onFinish = (values: any) => {
    request('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: values.username,
        password: Md5.hashStr(values.password),
      }),
    }).then((res) => {
      if (res.code === 0) {
        setCookie('token', res.data.token, 1);
        window.location.href = '/';
      } else {
        setLoginError({
          error: true,
          message: res.msg,
        });
      }
    });
  };

  return (
    <div className={style.content}>
      <div className={style.login_form}>
        <h2 style={{ marginBottom: '82px' }}>欢迎登录 XXX 系统</h2>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <p style={{ color: 'red', height: '16px', width: '100%' }}>
              {loginError?.message}{' '}
            </p>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%', marginTop: '8px' }}
              onClick={() => {
                setLoginError({
                  error: false,
                  message: '',
                });
              }}
            >
              立即登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
