import { usePostById } from '@/hooks/usePosts';
import { Button, Card, Layout, Typography } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

const { Content } = Layout;

const { Title, Paragraph } = Typography;

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: post, isLoading } = usePostById(id as string);

  return (
    <Layout>
      <Header />
      <Content className="container mx-auto mt-4 min-h-screen p-4">
        <div className="mb-4 flex">
          <Button type="primary" onClick={() => router.push('/')}>
            <CaretLeftOutlined /> Back
          </Button>
        </div>
        <Card
          className="mx-auto w-full max-w-2xl rounded-lg shadow-lg"
          loading={isLoading}
        >
          <Title level={3} className="mb-4 text-center">
            {post?.data.title}
          </Title>
          <Paragraph className="text-gray-600">{post?.data.body}</Paragraph>
          <Paragraph className="mt-4 text-right text-sm text-gray-400">
            User ID: {post?.data.user_id}
          </Paragraph>
        </Card>
      </Content>
    </Layout>
  );
};

export default PostDetail;
