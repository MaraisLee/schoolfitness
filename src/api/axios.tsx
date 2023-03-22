import axios from "axios";
const instance = axios.create({
  baseURL: "http://192.168.0.79:8888/api/",
  params: {},
});
export default instance;