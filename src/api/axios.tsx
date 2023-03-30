import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.0.79:8888/api/',
  params: {},
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

export default instance;
