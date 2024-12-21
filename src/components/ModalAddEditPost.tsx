import { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { IPost } from '@/types/post';

interface ModalAddEditPostProps {
  visible: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: IPost) => void;
  postData?: Partial<IPost>;
  loading: boolean;
}

const ModalAddEditPost = ({
  visible,
  onClose,
  onSubmit,
  postData,
  loading,
}: ModalAddEditPostProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (postData) {
      form.setFieldsValue(postData);
    } else {
      form.resetFields();
    }
  }, [postData, form]);

  const handleFinish = (values: IPost) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={postData ? 'Edit Post' : 'Add New Post'}
      open={visible}
      onCancel={onClose}
      footer={null}
      className="rounded-lg"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4"
      >
        {!postData && (
          <Form.Item
            name="user_id"
            label="User ID"
            rules={[{ required: true, message: 'Please enter the user id' }]}
          >
            <Input placeholder="Enter user id" />
          </Form.Item>
        )}
        <Form.Item
          name="title"
          label="Post Title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>
        <Form.Item
          name="body"
          label="Post Body"
          rules={[{ required: true, message: 'Please enter the body' }]}
        >
          <Input.TextArea
            placeholder="Enter post body"
            rows={4}
            maxLength={500}
          />
        </Form.Item>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            {postData ? 'Update' : 'Add'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddEditPost;
