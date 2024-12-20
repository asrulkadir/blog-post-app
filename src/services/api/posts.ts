import { api } from '@/services/config/axiosConfig';
import { IPost, IPostParams } from '@/types/post';

export const postService = {
  getAll: (params?: IPostParams) => api.get<IPost[]>('/posts', { params }),
  getById: (id: number | string) => api.get<IPost>(`/posts/${id}`),
  create: (data: Omit<IPost, 'id'>) => api.post<IPost>('/posts', data),
  update: (id: number, data: Partial<IPost>) =>
    api.put<IPost>(`/posts/${id}`, data),
  delete: (id: number) => api.delete(`/posts/${id}`),
};
