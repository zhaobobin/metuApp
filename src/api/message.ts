import { Request } from '@/utils/index';

type IType = 'favor' | 'comment' | 'follow' | 'collect' | 'mail' | 'notify';
interface IParams {
  type: IType;
  page?: number;
  per_page?: number;
}
export const messageApi = {
  getMessageList: (params: IParams) => {
    return Request({
      url: '/messages',
      method: 'get',
      params
    });
  }
};
