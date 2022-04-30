import axios from 'axios';

export { fetch };

const fetch = axios.create({
  baseURL: 'https://piar.meew.me',
});
