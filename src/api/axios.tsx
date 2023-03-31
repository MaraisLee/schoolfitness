import axios from 'axios';
import { getCookie, setCookie } from './cookie';

const instance = axios.create({
  baseURL: 'http://192.168.0.79:8888/api/',
  params: {},
  headers: { authorization: `Bearer ${getCookie('access_token')}` },
});

export default instance;
