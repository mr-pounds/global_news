import { useCallback, useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Switch } from 'antd'
import childrenHandler from '@/components/utils/childrenHandler'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

interface rightInterface {
  id: number,
  key: string,
  title: string,
  children: rightInterface[] | null
}

export default function RightList() {
  const [rightList, setRightList] = useState<rightInterface[]>([])

  function getRightList(){
    fetch('/api/account/rights', {
      method: 'GET',
    }
    ).then(data => data.json()).then(data => {
      setRightList(childrenHandler(data))
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
      key: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (key: string) => {
        return <Tag color="gold">{key}</Tag>
      }
    },
    {
      title: '启用状态',
      dataIndex: 'permission',
      key: 'permission',
      render: (permission: number, record: any) => {
        return <Switch checked={permission === 1} onChange={()=>{
          fetch('/api/account/rights/' + record.id, {
            method: 'PUT',
          }).then(data=>data.json()).then(data=>{
            console.log('权限项更新完成')
          })
          getRightList()
        }} />
      }
    },
    {
      title: '操作',
      key: 'operate',
      render: (record: any) => {
        return <Button shape="circle" icon={<DeleteOutlined />} style={{
            marginRight: '8px'
          }} onClick={() => {
            deleteConfirm(record)
          }} />
      }
    },
  ]

  return (
    <div>
      <Table dataSource={rightList} columns={columns} />;
    </div>
  )
}
