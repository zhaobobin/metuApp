import { DvaLoadingState } from 'dva-loading-ts';
import home, { IHomeState } from './home';
import category, { ICategoryState } from './category';
import photo, { IPhotoState } from './photo';
import user, { IUserState } from './user';
import account, { IAccountState } from './account';

const models = [home, category, photo, user, account];

export type RootState = {
  loading: DvaLoadingState;
  home: IHomeState;
  category: ICategoryState;
  photo: IPhotoState;
  user: IUserState;
  account: IAccountState;
};

export default models;
