import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';
import createLoading from 'dva-loading';

import './index.css';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/users'));
app.model(require('./models/todos'));
app.model(require('./models/login'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
