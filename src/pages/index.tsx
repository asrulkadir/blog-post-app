import { Button, Input, Layout, message, Spin } from 'antd';
import { useCreatePost, usePosts } from '@/hooks/usePosts';
import PostList from '@/components/PostList';
import ModalWelcome from '@/components/ModalWelcome';
import { useEffect, useState } from 'react';
import ModalAddEditPost from '@/components/ModalAddEditPost';
import { IPost } from '@/types/post';
import Header from '@/components/Header';
import { useInView } from 'react-intersection-observer';

const { Content } = Layout;
const { Search } = Input;

export default function Home() {
  const { ref, inView } = useInView();
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: response,
    fetchNextPage,
    isFetchingNextPage,
    isPending: isLoading,
    isError,
    error,
  } = usePosts({
    title: search,
    per_page: 20,
  });
  const { mutate: createPost, isPending } = useCreatePost();

  useEffect(() => {
    if (isError) {
      message.error(
        (error as any)?.response?.data?.message ?? 'Failed to fetch data',
      );
    }
  }, [error, isError]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
          <div className="flex justify-center">{isLoading && <Spin />}</div>
          {response?.pages.map((page, index) => (
            <div key={index}>
              <PostList data={page.data} />
            </div>
          ))}
          <div ref={ref} className="flex justify-center">
            {isFetchingNextPage && <Spin />}
          </div>
        </div>
      </Content>
      <ModalAddEditPost
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        loading={isPending}
      />
      <ModalWelcome reopen={isError} />
    </Layout>
  );
}
