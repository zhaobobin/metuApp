import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { Request } from '@/utils/index';
import { ICarsouel } from '@/types/home/IHomeState';
import api from '@/api/index';

export interface HomeState {
  carsouel: ICarsouel[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  effects: {
    queryCarsouel: Effect;
  };
  reducers: {
    setState: Reducer<HomeState>;
  };
}

const initialState = {
  carsouel: []
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  effects: {
    *queryCarsouel({ payload }, { call, put }) {
      const res = yield call(params => {
        return Request(api.getHomeCarsouel, { method: 'GET', body: params });
      }, payload);
      yield put({
        type: 'setState',
        payload: {
          carsouel: res.data
        }
      });
    }
  },
  reducers: {
    setState(state = initialState, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};

export default homeModel;
