export { STATIONS, USERS };
export type { Endpoints };

const USERS_ENDPOINT = '/users' as const;
const ME_ENDPOINT = `${USERS_ENDPOINT}/me` as const;
const USER_ENDPOINT = (id: number) => `${USERS_ENDPOINT}/${id}` as const;
const AUTH_ENDPOINT = `${USERS_ENDPOINT}/auth` as const;
const STATIONS_ENDPOINT = '/stations' as const;
const STATION_ENDPOINT = (id: number) => `${STATIONS_ENDPOINT}/${id}` as const;

type Endpoints =
  | typeof USERS_ENDPOINT
  | typeof ME_ENDPOINT
  | ReturnType<typeof USER_ENDPOINT>
  | typeof AUTH_ENDPOINT
  | typeof STATIONS_ENDPOINT
  | ReturnType<typeof STATION_ENDPOINT>;

const USERS = {
  LIST: { URL: USERS_ENDPOINT, METHOD: 'GET' },
  CREATE: { URL: USERS_ENDPOINT, METHOD: 'POST' },
  ME: { URL: ME_ENDPOINT, METHOD: 'GET' },
  GET: { URL: USER_ENDPOINT, METHOD: 'GET' },
  DELETE: { URL: USER_ENDPOINT, METHOD: 'DELETE' },
  UPDATE: { URL: USER_ENDPOINT, METHOD: 'PATCH' },
  AUTH: { URL: AUTH_ENDPOINT, METHOD: 'POST' },
};
const STATIONS = {
  LIST: { URL: STATIONS_ENDPOINT, METHOD: 'GET' },
  CREATE: { URL: STATIONS_ENDPOINT, METHOD: 'POST' },
  GET: { URL: STATION_ENDPOINT, METHOD: 'GET' },
  DELETE: { URL: STATION_ENDPOINT, METHOD: 'DELETE' },
  UPDATE: { URL: STATION_ENDPOINT, METHOD: 'PATCH' },
};
