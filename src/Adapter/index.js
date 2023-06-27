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
  if (token) {
    config.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
      ...config.headers,
    };
  }
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
