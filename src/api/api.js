import axios from "axios";
import { store } from "../store/store";

const api = axios.create({
    baseURL: "http://localhost:3000/v1"
});

api.interceptors.request.use((config) => {
  const token = store.getState().login.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;