function useServer(){
  const mocks=['users']
  this.apply=function(server,jsonServer,path){
    mocks.map((item)=>{
      const router=jsonServer.router(require(path.join(__dirname, item)))
      //router.render=this.render
      server.use(router)
    })
  }

  this.render=function(req, res){
    try{
      if(res.statusCode===200){
        res.jsonp({
        body:res.locals.data
         })
      }
    }catch(e){
      res.jsonp({
        error:'"error message here'
      })
    }
  }
}
module.exports=useServer
