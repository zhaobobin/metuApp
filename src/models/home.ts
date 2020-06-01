import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { IPhoto } from '@/types/photo/IPhoto';
import { homeApi } from '@/api/index';

export interface HomeState {
  carsouel: IPhoto[];
  popular: IPhoto[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  effects: {
    queryCarsouel: Effect;
    queryPopular: Effect;
  };
  reducers: {
    setState: Reducer<HomeState>;
  };
}

const initialState = {
  carsouel: [],
  popular: []
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  effects: {
    *queryCarsouel({ payload }, { call, put }) {
      const res = yield call(homeApi.getHomeCarsouel, payload);
      yield put({
        type: 'setState',
        payload: {
          carsouel: res.data
        }
      });
    },
    *queryPopular({ payload }, { call, put }) {
      const res = yield call(homeApi.getPopularPhotos, payload);
      yield put({
        type: 'setState',
        payload: {
          popular: res.data.list
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
