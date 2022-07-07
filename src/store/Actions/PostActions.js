import { baseUrl } from "..";
import {
  deletePostFail,
  deletePostPending,
  deletePostSuccess,
  EditPostFail,
  EditPostPending,
  EditPostSuccess,
  fetchAllPostFail,
  fetchAllPostPending,
  fetchAllPostSuccess,
  fetchPostFail,
  fetchPostPending,
  fetchPostSuccess,
  NewPostFail,
  NewPostPending,
  NewPostSuccess,
} from "../Slices/postSlice";

//====CREATING NEW TOUR====//
export const creatNewPost = (
  name,
  post_content,
  post_blocks,
  file,
  key_words
) => {
  return async (dispatch) => {
    dispatch(NewPostPending());
    const data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("post_content", post_content);
    data.append("post_blocks", post_blocks);
    data.append("key_words", key_words);

    const response = await fetch(`${baseUrl}/api/v1/posts/create`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(NewPostFail(error));
    }
    const res = await response.json();
    dispatch(NewPostSuccess(res));
    dispatch(fetchAllPosts());
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
  post_Id
) => {
  return async (dispatch) => {
    dispatch(EditPostPending());
    const data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("post_content", post_content);
    data.append("post_blocks", post_blocks);
    data.append("key_words", key_words);

    const response = await fetch(
      `${baseUrl}/api/v1/posts/updatePost/${post_Id}`,
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
  };
};
//====END====//

//====DELETE TOUR FROM DB====//
export const DeletePost = (postId) => async (dispatch) => {
  dispatch(deletePostPending());
  try {
    await fetch(`${baseUrl}/api/v1/posts/deletePost/${postId}`, {
      method: "DELETE",
    });
    // const Post = await response.json();
    dispatch(deletePostSuccess({ message: "deleted", status: "success" }));
  } catch (error) {
    dispatch(deletePostFail(error));
  }
};
//====END====//

export const fetchAllPosts = () => async (dispatch) => {
  dispatch(fetchAllPostPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/posts/getAllPosts`);
    const fetchedPosts = await response.json();
    dispatch(fetchAllPostSuccess(fetchedPosts.Posts));
    // console.log(fetchedPosts)
  } catch (error) {
    dispatch(fetchAllPostFail(error.message));
    // console.log(error)
  }
};

export const fetchPostDetails = (post_slug) => async (dispatch) => {
  dispatch(fetchPostPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/posts/getPostByName/${post_slug}`
    );
    const fetchedPost = await response.json();
    dispatch(fetchPostSuccess(fetchedPost.post));
  } catch (error) {
    dispatch(fetchPostFail(error.message));
  }
};
