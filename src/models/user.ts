import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { userApi } from '@/api/index';
import { IUserInfo } from '@/types/CommonTypes';
import { Toast } from '@/components/index';

export interface IUserState {
  userDetail: IUserInfo;
}

interface UserModel extends Model {
  namespace: string;
  state: IUserState;
  effects: {
    queryUserDetail: Effect;
    followUser: Effect;
  };
  reducers: {
    setState: Reducer<IUserState>;
  };
}

const userModel: UserModel = {
  namespace: 'user',

  state: {
    userDetail: {
      _id: '',
      type: '',
      level: 0,
      point: 0,
      status: 0,
      tags: [],
      following_number: 0,
      followers_number: 0,
      mobile: '',
      nickname: '',
      username: '',
      create_at: '',
      update_at: ''
    }
  },

  effects: {
    *queryUserDetail({ payload }, { call, put }) {
      const res = yield call(userApi.getUserDetail, {
        id: payload.id
      });
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            userDetail: res.data
          }
        });
      } else {
        Toast.info(res.message, 2);
      }
    },
    *followUser({ payload, callback }, { call }) {
      const res = yield call(userApi.followUser, payload);
      if (res.code === 0) {
        callback(res);
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
    }
  }
};

export default userModel;
