import { Request } from '@/utils/index';
import { ICircleValues } from '@/types/CircleTypes';

export const circleApi = {
  // 圈子列表
  getCircleList: (params: {
    page?: number;
    per_page?: number;
  }) => {
    return Request({
      url: `/circles`,
      method: 'get',
      params: {
        page: params.page,
        per_page: params.per_page
      }
    });
  },

  // 圈子详情
  getCircleDetail: (params: { circle_id: string }) => {
    return Request({ url: `/circle/${params.circle_id}`, method: 'get' });
  },

  // 圈子成员
  getCircleMembers: (params: { circle_id: string }) => {
    return Request({ url: `/circle/${params.circle_id}/members`, method: 'get' });
  },

  // 创建圈子
  createCircle: (params: ICircleValues) => {
    return Request({
      url: '/circles',
      method: 'post',
      params
    });
  },

  // 加入圈子
  joinCircle: (params: { circle_id: string }) => {
    return Request({
      url: `/circles/join/${params.circle_id}`,
      method: 'put'
    });
  },

  // 退出圈子
  exitCircle: (params: { circle_id: string }) => {
    return Request({
      url: `/circles/join/${params.circle_id}`,
      method: 'delete'
    });
  },

};
