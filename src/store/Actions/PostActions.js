import { baseUrl } from "..";
import { fetchAllPostFail, fetchAllPostPending, fetchAllPostSuccess, NewPostFail, NewPostPending, NewPostSuccess } from "../Slices/postSlice";



//====CREATING NEW TOUR====//
export const creatNewPost = (
    name,
    post_content,
    post_blocks,
    file,
  ) => {
    return async (dispatch) => {
      dispatch(NewPostPending());
      const data = new FormData();
      data.append("file", file);
      data.append("name", name);
      data.append("post_content", post_content);
      data.append("post_blocks", post_blocks);

      const response = await fetch(`${baseUrl}/api/v1/posts/create`, {
        method: "POST",
        body: data,
      });
  
      if (!response.ok) {
        const error = await response.json();
        dispatch(NewPostFail(error));
        console.log(error)
      }
      const res = await response.json();
      dispatch(NewPostSuccess(res));
      console.log(res)
    };
  };
  //====END====//

  export const fetchAllPosts = () => async (dispatch) => {
    dispatch(fetchAllPostPending());
    try {
      const response = await fetch(`${baseUrl}/api/v1/posts/getAllPosts`);
      const fetchedPosts = await response.json();
      dispatch(fetchAllPostSuccess(fetchedPosts.tours));
      console.log(fetchedPosts)
    } catch (error) {
      dispatch(fetchAllPostFail(error.message));
      console.log(error)
    }
  };
  