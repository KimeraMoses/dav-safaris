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

  activateDeactivateAgent: async (agentId, action) => {
    const data = { agentId };
    const url =
      action === "activate"
        ? `/api/v1/users/activateAgent`
        : `/api/v1/users/deactivateAgent`;
    const response = await requestor({
      method: "POST",
      url,
      data,
    });
    return response;
  },

  /**
   * @name createNewTour
   * @description Function used to make request to create a new tour
   * @param {object} data
   * @returns {Promise<any>} response
   */
  createNewTour: async (data) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("tourActivities", data.tourActivities);
    formData.append("packageDetails", data.packageDetails);
    formData.append("country", data.country);
    formData.append("price", data.price);
    formData.append("duration", data.duration);
    formData.append("dayActivityDescription", data.dayActivityDescription);
    formData.append("key_words", data.key_words);

    const url = `/api/v1/tours/create`;
    const response = await requestor({
      method: "POST",
      url,
      data: formData,
    });
    return response;
  },

  /**
   * @name editTour
   * @description Function used to make request to edit a tour
   * @param {object} data
   * @param {string} tourId
   * @returns {object} response
   */
  editTour: async (data, tourId) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("tourActivities", data.tourActivities);
    formData.append("packageDetails", data.packageDetails);
    formData.append("country", data.country);
    formData.append("price", data.price);
    formData.append("duration", data.duration);
    formData.append("dayActivityDescription", data.dayActivityDescription);
    formData.append("key_words", data.key_words);

    const url = `/api/v1/tours/updateTour/${tourId}`;
    const response = await requestor({
      method: "PATCH",
      url,
      data: formData,
    });
    return response;
  },

  /**
   * @name editPostDetails
   * @description Function used to make request to edit a post
   * @param {object} data
   * @param {string} postId
   * @param {string} type
   * @returns {object} response
   */
  editPostDetails: async (data, postId, type) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.name);
    formData.append("post_content", data.post_content);
    formData.append("post_blocks", data.post_blocks);
    formData.append("key_words", data.key_words);

    const url = `/api/v1/${
      type === "language" ? "languagePost" : "posts"
    }/updatePost/${postId}`;

    const response = await requestor({
      method: "PATCH",
      url,
      data: formData,
    });
    return response;
  },

  /**
   * @name deleteTourById
   * @description Function used to make request to delete a tour
   * @param {string} tourId
   * @returns {object} response
   */
  deleteTourById: async (tourId) => {
    const url = `/api/v1/tours/deleteTour/${tourId}`;
    const response = await requestor({
      method: "DELETE",
      url,
    });
    return response;
  },

  /**
   * @name deletePostById
   * @description Function used to make request to delete a post by id
   * @param {string} postId
   * @returns {object} response
   */
  deletePostById: async (postId, type) => {
    const url = `/api/v1/${
      type === "language" ? "languagePost" : "posts"
    }/deletePost/${postId}`;
    const response = await requestor({
      method: "DELETE",
      url,
    });
    return response;
  },

  /**
   * @name get - handle all get requests for estimate
   */
  get: {
    /**
     * @name getAllAgents
     * @description Function used to get all agents
     * @returns {object} response
     */
    getAllAgents: async () => {
      const url = `/api/v1/users/getAllAgents`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },

    /**
     * @name getAllTours
     * @description Function used to get all tours
     * @returns {object} response
     */
    getAllTours: async () => {
      const url = `/api/v1/tours/getAllTours`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },

    /**
     * @name getAllPosts
     * @description Function used to get all posts
     * @param {string} type
     * @returns {object} response
     */
    getAllPosts: async (type) => {
      const url = `/api/v1/${
        type === "language" ? "languagePost" : "posts"
      }/getAllPosts`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },
  },
});

export default requestAdapter;
