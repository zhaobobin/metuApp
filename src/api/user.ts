import { Request } from '@/utils/index';

export const userApi = {
  getUserDetail: (params: { id: string }) => {
    return Request({ url: `/users/${params.id}`, method: 'get' });
  }
};
