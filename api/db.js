module.exports=function(){
  const data={users:[]}
  for(let i=0,len=5;i<len;i++){
    data.users.push({id:i,name:'wyy'+i})
  }
  return data
}
