import { Request } from '@/utils/index';

export const photoApi = {

  // 用户的图片列表
  getUserPhotos: (params: { user_id: string; page?: number; per_page?: number }) => {
    return Request({
      url: `/users/${params.user_id}/photos`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page
      }
    });
  },

  getPhotoDetail: (params: { id: string }) => {
    return Request({ url: `/photos/${params.id}`, method: 'get' });
  }
};
