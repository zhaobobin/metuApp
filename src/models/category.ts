import { Model, Effect, SubscriptionsMapObject } from 'dva-core-ts';
import { Reducer } from 'redux';
import { categoryApi } from '@/api/index';

interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryState {
  myCategory: ICategory[]; // 我的分类
  categorys: ICategory[]; // 所有分类
}

interface HomeModel extends Model {
  namespace: string;
  state: ICategoryState;
  effects: {
    queryCategory: Effect;
  };
  reducers: {
    setState: Reducer<ICategoryState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const categoryModel: HomeModel = {
  namespace: 'category',

  state: {
    myCategory: [
      { id: 'home', name: '推荐' },
      { id: 'vip', name: 'Vip' }
    ],
    categorys: []
  },

  effects: {
    *queryCategory(_, { call, put }) {
      const res = yield call(categoryApi.getCategory);
      yield put({
        type: 'setState',
        payload: {
          carsouel: res.data
        }
      });
    }
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'queryCategory'
      });
    }
  }
};

export default categoryModel;
