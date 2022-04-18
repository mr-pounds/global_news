import { Button, Table, Popconfirm } from 'antd'
import { useState } from 'react'
import RoleModal from './RoleModal'
import { useRequest, request } from 'umi'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'


export default function RoleList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null)
  const { data, refresh } = useRequest(() => {
    return request('/api/account/getRoleList')
  })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text: any, record: any, index: any) => {
        return <span>{index + 1}</span>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '备注',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      dataIndex: '',
      render: (record: any) => {
        return <div>
          <Popconfirm title="确定删除？" okText="确定" cancelText="取消" onConfirm={() => {
            request('/api/account/delRole', {
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
            setEditRoleId(record.id)
            setModalVisible(true)
          }} />
        </div>
      }
    },
  ]

  const handleOk = () => {
    setModalVisible(false)
    setEditRoleId(null)
    refresh()
  }

  const handleCancel = () => {
    setModalVisible(false)
    setEditRoleId(null)
  }
  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: '16px' }}>新增角色</Button>
      {modalVisible && <RoleModal onCancel={handleCancel} role={editRoleId} onOk={handleOk} />}
      <Table
        sticky
        columns={columns}
        dataSource={data}
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
