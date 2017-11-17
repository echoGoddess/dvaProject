const path=require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
//const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const Mocks=require('./mocks')

server.use(middlewares)

/*server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})*/

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
/*server.use(jsonServer.bodyParser)*/
server.use((req, res, next) => {
  res.header('x-total-count', 10)
  if(res.statusCode===200){
    next()
  } else {
    res.sendStatus(401)
  }
})

// In this example, returned resources will be wrapped in a body property

/*server.use(router)*/
const mocks=new Mocks()
mocks.apply(server,jsonServer,path)


server.listen(3004, () => {
  console.log('JSON Server is running')
})
