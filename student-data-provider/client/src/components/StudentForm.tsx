import React from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { addStudent } from '../services/student';
import type { Student } from '../types/students';
import dayjs from 'dayjs';
import { showToast } from '../services/toast';

const { Option } = Select;

interface StudentFormProps {
  onStudentAdded?: () => void;
  schoolId?: string;
}

const StudentForm: React.FC<StudentFormProps> = ({
  onStudentAdded,
  schoolId,
}) => {
  const [form] = Form.useForm<Student>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: Student) => {
      const dateOfBirth =
        typeof values.dateOfBirth === 'object' && values.dateOfBirth
          ? dayjs(values.dateOfBirth).toISOString()
          : values.dateOfBirth;
      const payload = { ...values, dateOfBirth, schoolId: schoolId ?? '' };
      return addStudent(payload);
    },
    onSuccess: () => {
      showToast('success', 'Student added successfully!');
      onStudentAdded?.();
      form.resetFields();
    },
  });

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={mutate}
      validateTrigger={['onChange', 'onBlur']}
      className="space-y-4 bg-white p-6"
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label={
              <span className="text-primary font-semibold">First Name</span>
            }
            rules={[{ required: true, message: 'First name is required' }]}
          >
            <Input className="rounded-lg border-accent focus:border-primary focus:ring-primary" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label={
              <span className="text-primary font-semibold">Last Name</span>
            }
            rules={[{ required: true, message: 'Last name is required' }]}
          >
            <Input className="rounded-lg border-accent focus:border-primary focus:ring-primary" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dateOfBirth"
            label={
              <span className="text-primary font-semibold">Date of Birth</span>
            }
            rules={[{ required: true, message: 'Please select date of birth' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              className="rounded-lg border-accent focus:border-primary focus:ring-primary"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="gender"
            label={<span className="text-primary font-semibold">Gender</span>}
            rules={[{ required: true, message: 'Please select gender' }]}
          >
            <Select
              placeholder="Select Gender"
              allowClear
              className="rounded-lg border-accent focus:border-primary focus:ring-primary"
            >
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label={
              <span className="text-primary font-semibold">Phone Number</span>
            }
            rules={[{ required: true, message: 'Phone number is required' }]}
          >
            <Input
              inputMode="numeric"
              className="rounded-lg border-accent focus:border-primary focus:ring-primary"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="address"
            label={<span className="text-primary font-semibold">Address</span>}
            rules={[{ required: true, message: 'Address is required' }]}
          >
            <Input className="rounded-lg border-accent focus:border-primary focus:ring-primary" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="city"
            label={<span className="text-primary font-semibold">City</span>}
            rules={[{ required: true, message: 'City is required' }]}
          >
            <Input className="rounded-lg border-accent focus:border-primary focus:ring-primary" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="state"
            label={<span className="text-primary font-semibold">State</span>}
            rules={[{ required: true, message: 'State is required' }]}
          >
            <Input className="rounded-lg border-accent focus:border-primary focus:ring-primary" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="zipCode"
            label={<span className="text-primary font-semibold">Zip Code</span>}
            rules={[{ required: true, message: 'Zip code is required' }]}
          >
            <Input className="rounded-lg border-accent focus:border-primary focus:ring-primary" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="country"
            label={<span className="text-primary font-semibold">Country</span>}
            rules={[{ required: true, message: 'Country is required' }]}
          >
            <Input className="rounded-lg border-accent focus:border-primary focus:ring-primary" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-primary mt-4"
          loading={isPending}
          block
        >
          Add Student
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StudentForm;
