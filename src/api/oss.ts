import { Request } from '@/utils/index';

export const ossApi = {
  getOssToken: () => {
    return Request({
      url: '/oss/token',
      method: 'post'
    });
  }
};
