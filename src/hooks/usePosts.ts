import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/api/posts';
import { IPost, IPostParams } from '@/types/post';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const usePosts = (params?: IPostParams) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(Cookies.get('token') || null);
  }, []);

  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => postService.getAll(params),
    enabled: !!token,
  });
};

export const usePostById = (id: number | string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<IPost, 'id'>) => postService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IPost> }) =>
      postService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => postService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
