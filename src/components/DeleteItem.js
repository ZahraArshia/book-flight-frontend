import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFlights, remove } from '../redux/flights/flights';

const DeleteItem = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const userFlights = useSelector((state) => state.flightsReducer.userFlights);
  useEffect(() => {
    if (user) {
      dispatch(fetchUserFlights(user.id));
    }
  }, [user]);

  return (
    userFlights && (
    <div>
      <h1 className="DeleteItemText">Delete Item</h1>
      <ul className="flightInfo">
        {userFlights.map((flight) => (
          <li key={flight.id} className="flightCard">
            <div className="flightPic">
              <img alt="flight-pic" src={flight.image} className="flightImage" />
            </div>
            <div className="flightDetails">

              <p className="labelName">
                Name:
                { flight.name }
              </p>
              <p className="labelName">
                Flight number:
                { flight.flight_number}
              </p>
              <p className="labelName">
                Price: $
                {flight.price}
              </p>

              <button type="button" onClick={() => dispatch(remove(flight.id))} className="AddItemButton">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    )
  );
};
export default DeleteItem;
