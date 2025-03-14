import { useEffect, useState } from 'react';
import { Button, Form, FormProps, Input, message, Modal } from 'antd';
import Cookies from 'js-cookie';

type FieldType = {
  name?: string;
  token?: string;
};

interface IProps {
  reopen?: boolean;
}

const ModalWelcome = ({ reopen }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setIsModalOpen(true);
    }
  }, []);

  const handleOk = () => {
    form.submit();
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    Cookies.set('username', values.name ?? '', { expires: 7 });
    Cookies.set('token', values.token ?? '', { expires: 7 });
    message.success('Input success');
    form.resetFields();
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <Modal
      title={
        <p className="mb-4 text-center font-semibold">
          Welcome to Blog Post APP, please input your name and gorest API token
        </p>
      }
      open={isModalOpen || reopen}
      onOk={handleOk}
      closable={false}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Please input your name" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Token"
          name="token"
          rules={[{ required: true, message: 'Please input your token!' }]}
        >
          <Input placeholder="Please input your token" />
        </Form.Item>

        {reopen && (
          <Form.Item>
            <p className="text-center text-red-500">
              Please input your token again
            </p>
          </Form.Item>
        )}

        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalWelcome;
