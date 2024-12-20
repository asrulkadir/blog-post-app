import { Button, Input, Layout, message } from 'antd';
import { useCreatePost, usePosts } from '@/hooks/usePosts';
import PostList from '@/components/PostList';
import ModalWelcome from '@/components/ModalWelcome';
import { useState } from 'react';
import ModalAddEditPost from '@/components/ModalAddEditPost';
import { IPost } from '@/types/post';
import Header from '@/components/Header';

const { Content } = Layout;
const { Search } = Input;

export default function Home() {
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: response, isLoading } = usePosts({ title: search });
  const { mutate: createPost, isPending } = useCreatePost();

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const handleSubmit = (data: IPost) => {
    createPost(data, {
      onSuccess: () => {
        message.success('Post created successfully');
        setIsModalVisible(false);
      },
      onError: () => {
        message.error('Failed to create post');
      },
    });
  };

  return (
    <Layout>
      <Header />
      <Content className="container mx-auto mt-4 min-h-screen p-4">
        <div className="mx-auto mb-4 flex flex-col gap-2 md:flex-row lg:w-1/2">
          <Button
            type="primary"
            size="large"
            onClick={() => setIsModalVisible(true)}
          >
            Add Post
          </Button>
          <Search
            placeholder="Search post..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <div>
          <PostList data={response?.data ?? []} loading={isLoading} />
        </div>
      </Content>
      <ModalAddEditPost
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        loading={isPending}
      />
      <ModalWelcome />
    </Layout>
  );
}
