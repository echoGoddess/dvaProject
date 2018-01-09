const Mock = require('mockjs');

const Random = Mock.Random;
// mockjs-url:https://github.com/nuysoft/Mock/wiki

module.exports = () => {
  const data = { users: [], news: [], login: {}, todos: [] };
  const companies = ['美凯龙', '金螳螂', '民生银行', '华夏幸福'];
  const names = [1, 2, 3, 4].map((item) => { return Random.cname(item, item + 1); });
  for (let i = 0, len = 5; i < len; i += 1) {
    const name = names[Random.integer(1, 3)];
    data.users.push({
      id: i,
      name,
      password: 111,
      email: Random.email(),
      website: Random.url(),
    });

    const company = companies[Random.integer(0, 3)];
    data.todos.push({
      id: i,
      company,
      code: Random.integer(600000, 600999),
      website: Random.url(),
    });
  }
  return data;
};
