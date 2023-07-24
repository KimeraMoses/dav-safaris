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
      const url = `/users/signup${
        role === DAV_ROLES.AGENT ? `?role=${DAV_ROLES.AGENT}` : ""
      }`;
      const response = await requestor({
        method: "POST",
        url,
        data,
      });
      return response;
    },

    /**
     * @name login
     * @description Function used to make request to login user
     * @param {object} data
     * @returns {Promise<any>} response
     */
    login: async (data) => {
      const url = `/users/login`;
      const response = await requestor({
        method: "POST",
        url,
        data,
      });
      return response;
    },

    /**
     * @name activateDeactivateAgent
     * @description Function used to make request to activate or deactivate an agent
     * @param {string} agentId
     * @param {string} action
     * @returns {Promise<any>} response
     */
    activateDeactivateAgent: async (agentId, action) => {
      const data = { agentId };
      const url =
        action === "activate"
          ? `/users/activateAgent`
          : `/users/deactivateAgent`;
      const response = await requestor({
        method: "POST",
        url,
        data,
      });
      return response;
    },

    /**
     * @name forgotPassword
     * @description Function used to make request to reset user password
     * @param {string} email
     * @returns {Promise<any>} response
     */
    forgotPassword: async (email) => {
      const url = `/users/forgotPassword`;
      const response = await requestor({
        method: "POST",
        url,
        data: { email },
      });
      return response;
    },

    /**
     * @name resetPassword
     * @description Function used to make request to reset user password
     * @param {string} token
     * @param {string} password
     * @returns {Promise<any>} response
     */
    resetPassword: async (token, password) => {
      const url = `/users/resetPassword/${token}`;
      const response = await requestor({
        method: "PATCH",
        url,
        data: { password },
      });
      return response;
    },
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

    const url = `/tours/create`;
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

    const url = `/tours/updateTour/${tourId}`;
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

    const url = `/${
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
    const url = `/tours/deleteTour/${tourId}`;
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
    const url = `/${
      type === "language" ? "languagePost" : "posts"
    }/deletePost/${postId}`;
    const response = await requestor({
      method: "DELETE",
      url,
    });
    return response;
  },

  /**
   * @name createCountry
   * @description Function used to make request to create a country
   * @param {object} data
   * @returns {Promise<any>} response
   */
  createCountry: async (data) => {
    const url = `/countries/create`;
    // TODO: if formData, then check tour creation for the format of formData
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("summary", data.countrySummary);
    formData.append("description", data.description);
    formData.append("specialist", data.specialist);
    formData.append("title", data.title);
    formData.append("file", data.selectedImage);
    formData.append("key_words", data.key_words);
    const response = await requestor({
      method: "POST",
      url,
      data: formData,
    });
    return response;
  },

  /**
   * @name editCountry
   * @description Function used to make request to edit a country
   * @param {object} data
   * @param {string} countryId
   * @returns {Promise<any>} response
   */
  editCountry: async (data, countryId) => {
    const url = `/countries/updateCountry/${countryId}`;
    // TODO: if formData, then check tour creation for the format of formData
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("summary", data.countrySummary);
    formData.append("description", data.description);
    formData.append("specialist", data.specialist);
    formData.append("title", data.title);
    formData.append("file", data.selectedImage);
    formData.append("key_words", data.key_words);
    const response = await requestor({
      method: "PATCH",
      url,
      data: formData,
    });
    return response;
  },
  /**
   * @name reviewTour
   * @description Function used to make request to review a tour
   * @param {object} data
   * @returns {Promise<any>} response
   */
  reviewTour: async (data) => {
    const url = `/reviews/create`;
    const response = await requestor({
      method: "POST",
      url,
      data,
    });
    return response;
  },

  /**
   * @name deleteCountryById
   * @description Function used to make request to delete a country
   * @param {string} countryId
   * @returns {object} response
   */
  deleteCountryById: async (countryId) => {
    const url = `/countries/deleteCountry/${countryId}`;
    const response = await requestor({
      method: "DELETE",
      url,
    });
    return response;
  },

  /**
   * @name createCategory
   * @description Function used to make request to create a category
   * @param {object} data
   * @returns {Promise<any>} response
   */
  createCategory: async (data) => {
    const url = `/categories/create`;
    // TODO: if formData, then check tour creation for the format of formData
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("value", data.value);
    formData.append("file", data.selectedImage);
    formData.append("description", data.description);
    formData.append("country", data.country);
    const response = await requestor({
      method: "POST",
      url,
      data: formData,
    });
    return response;
  },

  /**
   * @name editCategory
   * @description Function used to make request to edit a category
   * @param {object} data
   * @param {string} categoryId
   * @returns {Promise<any>} response
   * @todo check if formData is needed and switch to it
   */
  editCategory: async (data, categoryId) => {
    const url = `/categories/updateTourCategory/${categoryId}`;
    // TODO: if formData, then check tour creation for the format of formData
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("country", data.country);
    formData.append("file", data.selectedImage);
    formData.append("value", data.value);
    const response = await requestor({
      method: "PATCH",
      url,
      data,
    });
    return response;
  },
  /**
   * @name deleteCategoryById
   * @description Function used to make request to delete a category
   * @param {string} categoryId
   * @returns {object} response
   */
  deleteCategoryById: async (categoryId) => {
    const url = `/categories/deleteTourCategory/${categoryId}`;
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
      const url = `/users/getAllAgents`;
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
      const url = `/tours/getAllTours`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },

    /**
     * @name getAllToursByCountry
     * @description Function used to get all tours by country name
     * @param {string} country
     * @returns {object} response
     */
    getAllToursByCountry: async (country) => {
      const url = `/tours/getAllTours/${country}`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },

    /**
     * @name getTourByName
     * @description Function used to get tour by name
     * @param {string} tourName
     * @returns {Promise<any>} response
     */
    getTourByName: async (tourName) => {
      const url = `/tours/getTourByName/${tourName}`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },

    /**
     * @name getTourById
     * @description Function used to get tour by id
     * @param {string} tourId
     * @returns {Promise<any>} response
     */
    getTourById: async (tourId) => {
      const url = `/tours/${tourId}`;
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
      const url = `/${
        type === "language" ? "languagePost" : "posts"
      }/getAllPosts`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },
    /**
     * @name getAllCountries
     * @description Function used to get all countries
     * @returns {object} response
     */
    getAllCountries: async () => {
      const url = `/countries/getAllCountries`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },

    /**
     * @name getTourReviews
     * @description Function used to get all posts
     * @param {string} tour_id
     * @returns {object} response
     */
    getTourReviews: async (tour_id) => {
      const url = `/tours/${tour_id}/reviews/getAllReviews`;

      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },

    /**
     * @name getPostByName
     * @description Function used to get post by name
     * @param {string} type
     * @param {string} postName
     * @returns {Promise<any} response
     */
    getPostByName: async (postName, type) => {
      const url = `/${
        type === "language" ? "languagePost" : "posts"
      }/getPostByName/${postName}`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },
    /**
     * @name getCountryBySlug
     * @description Function used to make request to get a country by slug
     * @param {string} slug
     * @returns {Promise<any>} response
     */
    getCountryBySlug: async (slug) => {
      const url = `/countries/getCountryBySlug/${slug}`;
      const response = await requestor({
        method: "GET",
        url,
      });
      return response;
    },
    /**
     * @name getCountryById
     * @description Function used to make request to get a country by an id
     * @param {string} id
     * @returns {Promise<any>} response
     */
    getCountryById: async (countryId) => {
      const url = `/countries/${countryId}`;
      const response = await requestor({
        method: "GET",
        url,
      });
      return response;
    },
    /**
     * @name getAllCategories
     * @description Function used to get all categories
     * @returns {object} response
     */
    getAllCategories: async () => {
      const url = `/categories/getAllTourCategories`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },

    /**
     * @name getPostById
     * @description Function used to get post by id
     * @param {string} type
     * @param {string} postId
     * @returns {Promise<any} response
     */
    getPostById: async (postId, type) => {
      const url = `/${
        type === "language" ? "languagePost" : "posts"
      }/${postId}`;
      const response = await requestor({
        method: "GET",
        url,
      });

      return response;
    },
    /**
     * @name getCategoryById
     * @description Function used to make request to get a category by an id
     * @param {string} id
     * @returns {Promise<any>} response
     */
    getCategoryById: async (categoryId) => {
      const url = `/categories/${categoryId}`;
      const response = await requestor({
        method: "GET",
        url,
      });
      return response;
    },
    /**
     * @name getCategoryBySlug
     * @description Function used to make request to get a category by slug
     * @param {string} slug
     * @returns {Promise<any>} response
     */
    getCategoryBySlug: async (slug) => {
      const url = `/categories/getTourCategoryBySlug/${slug}`;
      const response = await requestor({
        method: "GET",
        url,
      });
      return response;
    },
    /**
     * @name getPopularDestinations
     * @description Function used to make request to get popular destinations
     * @returns {Promise<any>} response
     */
    getPopularDestinations: async () => {
      const url = `/tours/getPopularDestinations`;
      const response = await requestor({
        method: "GET",
        url,
      });
      return response;
    },
  },
});

export default requestAdapter;
