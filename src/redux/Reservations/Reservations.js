const REQUEST_RESERVATIONS = 'REQUEST_RESERVATIONS';
const LOAD_RESERVATIONS = 'LOAD_RESERVATIONS';
const FAILED_RESERVATIONS = 'FAILED_RESERVATIONS';

const SUCCESS_CREATE_RESERVATION = 'SUCCESS_CREATE_RESERVATION';
const FAILED_CREATE_RESERVATION = 'FAILED_CREATE_RESERVATION';

const SUCCESS_DELETE_RESERVATION = 'SUCCESS_DELETE_RESERVATION';
const FAILED_DELETE_RESERVATION = 'FAILED_DELETE_RESERVATION';

const RESET_RESERVATION = 'RESET_RESERVATION';
export const resetReservation = () => ({
  type: RESET_RESERVATION,
});
export const fetchReservations = (userId) => (dispatch) => {
  dispatch({ type: REQUEST_RESERVATIONS, payload: true });
  return fetch(`http://127.0.0.1:3001/api/v1/users/${userId}/reservations`)
    .then((response) => response.json())
    .then((result) => (result.Error
      ? dispatch({ type: FAILED_RESERVATIONS, payload: result })
      : dispatch({ type: LOAD_RESERVATIONS, payload: result })));
};

export const createReservation = (data) => (dispatch) => (
  fetch(`http://127.0.0.1:3001/api/v1/users/${data.user_id}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: data.item_id, city: data.city, date: data.date }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        dispatch(fetchReservations(data.user_id));
        dispatch({ type: SUCCESS_CREATE_RESERVATION, payload: result.success });
      } else {
        dispatch({ type: FAILED_CREATE_RESERVATION, payload: result.failure });
      }
    })
    .catch(() => dispatch({ type: FAILED_CREATE_RESERVATION, payload: 'Please choose the date' }))
);

export const deleteReservation = (data) => (dispatch) => (
  fetch(`http://127.0.0.1:3001/api/v1/users/${data.user_id}/reservations/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        dispatch({ type: SUCCESS_DELETE_RESERVATION, payload: result });
      } else {
        dispatch({ type: FAILED_DELETE_RESERVATION, payload: result.failure });
      }
    })
    .catch(() => dispatch({ type: FAILED_DELETE_RESERVATION, payload: 'Something went wrong.' }))
);

const initialReservationsState = {
  pending: false,
  reservations: [],
  error: '',
  success: false,
};

const reservationsReducer = (state = initialReservationsState, action = {}) => {
  switch (action.type) {
    case REQUEST_RESERVATIONS:
      return { ...state, pending: action.payload };
    case LOAD_RESERVATIONS:
      return { ...state, reservations: action.payload, pending: false };
    case FAILED_DELETE_RESERVATION:
    case FAILED_CREATE_RESERVATION:
    case FAILED_RESERVATIONS:
      return { ...state, error: action.payload, pending: false };
    case SUCCESS_CREATE_RESERVATION:
      return { ...state, success: true };
    case SUCCESS_DELETE_RESERVATION:
      return {
        ...state, reservations: action.payload, pending: false,
      };
    case RESET_RESERVATION:
      return {
        ...state, success: false,
      };
    default:
      return state;
  }
};

export default reservationsReducer;
