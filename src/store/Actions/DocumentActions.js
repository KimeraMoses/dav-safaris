import { baseUrl } from "..";
import { deleteDocumentFail, deleteDocumentPending, deleteDocumentSuccess } from "../Slices/deleteDocumentSlice";
import {
  fetchCUDocumentsFail,
  fetchCUDocumentsPending,
  fetchCUDocumentsSuccess,
  fetchDocumentsFail,
  fetchDocumentsPending,
  fetchDocumentsSuccess,
} from "../Slices/documentsSlice";
import {
  NewDocumentFail,
  NewDocumentPending,
  NewDocumentSuccess,
} from "../Slices/newDocumentSlice";

export const creatNewDocument = (
  file,
  file_type,
  custom_name,
  course_unit,
  academic_year,
  category,
  num_of_pages,
  video_title,
  video_url,
  video_duration,
  AuthToken
) => {
  return async (dispatch) => {
    dispatch(NewDocumentPending());
    const data = new FormData();
    data.append("file", file);
    data.append("category", category);
    data.append("course_unit", course_unit);
    data.append("custom_name", custom_name);
    data.append("file_type,", file_type);
    data.append("academic_year", academic_year);
    data.append("video_title", video_title);
    data.append("num_of_pages", num_of_pages);
    data.append("video_url", video_url);
    data.append("video_duration", video_duration);

    const response = await fetch(`${baseUrl}/api/v1/files/upload`, {
      method: "POST",
      body: data,
      headers: new Headers({
        Authorization: "Bearer " + AuthToken,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(NewDocumentFail(error));
    }
    const res = await response.json();
    dispatch(NewDocumentSuccess(res));
  };
};

export const fetchDocuments = (AuthToken) => async (dispatch) => {
  dispatch(fetchDocumentsPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/files/getAll`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + AuthToken,
      }),
    });
    const documents = await response.json();
    dispatch(fetchDocumentsSuccess(documents));
  } catch (error) {
    dispatch(fetchDocumentsFail(error));
  }
};

export const fetchCourseUnitDocuments =
  (AuthToken, course_unit_id) => async (dispatch) => {
    dispatch(fetchCUDocumentsPending());
    try {
      const response = await fetch(
        `${baseUrl}/api/v1/files/${course_unit_id}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + AuthToken,
          }),
        }
      );
      const Documents = await response.json();
        dispatch(fetchCUDocumentsSuccess(Documents));
    } catch (error) {
      dispatch(fetchCUDocumentsFail(error));
    }
  };
export const DeleteDocument =
  (AuthToken, doc_id) => async (dispatch) => {
    dispatch(deleteDocumentPending());
    try {
      const response = await fetch(
        `${baseUrl}/api/v1/files/delete/${doc_id}`,
        {
          method: "DELETE",
          headers: new Headers({
            Authorization: "Bearer " + AuthToken,
          }),
        }
      );
      const Document = await response.json();
        dispatch(deleteDocumentSuccess(Document));
        console.log(Document)
    } catch (error) {
      dispatch(deleteDocumentFail(error));
      console.log(error)
    }
  };
