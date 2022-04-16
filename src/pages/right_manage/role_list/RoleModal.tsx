import { useEffect, useState } from 'react'
import { Modal, Form, Input, Tree, message } from 'antd'


interface RoleModalProps {
  onCancel: () => void,
  onOk: () => void,
  // roleId?: number,
}


export default function AddRoleModal(props: RoleModalProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { onCancel, onOk } = props;
  const [form] = Form.useForm()
  const [rightTree, setRightTree] = useState()
  const [checkedRightList, setCheckedRightList] = useState<number[]>([])
  const [inputStatus, setInputState] = useState<'' | 'error' | 'warning' | undefined>('')

  useEffect(() => {
    fetch('/api/account/getRightsList')
      .then(data => data.json())
      .then(data => {
        setRightTree(data.data.list)
      })
  }, [])

  const onCheck = (checked: any, info: any) => {
    setCheckedRightList(checked)
  };

  const handleOk = () => {
    setConfirmLoading(true)
    fetch('/api/account/addRole', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.getFieldValue('name'),
        desc: form.getFieldValue('desc'),
        right_list: checkedRightList
      })
    }).then(data => data.json()).then(data => {

      // 校验是否提交成功，成功就隐藏返回列表页，并重新刷新列表；
      if (data.code === 0) {
        onOk()
      } else {
        setInputState('error')
        message.error(data.msg)
      }
      setConfirmLoading(false)
    })
  };

  return (
    <Modal
      title="创建角色"
      visible={true}
      okText="保存"
      cancelText="取消"
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => { onCancel() }}
      width={600}
    >
      <Form form={form} name="role_form" layout="vertical" initialValues={{ name: '', desc: '' }} validateTrigger='onBlur'>
        <Form.Item name={'name'} label="角色名称" rules={[{ required: true }]}>
          <Input status={inputStatus} onChange={() => {
            setInputState('')
          }} />
        </Form.Item>
        <Form.Item name={'desc'} label="角色描述">
          <Input.TextArea maxLength={200} showCount />
        </Form.Item>
        <Form.Item label="权限">
          <Tree
            checkable
            defaultExpandAll
            selectable={false}
            defaultSelectedKeys={[]}
            defaultCheckedKeys={[]}
            onCheck={onCheck}
            treeData={rightTree}
            fieldNames={{ title: 'title', key: 'id', children: 'children' }}
            height={220}
            style={{
              background: '#f3f3f3',
              borderRadius: '4px',
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
