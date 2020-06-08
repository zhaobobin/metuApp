import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { RootState } from './index';
import { homeApi } from '@/api/index';
import { IPhoto } from '@/types/CommonTypes';
import { IChannel } from '@/types/home/HomeState';

export interface IHomeState {
  carsouel: IPhoto[];
  carsouelActiveIndex: number; // 当前轮播图下标
  gradientVisible: boolean; // 首页渐变色组件是否显示
  popular: IPhoto[];
  channel: IChannel;
}

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

const homeModel: HomeModel = {
  namespace: 'home',

  state: {
    carsouel: [],
    carsouelActiveIndex: 0,
    gradientVisible: true,
    popular: [],
    channel: {
      list: [],
      pageInfo: {
        page: 1,
        per_page: 10,
        count: 0,
        has_more: true
      }
    }
  },

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
    *queryChannel({ payload, callback }, { call, put, select }) {
      const { list, pageInfo } = yield select(
        (state: RootState) => state.home.channel
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pageInfo.page + 1;
      }
      const res = yield call(homeApi.getPhotosList, {
        page,
        per_page: pageInfo.per_page
      });
      let newList = res.data.list;
      if (payload && payload.loadMore) {
        newList = list.concat(newList);
      }
      yield put({
        type: 'setState',
        payload: {
          channel: {
            list: newList,
            pageInfo: {
              page,
              per_page: pageInfo.per_page,
              count: res.data.count,
              has_more: res.data.hasMore
            }
          }
        }
      });
      if (callback) {
        callback();
      }
    }
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};

export default homeModel;
