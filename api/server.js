const path=require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const mock=require(path.join(__dirname, 'db.js'))
const router = jsonServer.router(mock())
const middlewares = jsonServer.defaults()
//const Mocks=require('./mocks')

server.use(middlewares)

/*server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})*/

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
/*server.use(jsonServer.bodyParser)*/
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

router.render = (req, res) => {
  if(res.statusCode===200){
    console.log('request-success')
    res.jsonp({
      code:200,
      dataMap:res.locals.data,
      message:'success'
    })
  }
}

// In this example, returned resources will be wrapped in a body property

server.use(router)
/*const mocks=new Mocks()
mocks.apply(server,jsonServer,path)*/


server.listen(3003, () => {
  console.log('JSON Server is running')
})
