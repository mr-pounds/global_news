import { useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { request } from 'umi';
import { Md5 } from 'ts-md5/dist/md5';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

interface ModalProps {
  onCancel: () => void;
  onOk: () => void;
  userId: number;
}

export default function UserModal(props: ModalProps) {
  // 控制校验的状态
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { onCancel, onOk, userId } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        request('/api/account/changeUserPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userId,
            password: Md5.hashStr(form.getFieldValue('password')),
          }),
        }).then((data) => {
          setConfirmLoading(false);
          if (data.code === 0) {
            message.success('保存成功');
            onOk();
          } else {
            message.error(data.msg);
          }
        });
      })
      .catch((_) => {
        message.warning('请检查输入的内容');
      });
  };

  return (
    <Modal
      title="设置密码"
      visible={true}
      okText="保存"
      cancelText="取消"
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => {
        onCancel();
      }}
      width={600}
    >
      <Form
        {...layout}
        form={form}
        name="role_form"
        validateTrigger="onBlur"
        style={{ margin: '16px 48px' }}
        labelAlign="right"
      >
        <Form.Item
          name={'password'}
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
