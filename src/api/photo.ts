import { Request } from '@/utils/index';

export const photoApi = {
  getPhotoDetail: (params: { id: string }) => {
    return Request({ url: `/photos/${params.id}`, method: 'get' });
  }
};
