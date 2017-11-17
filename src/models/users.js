import * as userService from '../services/users'

export default {
  namespace: 'users',
  state: {
    list:[],
    total:null,
    page:null
  },
  reducers: {//接收state和action，并返回新的state
    save(state,{payload:{data:list,total,page}}){
      return {...state,list,total,page}
    }
  },
  effects: {//处理异步逻辑，调用action,promise,fetch等
    *fetch({payload:{page}},{call,put}){
      const {data,headers}=yield call(userService.fetch,{page})//call:调用异步请求
      yield put({type:'save',payload:{
        data:data,
        total:parseInt(headers['x-total-count'],10),
        page:parseInt(page,10)
      }})//put:调用reducer-save
    },
    *remove({payload:id},{call,put,select}){
      yield call(userService.remove,id)
      yield put({type:'reload'})
    },
    *patch({payload:{id,values}},{call,put,select}){
      yield call(userService.patch,{id,values})
      yield put({type:'reload'})
    },
    *create({payload:values},{call,put}){
      yield call(userService.create,values)
      yield put({type:'reload'})
    },
    *reload(action,{put,select}){
      const page=yield select(state=>state.users.page)
      yield put({type:'fetch',payload:{page}})
    }
  },
  subscriptions: {//订阅 监听作用，相当于watch
    setup({dispatch,history}){
      return history.listen((path,query)=>{
        if(path.pathname==='/users'){
          const params={page:path.query?path.query.page:1}
          dispatch({type:'fetch',payload:params})
        }
      })
    }
  }
};
