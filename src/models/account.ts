import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { userApi } from '@/api/index';
import { IUserInfo } from '@/types/CommonTypes';
import { ENV, Storage } from '@/utils/index';
import { Toast } from '@/components/index';
import { RootState } from './index';

export interface IAccountState {
  isAuth: boolean; // 登录状态
  currentUser: IUserInfo;
}

interface UserModel extends Model {
  namespace: string;
  state: IAccountState;
  effects: {
    register: Effect;
    login: Effect;
    token: Effect;
    smscode: Effect;
    logout: Effect;
    queryAccountDetail: Effect;
    updateAvatar: Effect;
    updateCover: Effect;
    changeProfile: Effect;
    changeMobile: Effect;
    changePsd: Effect;
    resetPsd: Effect;
  };
  reducers: {
    setState: Reducer<IAccountState>;
  };
}

const userModel: UserModel = {
  namespace: 'account',

  state: {
    isAuth: false,
    currentUser: {
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
    *register({ payload, callback }, { call, put }) {
      const res = yield call(userApi.register, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            isAuth: true,
            currentUser: res.data.detail
          }
        });
        Storage.set(ENV.storage.token, res.data.token); //保存token
      }
      yield callback(res);
    },

    *login({ payload, callback }, { call, put }) {
      const res = yield call(userApi.login, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            isAuth: true,
            currentUser: res.data.detail
          }
        });
        Storage.set(ENV.storage.lastTel, payload.mobile); //保存token
        Storage.set(ENV.storage.token, res.data.token); //保存token
      }
      yield callback(res);
    },

    *token({ payload, callback }, { call, put }) {
      const token = yield Storage.get(ENV.storage.token);

      if (token) {
        const res = yield call(userApi.token, payload);
        if (res.code === 0) {
          yield put({
            type: 'setState',
            payload: {
              isAuth: true,
              currentUser: res.data
            }
          });
        }
        callback(res);
      } else {
        yield put({
          type: 'setState',
          payload: {
            isAuth: false,
            currentUser: ''
          }
        });
      }
    },

    *smscode({ payload, callback }, { call }) {
      const res = yield call(userApi.smscode, payload);
      yield callback(res);
    },

    *logout(_, { put }) {
      yield Storage.remove(ENV.storage.token);
      yield put({
        type: 'setState',
        payload: {
          isAuth: false,
          currentUser: ''
        }
      });
    },

    *queryAccountDetail({ payload }, { call, put }) {
      const res = yield call(userApi.getUserDetail, {
        id: payload.id
      });
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: res.data
          }
        });
      } else {
        Toast.show(res.messge);
      }
    },

    *updateAvatar({ payload }, { call, put, select }) {
      const { currentUser } = yield select((state: RootState) => state.account);
      const res = yield call(userApi.updateAvatar, {
        url: payload.url
      });
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: Object.assign(currentUser, res.data)
          }
        });
      } else {
        Toast.show(res.messge);
      }
    },

    *updateCover({ payload }, { call, put, select }) {
      const { currentUser } = yield select((state: RootState) => state.account);
      const res = yield call(userApi.updateCover, {
        url: payload.url
      });
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: Object.assign(currentUser, res.data)
          }
        });
      } else {
        Toast.show(res.messge);
      }
    },

    *changeProfile({ payload, callback }, { call, put, select }) {
      const { currentUser } = yield select((state: RootState) => state.account);
      const res = yield call(userApi.changeProfile, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: Object.assign(currentUser, res.data)
          }
        });
      } else {
        Toast.show(res.messge);
      }
      callback(res);
    },

    *changeMobile({ payload, callback }, { call }) {
      const res = yield call(userApi.changeMobile, payload);
      if (res.code === 0) {
      } else {
        Toast.show(res.messge);
      }
      callback(res);
    },

    *changePsd({ payload, callback }, { call }) {
      const res = yield call(userApi.changePsd, payload);
      if (res.code === 0) {
      } else {
        Toast.show(res.messge);
      }
      callback(res);
    },

    *resetPsd({ payload, callback }, { call }) {
      const res = yield call(userApi.changePsd, payload);
      if (res.code === 0) {
      } else {
        Toast.show(res.messge);
      }
      callback(res);
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
