import { Table, Tag, Switch, message } from 'antd';
import { useRequest, request } from 'umi';

export default function RightList() {
  const { data, loading, refresh } = useRequest(() => {
    return request('/api/account/getRightsList').catch();
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'url',
      render: (url: string) => {
        return <Tag color="gold">{url}</Tag>;
      },
    },
    {
      title: '启用状态',
      dataIndex: 'permission',
      render: (permission: number, record: any) => {
        return (
          <Switch
            checked={permission === 1}
            onChange={() => {
              request('/api/account/changeRightPermission?id=' + record.id, {
                method: 'PUT',
              }).catch();
            }}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Table
        dataSource={!data || loading ? [] : data.list}
        columns={columns}
        rowKey="url"
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
        }}
      />
    </div>
  );
}
