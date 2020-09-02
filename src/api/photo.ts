import { Request } from '@/utils/index';

export const photoApi = {
  // 用户的图片列表
  getUserPhotos: (params: {
    user_id: string;
    page?: number;
    per_page?: number;
  }) => {
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
  },

  // 点赞图片、取消点赞
  favorPhoto: (params: { photo_id: string, favoring_state: boolean }) => {
    const method = params.favoring_state ? 'delete' : 'put';
    return Request({ url: `/photos/favoring/${params.photo_id}`, method });
  },

  // 收藏图片、取消收藏
  collectPhoto: (params: { photo_id: string, collecting_state: boolean }) => {
    const method = params.collecting_state ? 'delete' : 'put';
    return Request({ url: `/photos/collecting/${params.photo_id}`, method });
  },

  // 分享图片
  sharePhoto: (params: { photo_id: string }) => {
    return Request({ url: `/photos/shareing/${params.photo_id}`, method: 'put' });
  }


};
