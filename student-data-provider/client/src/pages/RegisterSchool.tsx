import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { registerSchool } from '../services/schools';
import { showToast } from '../services/toast';

const RegisterSchool: React.FC = () => {
  const [form] = Form.useForm();
  const [oneTimeSecret, setOneTimeSecret] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: registerSchool,
    onSuccess: (res) => {
      showToast('success', 'Webhook registered successfully!');
      setOneTimeSecret(res.data.webhookSecret as string);
      form.resetFields();
    },
  });

  return (
    <div className="flex justify-center flex-col items-center bg-background min-h-[calc(100vh-4rem)]">
      {oneTimeSecret && (
        <div className="w-full max-w-md mx-auto mb-6">
          <label className="block font-bold text-primary mb-2 text-center">
            Webhook Secret (copy and store securely):
          </label>
          <div className="flex items-center gap-2">
            <Input
              value={oneTimeSecret}
              readOnly
              className="font-mono text-lg select-all bg-accent text-primary border border-secondary rounded-lg"
              style={{ flex: 1 }}
            />
            <Button
              type="default"
              className="bg-secondary text-white"
              onClick={() => {
                navigator.clipboard.writeText(oneTimeSecret);
              }}
            >
              Copy
            </Button>
          </div>
          <div className="text-xs mt-2 text-warning text-center">
            This secret is shown only once. Save it securely!
          </div>
        </div>
      )}
      <Card
        className="w-full max-w-md shadow-lg border border-accent"
        title={
          <span className="text-primary font-bold text-xl">
            Register School Webhook
          </span>
        }
      >
        <Form form={form} layout="vertical" onFinish={mutate}>
          <Form.Item
            label={<span className="text-primary">School ID</span>}
            name="schoolId"
            rules={[{ required: true, message: 'Please enter School ID' }]}
          >
            <Input placeholder="Enter School ID" className="border-secondary" />
          </Form.Item>
          <Form.Item
            label={<span className="text-primary">School Name</span>}
            name="schoolName"
            rules={[{ required: true, message: 'Please enter School Name' }]}
          >
            <Input
              placeholder="Enter School Name"
              className="border-secondary"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-primary">Webhook URL</span>}
            name="webhookUrl"
            rules={[
              {
                required: true,
                type: 'url',
                message: 'Please enter a valid URL',
              },
            ]}
          >
            <Input
              placeholder="https://your-school.com/webhook"
              className="border-secondary"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              block
              className="btn-primary"
            >
              Register Webhook
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterSchool;
