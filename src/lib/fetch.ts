import axios, { AxiosInstance } from 'axios';
import { Endpoints, USERS } from 'common/routes/api';

export { fetch };

// const fetch = axios.create({
//   baseURL: 'https://piar.meew.me',
// });

class Api {
  axios: AxiosInstance;
  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL });
  }

  async get<T = Record<string, any>>(endpoint: Endpoints, jwt = '') {
    try {
      const response = await this.axios.get<T>(endpoint, { headers: { 'user-jwt': jwt } });

      const { data } = response;

      return { data };
    } catch (err) {
      console.error('Something went wrong...');

      return { error: true };
    }
  }
  async post<T = Record<string, any>>(endpoint: Endpoints, data: any, jwt = '') {
    try {
      const response = await this.axios.post<T>(endpoint, data, {
        headers: { 'user-jwt': jwt },
      });

      return { data: response.data };
    } catch (err: any) {
      console.error('Something went wrong...', err);

      return { error: true, message: err.response.data.error };
    }
  }
  async patch<T = Record<string, any>>(endpoint: Endpoints, data: any, jwt = '') {
    try {
      const response = await this.axios.patch<T>(endpoint, data, {
        headers: { 'user-jwt': jwt },
      });

      return { data: response.data };
    } catch (err) {
      console.error('Something went wrong...');

      return { error: true };
    }
  }
  async delete<T = Record<string, any>>(endpoint: Endpoints, jwt = '') {
    try {
      const response = await this.axios.delete<T>(endpoint, { headers: { 'user-jwt': jwt } });

      const { data } = response;

      return { data };
    } catch (err) {
      console.error('Something went wrong...');

      return { error: true };
    }
  }
}

const fetch = new Api('https://piar.meew.me');

// instance.get(USERS.GET.URL(124));
