import React from 'react';
import { Table, Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchStudents } from '../services/api';

const columns = [
  { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
  { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
  { title: 'Gender', dataIndex: 'gender', key: 'gender' },
  { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'City', dataIndex: 'city', key: 'city' },
  { title: 'State', dataIndex: 'state', key: 'state' },
  { title: 'Zip Code', dataIndex: 'zipCode', key: 'zipCode' },
  { title: 'Country', dataIndex: 'country', key: 'country' },
];

const StudentList: React.FC = () => {
  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });

  if (isLoading)
    return (
      <Spin
        size="large"
        tip="Loading students..."
        className="block mx-auto my-8"
      />
    );
  if (error)
    return (
      <Alert message="Error fetching students" type="error" className="my-8" />
    );

  return (
    <div className="table mx-auto">
      <Table
        columns={columns}
        dataSource={students}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
        rowKey="id"
        className="border border-secondary rounded-xl"
      />
    </div>
  );
};

export default StudentList;
