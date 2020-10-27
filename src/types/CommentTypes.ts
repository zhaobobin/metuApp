import { IAuthor, IPageInfo } from '@/types/CommonTypes';

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
  reply_to?: IAuthor;
  photo_id: string;
  create_at: string;
  update_at: string;
  favoring_state?: boolean;
  collect_state?: boolean;
}

export interface ICommentModalResult {
  content: string;
  root_comment?: IComment;
}
