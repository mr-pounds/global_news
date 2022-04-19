import { useEffect, useState, useMemo } from 'react'
import { Modal, Form, Input, Tree, message } from 'antd'
import { request } from 'umi'


interface RoleModalProps {
  onCancel: () => void,
  onOk: () => void,
  role?: number | null,
}


export default function AddRoleModal(props: RoleModalProps) {
  // 控制校验的状态
  const [confirmLoading, setConfirmLoading] = useState(false);
  // 存储权限树
  const [rightTree, setRightTree] = useState()
  // 存储已选择的 tree 的key，即 权限id
  const [checkedRightList, setCheckedRightList] = useState<number[]>([])
  // 控制 Tree 的渲染时机，不然显示全部展开会有问题。
  const [canLoadTree, setCanLoadTree] = useState(false)

  const [inputStatus, setInputState] = useState<'' | 'error' | 'warning' | undefined>('')
  const { onCancel, onOk, role } = props;
  const [form] = Form.useForm()

  useEffect(() => {
    request('/api/account/getRightsList')
      .then(data => {
        setRightTree(data.data.list)
        // 如果是编辑，就加载相关数据
        if (role) {
          request('/api/account/getRightsByRoleId', {
            params: {
              id: role
            }
          }).then(data => {
            form.setFieldsValue({
              name: data.data.name,
              desc: data.data.desc
            })
            setCheckedRightList(data.data.rightList)
          })
        }
        setCanLoadTree(true)
      })
  }, [])

  const handleOk = () => {
    setConfirmLoading(true)

    function handleResponse(data: any) {
      setConfirmLoading(false)
      if (data.code === 0) {
        message.success('保存成功')
        onOk()
      } else {
        setInputState('error')
        message.error(data.msg)
      }
    }

    if (role) {
      request('/api/account/updateRole', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: role,
          name: form.getFieldValue('name'),
          desc: form.getFieldValue('desc'),
          right_list: checkedRightList
        })
      }).then(data => {
        handleResponse(data)
      })
    } else {
      request('/api/account/addRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.getFieldValue('name'),
          desc: form.getFieldValue('desc'),
          right_list: checkedRightList
        })
      }).then(data => {
        handleResponse(data)
      })
    }
  };

  return (
    <Modal
      title={role?"编辑角色":"创建角色"}
      visible={true}
      okText="保存"
      cancelText="取消"
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => { onCancel() }}
      width={600}
    >
      <Form form={form} name="role_form" layout="vertical" validateTrigger='onBlur'>
        <Form.Item name={'name'} label="角色名称" rules={[{ required: true }]}>
          <Input status={inputStatus} onChange={() => setInputState('')} />
        </Form.Item>
        <Form.Item name={'desc'} label="角色描述">
          <Input.TextArea maxLength={200} showCount />
        </Form.Item>
        <Form.Item label="权限">
          {canLoadTree && <Tree
            checkable
            defaultExpandAll
            selectable={false}
            checkedKeys={checkedRightList}
            onCheck={(checked: any, info: any) => setCheckedRightList(checked)}
            treeData={rightTree}
            fieldNames={{ title: 'title', key: 'id', children: 'children' }}
            height={220}
            style={{ background: '#f3f3f3', borderRadius: '4px' }}
          />}
        </Form.Item>
      </Form>
    </Modal>
  )
}
