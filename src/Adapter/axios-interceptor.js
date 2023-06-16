import axiosMain from "axios";
import { baseUrl } from "../store";

export const axios = axiosMain.create({
  baseURL: baseUrl,
});

/**
 * @name Interceptor
 * @description - This function is used to set the axios interceptor for all requests and responses to api.
 * @returns {void}
 * */

const Interceptor = () => {
  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const AuthToken = localStorage.getItem("AuthToken");
      const tokenObj = JSON.parse(AuthToken);
      const token = tokenObj?.token;
      config.headers = {
        "Content-type": "application/json",
        "X-API-KEY": "d18a36f4-aa97-4b5c-ade0-4aacc0d70a5b",
        Authorization: token ? `Bearer ${token}` : "",
        ...config.headers,
      };
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      const { config } = error;
      if (
        error?.response &&
        (error?.response?.status === 401 || error?.response?.status === 429) &&
        !config._retry
      ) {
        config._retry = true;
        return axios(config);
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
};

export default Interceptor;
