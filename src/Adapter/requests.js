import { DAV_ROLES } from "../constants";

/**
 * Handle all the API calls to dav backend
 * @name requestAdapter
 * @param {(config: RequestConfig)=> any} requestor
 */
const requestAdapter = (requestor) => ({
  auth: {
    /**
     * @name register
     * @description Function used to make request to the register user
     * @param {object} data
     * @param {string} role
     * @returns
     */
    register: async (data, role) => {
      const url = `/api/v1/users/signup${
        role === DAV_ROLES.AGENT ? `?role=${DAV_ROLES.AGENT}` : ""
      }`;
      const response = await requestor({
        method: "POST",
        url,
        data,
      });
      return response;
    },

    login: async (data) => {
      const url = `/api/v1/users/login`;
      const response = await requestor({
        method: "POST",
        url,
        data,
      });
      return response;
    },
  },

  /**
   * @name get - handle all get requests for estimate
   */
  get: {},
});

export default requestAdapter;
