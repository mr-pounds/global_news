import { Button, Table, Popconfirm, Switch, Tag } from 'antd'
import { useState } from 'react'
import UserModal from './UserModal'
import { useRequest, request } from 'umi'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'


export default function UserList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null)
  const { data, loading, refresh } = useRequest(() => {
    return request('/api/account/getUserList')
  })
  const { userList, regionList, roleList } = data || {}

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text: any, record: any, index: any) => {
        return index + 1
      }
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '权限角色',
      dataIndex: 'role',
      render:(text:string)=>{
        return <Tag color="gold">{text}</Tag>
      }
    },
    {
      title: '所属区域',
      dataIndex: 'region',
    },
    {
      title: '启用状态',
      dataIndex: 'is_effect',
      render: (is_effect: boolean, record: any) => {
        return <Switch checked={is_effect} onChange={() => {
          fetch('/api/account/changeUserEffect?id=' + record.id, {
            method: 'PUT',
          }).then(data => data.json()).then(data => {
            refresh()
          })
        }} />
      }
    },
    {
      title: '操作',
      dataIndex: '',
      render: ( _: null, record: any) => {
        return <div>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消" onConfirm={() => {
            request('/api/account/delUser', {
              method: 'DELETE',
              params: {
                id: record.id
              },
            }).then(() => {
              refresh()
            })
          }}>
            <Button icon={<DeleteOutlined />} style={{ marginRight: '12px' }} />
          </Popconfirm>
          <Button icon={<EditOutlined />} onClick={() => {
            setEditUser(record)
            setModalVisible(true)
          }} />
        </div>
      }
    },
  ]

  const handleOk = () => {
    setModalVisible(false)
    setEditUser(null)
    refresh()
  }

  const handleCancel = () => {
    setModalVisible(false)
    setEditUser(null)
  }
  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: '16px' }}>新增用户</Button>
      {modalVisible && <UserModal user={editUser} regionList={regionList} roleList={roleList} onOk={handleOk} onCancel={handleCancel}/>}
      <Table
        sticky
        columns={columns}
        dataSource={userList}
        loading={loading}
        rowKey='id'
        scroll={{ y: 480 }}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
        }}
      />
    </div>
  )
}
