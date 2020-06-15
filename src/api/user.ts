import { Request } from '@/utils/index';

export const userApi = {
  register: (params: any) => {
    return Request({
      url: '/user/register',
      method: 'post',
      params
    });
  },

  login: (params: any) => {
    return Request({
      url: '/user/login',
      method: 'post',
      params
    });
  },

  token: (params: any) => {
    return Request({
      url: '/user/token',
      method: 'post',
      params
    });
  },

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
