import { Request } from '@/utils/index';

export const userApi = {
  register: (params: {
    mobile: string;
    nickname: string;
    password: string;
    smscode: string;
  }) => {
    return Request({
      url: '/user/register',
      method: 'post',
      params
    });
  },

  login: (params: { mobile: string; smscode?: string; password?: string }) => {
    return Request({
      url: '/user/login',
      method: 'post',
      params
    });
  },

  token: (params: { token: string }) => {
    return Request({
      url: '/user/token',
      method: 'post',
      params
    });
  },

  smscode: (params: { type: string, mobile: string }) => {
    return Request({
      url: '/user/smscode',
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
  },

  updateAvatar: (params: { url: string }) => {
    return Request({
      url: '/user/avatar',
      method: 'post',
      params: {
        avatar_url: params.url
      }
    });
  },

  updateCover: (params: { url: string }) => {
    return Request({
      url: '/user/cover',
      method: 'post',
      params: {
        cover_url: params.url
      }
    });
  }
};
