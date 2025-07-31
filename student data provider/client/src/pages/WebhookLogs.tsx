import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { fetchWebhookLogs } from '../services/webhookLogs';
import { useParams } from 'react-router-dom';

const columns = [
  { title: 'School ID', dataIndex: 'schoolId', key: 'schoolId' },
  { title: 'Webhook URL', dataIndex: 'webhookUrl', key: 'webhookUrl' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <span
        className={
          status === 'success'
            ? 'bg-green-100 text-green-700 px-2 py-1 rounded font-semibold'
            : 'bg-red-100 text-red-700 px-2 py-1 rounded font-semibold'
        }
      >
        {status}
      </span>
    ),
  },
  {
    title: 'Error',
    dataIndex: 'error',
    key: 'error',
    render: (err: string) => err || '-',
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (ts: string) => new Date(ts).toLocaleString(),
  },
];

const WebhookLogs = () => {
  const params = useParams();

  const schoolId = params.id as string;
  const { data: logs, isLoading } = useQuery({
    queryKey: ['webhookLogs', schoolId],
    queryFn: () => fetchWebhookLogs(schoolId),
  });

  return (
    <div className="max-w-6xl mx-auto mt-10 card border border-secondary">
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center tracking-wide drop-shadow">
        Webhook Event Logs
      </h1>

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={logs}
        rowKey="_id"
        pagination={false}
        scroll={{ x: 'max-content' }}
        className="border border-secondary rounded-xl"
      />
    </div>
  );
};

export default WebhookLogs;
