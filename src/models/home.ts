import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';

export interface HomeState {
  num: number;
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  effects: {
    asyncAdd: Effect;
  };
  reducers: {
    add: Reducer<HomeState>;
  };
}

const initialState = {
  num: 0
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  effects: {
    *asyncAdd({payload}, {call, put}) {
      
    }
  },
  reducers: {
    add(state = initialState, { payload }) {
      return {
        ...state,
        num: state.num + payload.num
      };
    }
  }
};

export default homeModel;
