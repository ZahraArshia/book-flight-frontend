import './Reservations.css';
import { useSelector } from 'react-redux';
import Reservation from './Reservation/Reservation';

const ReservationList = () => {
  const { reservations } = useSelector((state) => state.reservationsReducer.reservations);
  const pending = useSelector((state) => state.reservationsReducer.pending);
  const error = useSelector((state) => (state.reservationsReducer.error
    ? state.reservationsReducer.error : ''));
  return (
    <div className="static-ns absolute-m absolute">
      <h1 className="tc" style={{ marginRight: '2rem' }}>reservations</h1>
      <section className="flex flex-column center" id="reservations">
        <div className="flex items-center center w-100">
          <p style={{ flex: 1 }} className="pa1 bg-black white flex justify-center">Image</p>
          <p style={{ flex: 1 }} className="pa1 bg-black white flex justify-center">Details</p>
          <p style={{ flex: 1 }} className="pa1 bg-black white flex justify-center">Date</p>
          <p style={{ flex: 1 }} className="pa1 bg-black white flex justify-center">Action</p>
        </div>
        {pending && <p>Loading...</p>}
        {reservations && reservations.length === 0 && <p>You don&apos;t have any reservations!</p>}
        {
           reservations
           && reservations.map((reservation) => {
             const {
               id, name, flight_number: flightNumber, image, price, city, date,
             } = reservation;
             return (
               <Reservation
                 key={id}
                 id={id}
                 name={name}
                 flightNumber={flightNumber}
                 image={image}
                 price={price}
                 city={city}
                 date={date}
               />
             );
           })
        }
        {error.Error && <p>{error}</p>}
      </section>
    </div>
  );
};
export default ReservationList;
