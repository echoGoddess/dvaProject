import request from '../utils/request';

export function fetch({ page, pageSize, keyword }) {
  let url = `/api/todos?_page=${page}&_limit=${pageSize}`;
  if (keyword) {
    url += `&code_like=${keyword}`;
  }
  return request(url);
}

export function create(params) {
  return request('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}

export function edite(params) {
  return request(`/api/todos/${params.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}

export function remove(params) {
  return request(`/api/todos/${params.id}`, {
    method: 'DELETE',
  });
}
