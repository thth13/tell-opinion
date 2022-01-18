import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

api.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  },
  function(error) {
    if (error.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }

    return Promise.reject(error);
  }
);

export default api;
