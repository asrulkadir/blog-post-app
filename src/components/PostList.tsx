import { IPost } from '@/types/post';
import { List, Card, Tooltip, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { truncateText } from '@/utils/helpers/truncateText';
import Link from 'next/link';
import { useDeletePost, useUpdatePost } from '@/hooks/usePosts';
import ModalAddEditPost from './ModalAddEditPost';
import { useState } from 'react';

interface IPostList {
  data: IPost[];
}

const PostList = ({ data }: IPostList) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPostData, setEditPostData] = useState<IPost | null>(null);
  const { mutate: deletePost } = useDeletePost();
  const { mutate: updatePost, isPending } = useUpdatePost();

  const handleDelete = (id: number) => {
    deletePost(id, {
      onSuccess: () => {
        message.success('Post deleted successfully');
      },
      onError: () => {
        message.error('Failed to delete post');
      },
    });
  };

  const handleOpenModal = (post?: IPost) => {
    setEditPostData(post ?? null);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (data: { title: string; body: string }) => {
    updatePost(
      { id: editPostData?.id ?? 0, data },
      {
        onSuccess: () => {
          message.success('Post updated successfully');
          handleCloseModal();
        },
        onError: () => {
          message.error('Failed to update post');
        },
      },
    );
  };
  return (
    <div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.title}
              className="flex h-64 flex-col justify-between shadow-lg"
              actions={[
                <Tooltip title="View" key="view">
                  <Link href={`/${item.id}`}>
                    <EyeOutlined className="text-blue-500" />
                  </Link>
                </Tooltip>,
                <Tooltip title="Edit" key="edit" zIndex={100}>
                  <EditOutlined
                    className="text-green-500"
                    onClick={() => handleOpenModal(item)}
                  />
                </Tooltip>,
                <Tooltip title="Delete" key="delete">
                  <Popconfirm
                    title="Delete post"
                    description="Are you sure to delete this post?"
                    onConfirm={() => handleDelete(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined className="text-red-500" />
                  </Popconfirm>
                </Tooltip>,
              ]}
            >
              <p>{truncateText(item.body, 100)}</p>
            </Card>
          </List.Item>
        )}
      />
      <ModalAddEditPost
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        postData={editPostData || undefined}
        loading={isPending}
      />
    </div>
  );
};

export default PostList;
