import { IAuthor } from '@/types/CommonTypes';
import { IPageInfo } from '@/types/CommonTypes';

export interface ICommentlist {
  list: IComment[];
  pageInfo: IPageInfo;
}

export interface IComment {
  _id: string;
  favor_number: number;
  status: number;
  content: string;
  author: IAuthor;
  photo_id: string;
  create_at: string;
  update_at: string;
}
