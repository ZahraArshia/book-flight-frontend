import axios from 'axios';

const itemsURL = 'http://localhost:3001/api/v1/items';
const deleteItemUrl = 'http://localhost:3001/api/v1/users';

const GET = 'get';
const POST = 'post';
const DELETE = 'delete';
const FETCH = 'fetch';

// const RESET = 'reset'
// const ASSIGN = 'assign'

export const get = () => async (dispatch) => {
  await axios.get(itemsURL)
    .then((response) => response.data)
    .then((response) => {
      dispatch({
        type: GET,
        payload: response,
      });
    });
};

export const fetchUserFlights = (userId) => async (dispatch) => {
  await axios.get(`${deleteItemUrl}/${userId}/items/new`)
    .then((response) => response.data)
    .then((response) => {
      dispatch({
        type: FETCH,
        payload: response,
      });
    });
};

export const post = (data, navigate) => async (dispatch) => {
  await axios.post(itemsURL, data)
    .then((response) => response.data)
    .then((response) => {
      navigate(`/Item_detail/${response.id}`);
      dispatch({
        type: POST,
        payload: response,
      });
      dispatch(get());
      dispatch(fetchUserFlights(data.user_id));
    });
};

export const remove = (id) => async (dispatch) => {
  await axios.delete(`${itemsURL}/${id}`)
    .then((response) => response.data)
    .then((response) => {
      dispatch({
        type: DELETE,
        payload: response.item,
      });
      dispatch(fetchUserFlights(response.user.id));
    });
};

const initialFlightState = { flights: [], createdFlight: [], userFlights: [] };
const flightsReducer = (state = initialFlightState, action) => {
  switch (action.type) {
    case GET:
      return { ...state, flights: action.payload };

    case POST:
      return { ...state, createdFlight: action.payload };

    case DELETE:
      return {
        ...state,
        flights: state.flights.filter(
          (flight) => flight.id !== action.payload.id,
        ),
      };
    case FETCH:
      return { ...state, userFlights: action.payload };
    default:
      return state;
  }
};

export default flightsReducer;
