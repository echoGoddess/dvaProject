import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from './routes/Users.js';
import Login from './routes/Login.js';
import Todos from './routes/Todos.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/users" component={Users} />
        <Route path="/404" component={Users} />
        <Route path="/Login" component={Login} />
        <Route path="/todos" component={Todos} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
