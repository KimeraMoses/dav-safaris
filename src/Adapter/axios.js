import axiosMain from "axios";
import { baseUrl } from "../store";

export const axios = axiosMain.create({
  baseURL: baseUrl,
  timeout: 0,
});
