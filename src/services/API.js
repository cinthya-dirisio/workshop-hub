import axios from "axios";
import store from "../redux/store";

const baseAPI = axios.create({ baseURL : 'http://localhost:8080/api/' })

baseAPI.interceptors.request.use((config) => {
    const state = store.getState()
    const token = state.user.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    }
)

export default baseAPI