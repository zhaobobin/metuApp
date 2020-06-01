import { Request } from '@/utils/index';

export const homeApi = {
  getHomeCarsouel: () => {
    return Request('/carsouel', { method: 'get' });
  },

  getPopularPhotos: () => {
    return Request('/photos', {
      method: 'get',
      params: {
        category: 'popular',
        page: 1,
        per_page: 9
      }
    });
  }
};
