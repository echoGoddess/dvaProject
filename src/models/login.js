import * as LoginService from '../services/login'

export default{
  namespace:'login',
  state:{
    name:'',
    password:''
  },
  reducers:{
    save(state,{payload:{name,password}}){
      return {...state,name,password}
    }
  },
  effects:{
    *login({payload:{params}},{call,put}){
      const para=yield put(LoginService.login,{params})
      yield call({type:'save',payload:{...para}})
    }
  },
  subscriptions:{
    setup({dispatch,history}){
      history.listen((pathname)=>{
        if(pathname==='/login'){
          console.log('subscriptions-login')
        }
      })
    }
  }
}
