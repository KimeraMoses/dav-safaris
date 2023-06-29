import axios from "axios";
import requestAdapter from "./requests";
import { baseUrl } from "../store";
/**
 * @name Requestor
 * @param {RequestConfig} config - Request settings.
 */
export const Requestor = async (config) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const tokenObj = JSON.parse(AuthToken);
  const token = tokenObj?.token;
  config.headers = {
    "Content-type": "application/json",
    "X-API-KEY": "d18a36f4-aa97-4b5c-ade0-4aacc0d70a5b",
    Authorization: token ? `Bearer ${token}` : "",
    ...config.headers,
  };

  try {
    const { url, data } = config;
    const res = await axios(`${baseUrl}${url}`, {
      method: "GET",
      credentials: "include",
      body: data ? JSON.stringify(data) : null,
      ...config,
    });

    return res;
  } catch (error) {
    // console.log('error', error);
    return error;
  }
};

const DAV_APIS = requestAdapter(Requestor);

export { DAV_APIS };
