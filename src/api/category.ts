import { Request } from '@/utils/index';

export const categoryApi = {
  getCategory: () => {
    return Request({ url: '/category', method: 'get' });
  }
};
