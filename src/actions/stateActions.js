export const FETCH_DATA = "FETCH_DATA";
export const FETCH_SUCCESS = "FETCH_SUCCESS";

export const fetchData = () => {
  return { type: FETCH_DATA };
};
export const fetchSuccess = () => {
  return { type: FETCH_SUCCESS };
};
