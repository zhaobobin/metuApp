import { DvaLoadingState } from 'dva-loading-ts';
import home, { HomeState } from './home';

const models = [home];

export type RootState = {
  loading: DvaLoadingState;
  home: HomeState;
};

export default models;
