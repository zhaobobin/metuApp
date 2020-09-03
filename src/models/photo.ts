import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { photoApi } from '@/api/index';
import { IPhotoDetail } from '@/types/CommonTypes';
import { Toast } from '@/components/index';

export interface IPhotoState {
  photoDetail: IPhotoDetail;
}

interface PhotoModel extends Model {
  namespace: string;
  state: IPhotoState;
  effects: {
    queryPhotoDetail: Effect;
    favorPhoto: Effect;
    collectPhoto: Effect;
    nextPhoto: Effect;
  };
  reducers: {
    setState: Reducer<IPhotoState>;
  };
}

const photoModel: PhotoModel = {
  namespace: 'photo',

  state: {
    photoDetail: {
      _id: '',
      title: '',
      thumb: {
        url: '',
        width: 0,
        height: 0
      },
      author: {
        _id: '',
        type: '',
        level: 0,
        point: 0,
        status: 0,
        tags: [],
        nickname: '',
        username: '',
        create_at: '',
        update_at: ''
      },
      images: [],
      view_number: 0,
      favor_number: 0,
      collect_number: 0,
      comment_number: 0,
      editor: 0,
      status: 0,
      create_at: '',
      update_at: ''
    }
  },

  effects: {
    *queryPhotoDetail({ payload }, { call, put }) {
      const res = yield call(photoApi.getPhotoDetail, {
        id: payload.id
      });
      yield put({
        type: 'setState',
        payload: {
          photoDetail: res.data
        }
      });
    },
    *favorPhoto({ payload, callback }, { call }) {
      const res = yield call(photoApi.favorPhoto, payload);
      if (res.code === 0) {
        callback(res);
      } else {
        Toast.info(res.message, 2);
      }
    },
    *collectPhoto({ payload, callback }, { call }) {
      const res = yield call(photoApi.collectPhoto, payload);
      if (res.code === 0) {
        callback(res);
      } else {
        Toast.info(res.message, 2);
      }
    },
    *nextPhoto({ payload }, { call, put }) {
      const res = yield call(photoApi.getNextPhoto, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            photoDetail: res.data
          }
        });
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

export default photoModel;
