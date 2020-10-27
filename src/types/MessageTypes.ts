import { IAuthor, IPageInfo, IPhoto, IArticle } from '@/types/CommonTypes';
import { IComment } from '@/types/CommentTypes';
import { ITopic } from '@/types/TopicTypes';
import { IQuestion } from '@/types/QuestionTypes';
import { IAnswer } from '@/types/AnswerTypes';

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
  send_from: IAuthor;
  send_to: IAuthor;
  create_at: string;
  update_at: string;
  article?: IArticle;
  photo?: IPhoto;
  comment?: IComment;
  topic?: ITopic;
  question?: IQuestion;
  answer?: IAnswer;
}