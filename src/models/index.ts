import { DvaLoadingState } from 'dva-loading-ts';
import home, { IHomeState } from './home';

const models = [home];

export type RootState = {
  loading: DvaLoadingState;
  home: IHomeState;
};

export default models;
