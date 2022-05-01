export { STATIONS, USERS };

const USERS = {
  LIST: { URL: '/users', METHOD: 'GET' },
  CREATE: { URL: '/users', METHOD: 'POST' },
  ME: { URL: '/users/me', METHOD: 'GET' },
  GET: { URL: (id: number) => `/users/${id}`, METHOD: 'GET' },
  DELETE: { URL: (id: number) => `/users/${id}`, METHOD: 'DELETE' },
  UPDATE: { URL: (id: number) => `/users/${id}`, METHOD: 'PATCH' },
  AUTH: { URL: '/users/auth', METHOD: 'POST' },
};
const STATIONS = {
  LIST: { URL: '/stations', METHOD: 'GET' },
  CREATE: { URL: '/stations', METHOD: 'POST' },
  GET: { URL: (id: number) => `/stations/${id}`, METHOD: 'GET' },
  DELETE: { URL: (id: number) => `/stations/${id}`, METHOD: 'DELETE' },
  UPDATE: { URL: (id: number) => `/stations/${id}`, METHOD: 'PATCH' },
};
