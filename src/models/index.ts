import { DvaLoadingState } from 'dva-loading-ts';
import home, { IHomeState } from './home';
import category, { ICategoryState } from './category';
import article, { IArticleState } from './article';
import photo, { IPhotoState } from './photo';
import user, { IUserState } from './user';
import account, { IAccountState } from './account';
import comment, { ICommentState } from './comment';
import message, { IMessageState } from './message';
import oss, { IOssState } from './oss';
import publish, { IPublishState } from './publish';

const models = [home, category, article, photo, user, account, comment, message, oss, publish];

export type RootState = {
  loading: DvaLoadingState;
  home: IHomeState;
  category: ICategoryState;
  article: IArticleState;
  photo: IPhotoState;
  user: IUserState;
  account: IAccountState;
  comment: ICommentState;
  message: IMessageState;
  oss: IOssState;
  publish: IPublishState;
};

export default models;
