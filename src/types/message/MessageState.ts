import { IPageInfo } from '@/types/CommonTypes';

export interface IMessage {
  list: IMessageItem[];
  pageInfo: IPageInfo;
}

// 消息
export interface IMessageItem {
  readed: number;
  status: number;
  _id: string;
  type: string;
  content: string;
  send_from: {
    _id: string;
    type: string;
    level: number;
    point: number;
    status: number;
    nickname: string;
    username: string;
    create_at: string;
    update_at: string;
  };
  send_to: string;
  create_at: string;
  update_at: string;
}