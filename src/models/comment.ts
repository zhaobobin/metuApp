import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';
import { commentApi } from '@/api/index';
import { Toast } from '@/components/index';
import { ICommentlist } from '@/types/comment/CommentState';
import { RootState } from './index';

export interface ICommentState {
  commentList: ICommentlist;
}

interface CommentModel extends Model {
  namespace: string;
  state: ICommentState;
  effects: {
    queryCommentList: Effect;
  };
  reducers: {
    setState: Reducer<ICommentState>;
  };
}

const commentModel: CommentModel = {
  namespace: 'comment',

  state: {
    commentList: {
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
    *queryCommentList({ payload, callback }, { call, put, select }) {
      const { list, pageInfo } = yield select(
        (state: RootState) => state.comment.commentList
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pageInfo.page + 1;
      }
      const res = yield call(commentApi.getCommentList, {
        id: payload.id,
        type: payload.type,
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
          commentList: {
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

export default commentModel;
