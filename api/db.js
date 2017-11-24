const Mock=require('mockjs')
const Random=Mock.Random

module.exports=function(){
  const data={users:[],news:[],login:{}}
  const names=[1,2,3,4].map((item)=>Random.cname(item,item+1))
  for(let i=0,len=5;i<len;i++){
    let name=names[Random.integer(1,3)]
    data.users.push({
      id:i,
      name:name,
      password:111,
      email:Random.email(),
      website:Random.url()
    })
  }

  /*for (var i = 0; i < 10; i++) {
    var content = Random.cparagraph(0,10);
    data.news.push({
      id: i,
      title: Random.cword(8,20),
      desc: content.substr(0,40),
      tag: Random.cword(2,6),
      views: Random.integer(100,5000),
      images: images.slice(0,Random.integer(1,3))
    })
  }*/

  return data
}
