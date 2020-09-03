import { Request } from '@/utils/index';

export const commentApi = {
  getCommentList: (params: {
    id: string;
    type: 'photos' | 'articles';
    page?: number;
    per_page?: number;
  }) => {
    return Request({
      url: `/${params.type}/${params.id}/comments`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page
      }
    });
  }
};
