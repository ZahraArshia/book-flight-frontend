import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReservation } from '../../../redux/Reservations/Reservations';

const Reservation = ({
  id, name, image, price, city, date,
}) => {
  const userId = useSelector((state) => state.authReducer.user.id);
  const dispatch = useDispatch();
  return (
    <div className="reservation flex items-center center w-100">
      <img alt="flight-pic" className="w-25 br3 flex items-center" src={image} style={{ height: '30vh' }} />
      <p className="white flex flex-column flex items-center" style={{ gap: '0.5rem' }}>
        <span className="db">
          Flight name:
          {` ${name}`}
        </span>
        <span className="db">
          Price:
          {` ${price}$`}
        </span>
        <span className="db">
          City:
          {` ${city}`}
        </span>
      </p>
      <p className=" white flex justify-center">
        {date}
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          className="pointer w4 white b--none br3 pa2"
          style={{ background: 'transparent', border: '1px solid #8fb601' }}
          onClick={() => dispatch(deleteReservation({ id, user_id: userId }))}
        >
          Cancel Reservation
        </button>
      </div>
    </div>
  );
};

Reservation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
export default Reservation;
