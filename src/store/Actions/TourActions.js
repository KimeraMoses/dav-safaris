
import { baseUrl } from "..";
import { fetchCountriesFail, fetchCountriesPending, fetchCountriesSuccess } from "../Slices/countrySlice";
import { NewTourFail, NewTourPending, NewTourSuccess } from "../Slices/newTourSlice";
import { fetchTourFail, fetchTourPending, fetchTourSuccess } from "../Slices/tourSlice";
import { fetchToursFail, fetchToursPending, fetchToursSuccess } from "../Slices/toursSlice";

export const fetchAllTours = () => async (dispatch) => {
  dispatch(fetchToursPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/tours/getAllTours`);
    const fetchedTours = await response.json();
    dispatch(fetchToursSuccess(fetchedTours.tours));
    console.log(fetchedTours)
  } catch (error) {
    dispatch(fetchToursFail(error.message));
    console.log(error)
  }
};
export const fetchAllCountries = () => async (dispatch) => {
  dispatch(fetchCountriesPending());
  try {
    const response = await fetch(`https://restcountries.com/v2/all`);
    const fetchedCountries = await response.json();
    dispatch(fetchCountriesSuccess(fetchedCountries));
    // console.log(fetchedCountries)
  } catch (error) {
    dispatch(fetchCountriesFail(error.message));
    // console.log(error)
  }
};

// export const fetchAllCountryTours = () => async (dispatch) => {
//   dispatch(fetchToursPending());
//   try {
//     const response = await fetch(`${baseUrl}/api/v1/tours/getAllTours`);
//     const fetchedTours = await response.json();
//     dispatch(fetchToursSuccess(fetchedTours.tours));
//   } catch (error) {
//     dispatch(fetchToursFail(error.message));
//   }
// };

// export const fetchTourDetails = (tour_id) => async (dispatch) => {
//   dispatch(fetchTourPending());
//   try {
//     const response = await fetch(
//       `${baseUrl}/api/v1/tours/${tour_id}`
//     );
//     const fetchedTours = await response.json();
//     dispatch(fetchTourSuccess(fetchedTours));

//   } catch (error) {
//     dispatch(fetchTourFail(error.message));
//   }
// };


//====CREATING NEW TOUR====//
export const creatNewTour = (
  name,
  description,
  tourActivities,
  dayActivityDescription,
  duration,
  price,
  file,
  packageDetails,
  category,
  country,
  // maxGroupSize,
  // summary,
) => {
  return async (dispatch) => {
    dispatch(NewTourPending());
    const data = new FormData();
    data.append("file", file);
    data.append("category", category);
    data.append("name", name);
    data.append("description", description);
    data.append("tourActivities", tourActivities);
    data.append("packageDetails", packageDetails);
    data.append("country", country);
    data.append("price", price);
    data.append("duration", duration);
    data.append("dayActivityDescription", dayActivityDescription);
    // data.append("maxGroupSize", maxGroupSize);
    // data.append("summary", summary);

    // console.log("Tour activities", tourActivities)
    // console.log("day", dayActivityDescription)
    // console.log("package", packageDetails)

    const response = await fetch(`${baseUrl}/api/v1/tours/create`, {
      method: "POST",
      body: data,

    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(NewTourFail(error));
    }
    const res = await response.json();
    dispatch(NewTourSuccess(res));
  };
};
//====END====//

// export const EditTourDetails = (
//   id,
//   name,
//   code,
//   description,
//   logo,
//   courseCategories,
//   links
// ) => {
//   return async (dispatch) => {
//       dispatch(EditUnversityPending());
//       const response = await fetch(
//         `${baseUrl}/api/v1/universities/edit/${id}`,
//         {
//           method: "PUT",
//           body: JSON.stringify({
//             name,
//             code,
//             description,
//             logo,
//             courseCategories,
//             links,
//           }),
//           headers: new Headers({
//             "Content-type": "application/json",
//           }),
//         }
//       );
//       if (!response.ok) {
//         const error = await response.json();
//         dispatch(EditUnversityFail(error.message));
//       }
//       const data = await response.json();
//       dispatch(EditUnversitySuccess(data.status));
//     };
// };