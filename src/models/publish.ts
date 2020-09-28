import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { articleApi, photoApi } from '@/api/index';
import { Toast } from '@/components/index';
import { IPhoto, IImagePickerResponse } from '@/types/CommonTypes';
import { IPublishType, IPhotoPublishForm, IArticlePublishForm } from '@/types/publish/PublishState';

export interface IPublishState {
  modalVisible: boolean;
  publishType: IPublishType;
  photoFormValues: IPhotoPublishForm;
  photoPickerImages: IImagePickerResponse[]; // 选择相册图片 暂存
  articleFormValues: IArticlePublishForm;
  formValidate: boolean; // 表单校验通过
}

interface PublishModel extends Model {
  namespace: string;
  state: IPublishState;
  effects: {
    publishPhoto: Effect;
    publishArticle: Effect;
  };
  reducers: {
    setState: Reducer<IPublishState>;
    savePhotoPublishForm: Reducer<IPublishState>;
    saveArticlePublishForm: Reducer<IPublishState>;
  };
}

export const initialState = {
  modalVisible: true,
  publishType: null,
  photoFormValues: {
    title: '',
    description: '',
    tags: '',
    images: []
  },
  photoPickerImages: [],
  articleFormValues: {
    title: '',
    description: '',
    tags: '',
    content: ''
  },
  formValidate: false
}

const publishModel: PublishModel = {
  namespace: 'publish',

  state: initialState,

  effects: {
    *publishPhoto({ payload, callback }, { call }) {
      const res = yield call(photoApi.createPhoto, payload);
      callback(res);
    },
    *publishArticle({ payload, callback }, { call }) {
      const res = yield call(articleApi.createArticle, payload);
      callback(res);
    }
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    savePhotoPublishForm(state = initialState, { payload }) {
      return {
        ...state,
        photoPublishForm: {
          ...state.photoFormValues,
          ...payload
        }
      };
    },
    saveArticlePublishForm(state = initialState, { payload }) {
      return {
        ...state,
        articlePublishForm: {
          ...state.articleFormValues,
          ...payload
        }
      };
    }
  }
};

export default publishModel;
