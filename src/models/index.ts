import { DvaLoadingState } from 'dva-loading-ts';
import home, { IHomeState } from './home';
import category, { ICategoryState } from './category';
import photo, { IPhotoState } from './photo';
import user, { IUserState } from './user';

const models = [home, category, photo, user];

export type RootState = {
  loading: DvaLoadingState;
  home: IHomeState;
  category: ICategoryState;
  photo: IPhotoState;
  user: IUserState;
};

export default models;
