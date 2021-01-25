import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { circleApi } from '@/api/index';
import { ICircleItem } from '@/types/CircleTypes';
import { Toast } from '@/components/index';
import { IUserInfo } from '@/types/CommonTypes';

export interface ICircleState {
  circleList: ICircleItem[];
  circleDetail: ICircleItem | null;
  circleMembers: IUserInfo[];
}

interface CircleModel extends Model {
  namespace: string;
  state: ICircleState;
  effects: {
    queryCircleList: Effect;
    queryCircleDetail: Effect;
    queryCircleMembers: Effect;
    joinCircle: Effect;
    exitCircle: Effect;
  };
  reducers: {
    setState: Reducer<ICircleState>;
    clearCircleDetail: Reducer<ICircleState>;
  };
}

const initialState: ICircleState = {
  circleList: [],
  circleDetail: null,
  circleMembers: [],
};

const circleModel: CircleModel = {
  namespace: 'circle',

  state: initialState,

  effects: {
    *queryCircleList({ payload }, { call, put }) {
      const res = yield call(circleApi.getCircleList, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            circleList: res.data.list
          }
        });
      } else {
        Toast.info(res.message, 2);
      }
    },
    *queryCircleDetail({ payload }, { call, put }) {
      const res = yield call(circleApi.getCircleDetail, payload);
      console.log('CircleDetail', res)
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            circleDetail: res.data
          }
        });
      } else {
        Toast.info(res.message, 2);
      }
    },
    *queryCircleMembers({ payload }, { call, put }) {
      const res = yield call(circleApi.getCircleMembers, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            circleMembers: res.data
          }
        });
      } else {
        Toast.info(res.message, 2);
      }
    },
    *joinCircle({ payload }, { call, put }) {
      const res = yield call(circleApi.joinCircle, payload);
      console.log('joinCircle', res)
      if (res.code === 0) {

      } else {
        Toast.info(res.message, 2);
      }
    },
    *exitCircle({ payload }, { call, put }) {
      const res = yield call(circleApi.exitCircle, payload);
      console.log('exitCircle', res)
      if (res.code === 0) {

      } else {
        Toast.info(res.message, 2);
      }
    }
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    clearCircleDetail(state = initialState, _) {
      return {
        ...state,
        circleDetail: initialState.circleDetail
      };
    }
  }
};

export default circleModel;
