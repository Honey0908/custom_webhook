import { useQuery } from '@tanstack/react-query';
import { fetchAllStudents } from '../services/student';
import { Table } from 'antd';
import { useState } from 'react';
import StatusMessage from './StatusMessage';

const StudentList = () => {
  const [page, setPage] = useState(1);

  const {
    data: students,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['students', page],
    queryFn: () => fetchAllStudents(page),
  });

  const columns = [
    {
      title: <span className="text-primary">First Name</span>,
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: <span className="text-primary">Last Name</span>,
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: <span className="text-primary">Gender</span>,
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: <span className="text-primary">Phone Number</span>,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: <span className="text-primary">School ID</span>,
      dataIndex: 'schoolId',
      key: 'schoolId',
    },
    {
      title: <span className="text-primary">Address</span>,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: <span className="text-primary">City</span>,
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: <span className="text-primary">State</span>,
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: <span className="text-primary">Zip Code</span>,
      dataIndex: 'zipCode',
      key: 'zipCode',
    },
    {
      title: <span className="text-primary">Country</span>,
      dataIndex: 'country',
      key: 'country',
    },
  ];

  if (error) {
    return <StatusMessage type="error" message="Error fetching students" />;
  }

  return (
    <div className="table mx-auto max-w-full overflow-x-auto rounded-xl border border-secondary">
      <Table
        columns={columns}
        dataSource={students?.data}
        rowKey="id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: students?.pagination?.total,
          current: page,
          onChange: setPage,
        }}
        className="!rounded-xl !shadow-md !border-none min-w-[900px]"
      />
    </div>
  );
};

export default StudentList;
