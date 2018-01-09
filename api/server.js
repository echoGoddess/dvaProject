const path = require('path');
const jsonServer = require('json-server');

const mock = require(path.join(__dirname, 'db.js'));
const server = jsonServer.create();
const router = jsonServer.router(mock());
const middlewares = jsonServer.defaults();
// const Mocks=require('./mocks')

server.use(middlewares);

/* server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})*/

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  // add your authorization logic here
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
});

router.render = (req, res) => {
  if (res.statusCode === 200) {
    res.jsonp({
      code: 200,
      dataMap: res.locals.data,
      message: 'success',
    });
  } else {
    res.jsonp({
      code: 500,
      dataMap: res.locals.data,
      message: 'failed',
    });
  }
};

// In this example, returned resources will be wrapped in a body property

server.use(router);
/* const mocks=new Mocks()
mocks.apply(server,jsonServer,path)*/


server.listen(3003, () => {
  console.log('JSON Server is running');
});
