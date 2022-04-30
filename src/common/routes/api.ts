export { stations, users };

const users = {
  list: { url: '/users', method: 'GET' },
  create: { url: '/users', method: 'POST' },
  me: { url: '/users/me', method: 'GET' },
  getUser: { url: (id: number) => `/users/${id}`, method: 'GET' },
  delUser: { url: (id: number) => `/users/${id}`, method: 'DELETE' },
  updUser: { url: (id: number) => `/users/${id}`, method: 'PATCH' },
  auth: { url: '/users/auth', method: 'POST' },
};
const stations = {
  list: { url: '/stations', method: 'GET' },
  create: { url: '/stations', method: 'POST' },
  getStation: { url: (id: number) => `/stations/${id}`, method: 'GET' },
  delStation: { url: (id: number) => `/stations/${id}`, method: 'DELETE' },
  updStation: { url: (id: number) => `/stations/${id}`, method: 'PATCH' },
};
