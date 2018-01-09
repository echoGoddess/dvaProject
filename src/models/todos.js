
import * as todosService from '../services/todos';

export default {
  namespace: 'todos',
  state: {
    list: [],
    keyword: '', // 搜索关键字
    total: null,
    page: null,
  },
  reducers: {
    refresh(state, { payload: { data: list, total, page, pageSize, keyword } }) { // 更新数据列表
      return { ...state, list, total, page, pageSize, keyword };
    },
  },
  effects: {
    *fetch({ payload: { page, pageSize, keyword } }, { call, put }) {
      const { data, headers } = yield call(todosService.fetch, { page, pageSize, keyword });
      const payload = {
        data: data.dataMap,
        total: parseInt(headers['x-total-count'], 10),
        page: parseInt(page, 10),
        pageSize,
        keyword,
      };
      yield put({ type: 'refresh', payload });
    },
    *reload(action, { put, select }) {
      const { page, pageSize, keyword } = yield select(state => state.todos);
      yield put({ type: 'fetch', payload: { page, pageSize, keyword } });
    },
    *create({ payload: { company, code, website } }, { call, put }) {
      yield call(todosService.create, { company, code, website });
      yield put({ type: 'reload' });
    },
    *edite({ payload: { id, company, code, website } }, { call, put }) {
      yield call(todosService.edite, { id, company, code, website });
      yield put({ type: 'reload' });
    },
    *remove({ payload: { id } }, { call, put }) {
      yield call(todosService.remove, { id });
      yield put({ type: 'reload' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((path) => {
        if (path.pathname === '/todos') {
          const params = { page: 1, pageSize: 3, keyword: '' };
          dispatch({ type: 'fetch', payload: params });
        }
      });
    },
  },
};
