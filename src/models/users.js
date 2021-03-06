import * as userService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
    login: {},
  },
  reducers: {// 接收state和action，并返回新的state
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    saveLogin(state, { payload: data }) {
      return { ...state, login: data };
    },
  },
  effects: {// 处理异步逻辑，调用action,promise,fetch等
    *fetch({ payload: { page } }, { call, put }) {
      const { data, headers } = yield call(userService.fetch, { page });// call:调用异步请求
      yield put({
        type: 'save', payload: { data: data.dataMap, total: parseInt(headers['x-total-count'], 10), page: parseInt(page, 10) },
      });// put:调用reducer-save
    },
    *remove({ payload: id }, { call, put }) {
      yield call(userService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(userService.patch, { id, values });
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(userService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *login({ payload: params }, { call, put }) {
      const { data } = yield call(userService.login, params);
      yield put({ type: 'saveLogin', payload: data });
    },
  },
  subscriptions: {// 订阅 监听作用，相当于watch
    setup({ dispatch, history }) {
      return history.listen((path) => {
        if (path.pathname === '/users') {
          const params = { page: path.query ? path.query.page : 1 };
          dispatch({ type: 'fetch', payload: params });
        }
      });
    },
  },
};
