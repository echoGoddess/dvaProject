const Mock=require('mockjs')
const Random=Mock.Random

module.exports=function(){
  const data={users:[]}
  const names=[1,2,3,4].map((item)=>Random.cname(item,item+1))
  for(let i=0,len=5;i<len;i++){
    let name=names[Random.integer(1,3)]
    data.users.push({
      id:i,
      name:name,
      email:Random.email(),
      website:Random.url()
    })
  }
  return data
}
