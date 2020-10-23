import axios from 'axios';
import https from 'https';

const BASE_URL = 'https://reqres.in';

const mainAxios = axios.create({
  baseURL: BASE_URL,
  httpAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default mainAxios;