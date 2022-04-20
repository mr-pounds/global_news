import { Button, Table, Popconfirm, Switch, Tag } from 'antd';
import { useState } from 'react';
import UserModal from './UserModal';
import PasswordModal from './PasswordModal';
import { useRequest, request } from 'umi';
import {
  DeleteOutlined,
  EditOutlined,
  UnlockOutlined,
} from '@ant-design/icons';

interface User {
  id: number;
  name: string;
  phone: string;
  region: string;
  region_id: number;
  role: string;
  role_id: number;
}

export default function UserList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editUser, setEditUser] = useState<User>();
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const { data, loading, refresh } = useRequest(() => {
    return request('/api/account/getUserList');
  });
  const { userList, regionList, roleList } = data || {};

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
      render: (text: any, record: any, index: any) => {
        return index + 1;
      },
    },
    {
      title: '用户名',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: '15%',
    },
    {
      title: '权限角色',
      dataIndex: 'role',
      width: '15%',
      render: (text: string) => {
        return <Tag color="gold">{text}</Tag>;
      },
    },
    {
      title: '所属区域',
      dataIndex: 'region',
      width: '15%',
    },
    {
      title: '启用状态',
      dataIndex: 'is_effect',
      width: '15%',
      render: (is_effect: boolean, record: any) => {
        return (
          <Switch
            checked={is_effect}
            onChange={() => {
              fetch('/api/account/changeUserEffect?id=' + record.id, {
                method: 'PUT',
              })
                .then((data) => data.json())
                .then((data) => {
                  refresh();
                });
            }}
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: '',
      width: '20%',
      render: (_: null, record: any) => {
        return (
          <div>
            <Popconfirm
              title="确定删除？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                request('/api/account/delUser', {
                  method: 'DELETE',
                  params: {
                    id: record.id,
                  },
                }).then(() => {
                  refresh();
                });
              }}
            >
              <Button
                icon={<DeleteOutlined />}
                style={{ marginRight: '12px' }}
              />
            </Popconfirm>
            <Button
              icon={<UnlockOutlined />}
              style={{ marginRight: '12px' }}
              onClick={() => {
                setEditUser(record);
                setPasswordModalVisible(true);
              }}
            />
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setEditUser(record);
                setModalVisible(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        style={{ marginBottom: '16px' }}
      >
        新增用户
      </Button>
      {modalVisible && (
        <UserModal
          user={editUser}
          regionList={regionList}
          roleList={roleList}
          onOk={() => {
            setModalVisible(false);
            setEditUser(undefined);
            refresh();
          }}
          onCancel={() => {
            setModalVisible(false);
            setEditUser(undefined);
          }}
        />
      )}
      {passwordModalVisible && (
        <PasswordModal
          userId={(editUser as User).id}
          onOk={() => {
            setPasswordModalVisible(false);
            setEditUser(undefined);
            refresh();
          }}
          onCancel={() => {
            setPasswordModalVisible(false);
            setEditUser(undefined);
          }}
        />
      )}
      <Table
        sticky
        columns={columns}
        dataSource={userList}
        loading={loading}
        rowKey="id"
        scroll={{ y: 480 }}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
        }}
      />
    </div>
  );
}
