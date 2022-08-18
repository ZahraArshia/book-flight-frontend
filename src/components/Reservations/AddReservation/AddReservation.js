import '../Reservations.css';
import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cities from './cities';
import { createReservation, resetReservation } from '../../../redux/Reservations/Reservations';

const AddReservation = () => {
  const location = useLocation();
  const { state: itemId } = location;
  const success = useSelector((state) => state.reservationsReducer.success);
  const error = useSelector((state) => (state.reservationsReducer.error));
  const [city, setCity] = useState('');
  const [date, setDate] = useState(null);
  const [flightId, setFlightId] = useState(null);
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flightsReducer.flights);
  const user = useSelector((state) => state.authReducer.user);
  useEffect(() => { if (success) dispatch(resetReservation()); }, [success]);
  return (

    <>
      {success && <Navigate to="/reservations" replace />}
      {
        user && (
        <main
          className="add-reservation-container relative-ns absolute-m absolute w-auto-ns w-100-m w-100 add-reservation
          flex relative flex-column items-center justify-center
          mt3-ns mt0-m mt0 mr3-ns mr0-m mr0 mb0 ml0-ns ml0-m ml0"
          style={{ zIndex: 5, gap: '1rem' }}
        >
          <h1 className="ma0 white">Book your flight</h1>
          <hr className="white w5 m0" />
          <p className="tc f4-ns f5-m f5 white lh-copy ma0">
            <span className="db">You can reserve to more than 4000 cities around the world.</span>
            <span className="db">There are lot of flights. Pick your seat now!</span>
          </p>
          <div style={{ zIndex: -1 }} className="background absolute w-100 h-100" />
          <div className="custom-select w-20-ns w-50-m w-50">

            <select
              className="w-100 br3 ba b--white pa2"
              name="flight"
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="" hidden>Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <input
            className="white w-20-ns w-50-m w-50 br3 ba b--white pa2 pl0 pr0 bg-transparent"
            type="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="custom-select w-20-ns w-50-m w-50">
            {
      flights && !itemId && (
        <select
          className="w-100 br3 ba b--white pa2"
          name="flight"
          onChange={(e) => setFlightId(e.target.value)}
        >
          <option value="" hidden>Select a flight</option>
          {flights.map((flight) => (
            <option key={flight.id} value={flight.id}>
              {flight.name}
            </option>
          ))}
        </select>
      )
      }
          </div>
          <button
            style={{
              flex: 0,
              color: 'rgba(150, 191, 1, 0.85)',
              borderRadius: '2rem',
              padding: '1rem 2.8rem',
            }}
            className="pointer fw6 bg-white b--none"
            type="button"
            onClick={() => dispatch(createReservation({
              city,
              date,
              item_id: itemId ? parseInt(itemId.item_id, 10) : parseInt(flightId, 10),
              user_id: user.id,
            }))}
          >
            Reserve
          </button>
          {error.length > 0 && <p className="red shadow-5 f4 pa1 fw6 b">{error}</p>}
        </main>
        )
      }
    </>
  );
};

export default AddReservation;
