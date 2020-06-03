import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { RootState } from './index';
import { homeApi } from '@/api/index';
import { IPageInfo } from '@/types/CommonTypes';
import { IHomeState } from '@/types/home/IHomeState';

interface HomeModel extends Model {
  namespace: string;
  state: IHomeState;
  effects: {
    queryCarsouel: Effect;
    queryPopular: Effect;
    queryChannel: Effect;
  };
  reducers: {
    setState: Reducer<IHomeState>;
  };
}

const initialState = {
  carsouel: [],
  popular: [],
  channel: {
    list: [],
    pageInfo: {
      page: 1,
      per_page: 10,
      has_more: true
    }
  }
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  effects: {
    *queryCarsouel(_, { call, put }) {
      const res = yield call(homeApi.getHomeCarsouel);
      yield put({
        type: 'setState',
        payload: {
          carsouel: res.data
        }
      });
    },
    *queryPopular(_, { call, put }) {
      const res = yield call(homeApi.getPopularPhotos);
      yield put({
        type: 'setState',
        payload: {
          popular: res.data.list
        }
      });
    },
    *queryChannel({ payload }, { call, put, select }) {
      const { channel } = yield select((state: RootState) => state.home);
      const res = yield call(homeApi.getPhotosList, payload);
      let newList = res.data.list;
      const pageInfo: IPageInfo = {
        ...channel.pageInfo,
        has_more: newList.length === channel.pageInfo.per_page
      }
      if (payload && payload.loadMore) {
        pageInfo.page = channel.pageInfo.page + 1;
        newList = channel.list.concat(newList);
      }
      yield put({
        type: 'setState',
        payload: {
          channel: {
            list: newList,
            pageInfo
          }
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
