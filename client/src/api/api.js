import axios from "axios";

export const SERVER = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: SERVER,
});

export default axiosInstance;
