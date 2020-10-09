import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { articleApi } from '@/api/index';
import { IArticleDetail } from '@/types/CommonTypes';
import { Toast } from '@/components/index';

export interface IArticleState {
  articleDetail: IArticleDetail;
}

interface ArticleModel extends Model {
  namespace: string;
  state: IArticleState;
  effects: {
    queryArticleDetail: Effect;
    queryArticleState: Effect;
    favorArticle: Effect;
    collectArticle: Effect;
    nextArticle: Effect;
  };
  reducers: {
    setState: Reducer<IArticleState>;
    updateArticleDetail: Reducer<IArticleState>;
  };
}

const initialState: IArticleState = {
  articleDetail: {
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
    content: '',
    view_number: 0,
    favor_number: 0,
    collect_number: 0,
    comment_number: 0,
    editor: 0,
    status: 0,
    create_at: '',
    update_at: ''
  }
};

const articleModel: ArticleModel = {
  namespace: 'article',

  state: initialState,

  effects: {
    *queryArticleDetail({ payload }, { call, put }) {
      const res = yield call(articleApi.getArticleDetail, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            articleDetail: res.data
          }
        });
      } else {
        Toast.info(res.message, 2);
      }
    },
    *queryArticleState({ payload }, { call, put }) {
      const res = yield call(articleApi.getArticleState, payload);
      if (res.code === 0) {
        yield put({
          type: 'updateArticleDetail',
          payload: res.data
        });
      } else {
        Toast.info(res.message, 2);
      }
    },
    *favorArticle({ payload }, { call, put }) {
      const res = yield call(articleApi.favorArticle, payload);
      console.log(res)
      if (res.code === 0) {
        yield put({
          type: 'updateArticleDetail',
          payload: res.data
        });
      } else {
        Toast.info(res.message, 2);
      }
    },
    *collectArticle({ payload }, { call, put }) {
      const res = yield call(articleApi.collectArticle, payload);
      if (res.code === 0) {
        yield put({
          type: 'updateArticleDetail',
          payload: res.data
        });
      } else {
        Toast.info(res.message, 2);
      }
    },
    *nextArticle({ payload }, { call, put }) {
      const res = yield call(articleApi.getNextArticle, payload);
      if (res.code === 0) {
        yield put({
          type: 'setState',
          payload: {
            articleDetail: res.data
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
    },
    updateArticleDetail(state = initialState, { payload }) {
      return {
        ...state,
        articleDetail: {
          ...state.articleDetail,
          ...payload
        }
      };
    }
  }
};

export default articleModel;
