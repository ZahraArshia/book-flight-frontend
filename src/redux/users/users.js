import axios from 'axios';

const usersURL = 'http://localhost:3001/api/v1/users';

const GET = 'get';
const POST = 'post';

export const get = () => async (dispatch) => {
  await axios.get(usersURL)
    .then((response) => {
      dispatch({
        type: GET,
        payload: response,
      });
    });
};

export const post = (data) => async (dispatch) => {
  await axios.post(usersURL, data)
    .then((response) => {
      dispatch({
        type: POST,
        payload: response,
      });
    });
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        users: action.payload,
      };

    case POST:
      return action.payload;

    default:
      return state;
  }
};

export default usersReducer;
