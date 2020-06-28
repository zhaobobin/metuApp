import { Model, Effect, SubscriptionsMapObject } from 'dva-core-ts';
import { Reducer } from 'redux';
import { ENV, Storage } from '@/utils/index';
import { RootState } from './index';

const CATEGORYS = [
  { id: '01', name: '人像', classify: '题材' },
  { id: '02', name: '动物', classify: '题材' },
  { id: '03', name: '纪实', classify: '题材' },
  { id: '04', name: '静物', classify: '题材' },
  { id: '05', name: '风光', classify: '题材' },
  { id: '06', name: '旅行', classify: '题材' },
  { id: '07', name: '建筑', classify: '题材' },
  { id: '08', name: '街拍', classify: '题材' },
  { id: '09', name: '美女', classify: '题材' },

  { id: '10', name: '创意', classify: '风格' },
  { id: '11', name: '后期', classify: '风格' },
  { id: '12', name: '微距', classify: '风格' },
  { id: '13', name: '黑白', classify: '风格' },
  { id: '14', name: '色彩', classify: '风格' },
  { id: '15', name: '日系', classify: '风格' },
  { id: '16', name: '情绪', classify: '风格' },
  { id: '17', name: '小清新', classify: '风格' },
  { id: '18', name: '极简', classify: '风格' },

  { id: '19', name: '手机', classify: '器材' },
  { id: '20', name: '广角', classify: '器材' },
  { id: '21', name: '佳能', classify: '器材' },
  { id: '22', name: '尼康', classify: '器材' },
  { id: '23', name: '富士', classify: '器材' },
  { id: '24', name: '索尼', classify: '器材' },
  { id: '25', name: '徕卡', classify: '器材' },
  { id: '26', name: '胶片', classify: '器材' },
  { id: '27', name: '35mm', classify: '器材' },
  { id: '28', name: '50mm', classify: '器材' },
  { id: '29', name: '85mm', classify: '器材' },
  { id: '30', name: '100mm', classify: '器材' }
];
export interface ICategory {
  id: string;
  name: string;
  classify?: string; // 分类
  disabled?: boolean;
  component?: any;
}

export interface ICategoryState {
  isEdit: boolean;
  myCategory: ICategory[]; // 我的分类
  categorys: ICategory[]; // 所有分类
}

interface CategoryModel extends Model {
  namespace: string;
  state: ICategoryState;
  effects: {
    queryCategory: Effect;
    toggleButton: Effect;
  };
  reducers: {
    setState: Reducer<ICategoryState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const categoryModel: CategoryModel = {
  namespace: 'category',

  state: {
    isEdit: false,
    myCategory: [
      { id: 'following', name: '关注' },
      { id: 'editor', name: '推荐' },
      { id: 'popular', name: '热门' }
    ],
    categorys: []
  },

  effects: {
    *queryCategory(_, { call, put }) {
      const myCategory = yield Storage.get(ENV.storage.myCategory);
      let categorys = yield Storage.get(ENV.storage.categorys);
      if (!categorys) {
        categorys = CATEGORYS;
      }
      if (myCategory) {
        yield put({
          type: 'setState',
          payload: {
            myCategory,
            categorys
          }
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            categorys
          }
        });
      }
    },
    *toggleButton({ payload }, { put, select }) {
      const { isEdit } = yield select((state: RootState) => state.category);
      yield put({
        type: 'setState',
        payload: {
          isEdit: !isEdit,
          myCategory: payload.myCategory
        }
      });
      if (isEdit) {
        Storage.set(ENV.storage.myCategory, payload.myCategory)
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
  },

  subscriptions: {
    loadData({ dispatch }) {
      dispatch({
        type: 'queryCategory'
      });
    }
  }
};

export default categoryModel;
