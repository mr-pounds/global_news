import { useCallback, useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Switch } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

interface rightInterface {
  id: number,
  url: string,
  title: string,
  children: rightInterface[] | null
}

export default function RightList() {
  const [rightList, setRightList] = useState<rightInterface[]>([])

  function getRightList() {
    fetch('/api/account/getRightsList')
      // fetch('/mock/account/rights')
      .then(data => data.json()).then(data => {
        setRightList(data.map((item: any) => {

          if (item.children && item.children.length === 0) {
            item.children = null
          }
          return item
        }))
      }
      )
  }

  useEffect(() => {
    getRightList()
  }, [])

  const deleteConfirm = useCallback((record) => {
    Modal.confirm({
      title: '删除权限项',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除' + record.title + '权限项吗？',
      okText: '删除',
      okButtonProps: {
        danger: true
      },
      onOk: () => {
        fetch('/api/account/rights/' + record.id, {
          method: 'DELETE',
          body: JSON.stringify({
            "id": record.id,
          })
        }).then(data => data.json()).then(data => {
          getRightList()
        })
      },
      cancelText: '取消',
    });
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      // key: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'url',
      // key: 'url',
      render: (url: string) => {
        return <Tag color="gold">{url}</Tag>
      }
    },
    {
      title: '启用状态',
      dataIndex: 'permission',
      // key: 'permission',
      render: (permission: number, record: any) => {
        return <Switch checked={permission === 1} onChange={() => {
          fetch('/api/account/changeRightPermission?id=' + record.id, {
            method: 'PUT',
          }).then(data => data.json()).then(data => {
            if (data.msg === 'ok') {
              getRightList()
            } else {
              console.log('修改失败')
            }
          })
        }} />
      }
    },
  ]

  return (
    <div>
      <Table dataSource={rightList} columns={columns} rowKey='url' />;
    </div>
  )
}
