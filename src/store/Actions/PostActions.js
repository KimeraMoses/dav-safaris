import { baseUrl } from "..";
import {
  deletePostFail,
  deletePostPending,
  deletePostSuccess,
  EditPostFail,
  EditPostPending,
  EditPostSuccess,
  fetchAllPostSuccess,
  fetchPostFail,
  fetchPostPending,
  fetchPostSuccess,
  getLanguagePosts,
  getPostsLoading,
  NewPostSuccess,
} from "../Slices/postSlice";

//====CREATING NEW TOUR====//
export const creatNewPost = (
  name,
  post_content,
  post_blocks,
  file,
  key_words,
  language,
  type
) => {
  return async (dispatch) => {
    dispatch(getPostsLoading(true));
    const data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("post_content", post_content);
    data.append("post_blocks", post_blocks);
    data.append("key_words", key_words);
    if (type === "language") data.append("language", language);

    const response = await fetch(
      `${baseUrl}/api/v1/${
        type === "language" ? "languagePost" : "posts"
      }/create`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      await response.json();
      dispatch(getPostsLoading(false));
    }
    const res = await response.json();
    dispatch(NewPostSuccess(res));
    dispatch(getPostsLoading(false));
    dispatch(fetchAllPosts(type === "language" ? "language" : ""));
  };
};
//====END====//

//====EDIT POST DETAILS====//
export const editPostDetails = (
  name,
  post_content,
  post_blocks,
  file,
  key_words,
  post_Id,
  language,
  type
) => {
  return async (dispatch) => {
    dispatch(EditPostPending());
    const data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("post_content", post_content);
    data.append("post_blocks", post_blocks);
    data.append("key_words", key_words);
    if (type === "language") data.append("language", language);
    const response = await fetch(
      `${baseUrl}/api/v1/${
        type === "language" ? "languagePost" : "posts"
      }/updatePost/${post_Id}`,
      {
        method: "PATCH",
        body: data,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      dispatch(EditPostFail(error));
    }
    const res = await response.json();
    dispatch(EditPostSuccess(res));
    dispatch(fetchAllPosts(type === "language" ? "language" : ""));
  };
};
//====END====//

//====DELETE TOUR FROM DB====//
export const DeletePost = (postId, type) => async (dispatch) => {
  dispatch(deletePostPending());
  try {
    await fetch(
      `${baseUrl}/api/v1/${
        type === "language" ? "languagePost" : "posts"
      }/deletePost/${postId}`,
      {
        method: "DELETE",
      }
    );
    dispatch(deletePostSuccess({ message: "deleted", status: "success" }));
    dispatch(fetchAllPosts(type === "language" ? "language" : ""));
  } catch (error) {
    dispatch(deletePostFail(error));
  }
};
//====END====//

export const fetchAllPosts = (type) => async (dispatch) => {
  dispatch(getPostsLoading(true));
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/${
        type === "language" ? "languagePost" : "posts"
      }/getAllPosts`
    );

    const fetchedPosts = await response.json();
    if (type === "language") {
      dispatch(getLanguagePosts(fetchedPosts.Posts));
    } else {
      dispatch(fetchAllPostSuccess(fetchedPosts.Posts));
    }
    dispatch(getPostsLoading(false));
  } catch (error) {
    dispatch(getPostsLoading(false));
  }
};

export const fetchPostDetails = (post_slug, type) => async (dispatch) => {
  dispatch(fetchPostPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/${
        type === "language" ? "languagePost" : "posts"
      }/getPostByName/${post_slug}`
    );
    const fetchedPost = await response.json();
    dispatch(fetchPostSuccess(fetchedPost.post));
  } catch (error) {
    dispatch(fetchPostFail(error.message));
  }
};
