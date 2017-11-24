import request from '../utils/request'

export function login(params){
  return request(`/api/login`,{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify(params)
  })
}
