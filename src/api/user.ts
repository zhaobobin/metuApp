import { Request } from '@/utils/index';

export const userApi = {
  getUserDetail: (params: { id: string; include?: string }) => {
    return Request({
      url: `/users/${params.id}`,
      method: 'get',
      params: {
        include: params.include
      }
    });
  }
};
