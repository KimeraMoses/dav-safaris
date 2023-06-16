import { baseUrl } from "..";
import {
  NewCategoryFail,
  NewCategoryPending,
  NewCategorySuccess,
} from "../Slices/newTourCategorySlice";
import {
  fetchCategoriesFail,
  fetchCategoriesPending,
  fetchCategoriesSuccess,
} from "../Slices/fetchCategoriesSlice";
import {
  EditCategoryPending,
  EditCategorySuccess,
  EditCategoryFail,
} from "../Slices/editCategorySlice";
import {
  deleteCategoryPending,
  deleteCategorySuccess,
  deleteCategoryFail,
} from "../Slices/deleteCategorySlice";
//====CREATING NEW TOUR CATEGORY====//
export const createNewTourCategory = (
  name,
  description,
  country,
  value,
  image
  //   key_words
) => {
  return async (dispatch) => {
    dispatch(NewCategoryPending());
    const data = new FormData();

    data.append("name", name);
    data.append("value", value);
    data.append("file", image);
    data.append("description", description);
    data.append("country", country);
    // data.append("key_words", key_words);
    console.log(name, description, country, value, image);
    const response = await fetch(`${baseUrl}/api/v1/categories/create`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(NewCategoryFail(error));
    }
    const res = await response.json();
    dispatch(NewCategorySuccess(res));
  };
};
//====END====//

//====FETCHING ALL CATEGORIES====//
export const fetchAllCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/categories/getAllTourCategories`
    );
    const fetchedCategories = await response.json();

    dispatch(fetchCategoriesSuccess(fetchedCategories));
  } catch (error) {
    dispatch(fetchCategoriesFail(error.message));
  }
};

//==== EDITING CATEGORY DETAILS====//

export const editCategoryDetails = (
  name,
  description,
  country,
  value,
  selectedImage,
  cat_Id
) => {
  return async (dispatch) => {
    dispatch(EditCategoryPending());
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("country", country);
    data.append("file", selectedImage);
    data.append("value", value);

    const response = await fetch(
      `${baseUrl}/api/v1/categories/updateTourCategory/${cat_Id}`,
      {
        method: "PATCH",
        body: data,
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(EditCategoryFail(error));
    }
    const res = await response.json();
    dispatch(EditCategorySuccess(res));
  };
};

//====DELETE CATEGORY====//
export const DeleteCategory = (cat_Id) => async (dispatch) => {
  dispatch(deleteCategoryPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/categories/deleteTourCategory/${cat_Id}`,
      {
        method: "DELETE",
      }
    );
    const category = await response.json();
    dispatch(deleteCategorySuccess(category));
  } catch (error) {
    dispatch(deleteCategoryFail(error));
  }
};
