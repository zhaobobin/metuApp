import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { photoApi } from '@/api/index';
import { IPhotoDetail } from '@/types/CommonTypes';

export interface IPhotoState {
  photoDetail: IPhotoDetail;
}

interface PhotoModel extends Model {
  namespace: string;
  state: IPhotoState;
  effects: {
    queryPhotoDetail: Effect;
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
