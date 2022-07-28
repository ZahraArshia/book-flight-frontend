import { useParams, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DetailsPage = () => {
  const { id } = useParams();
  const createdFlight = useSelector((state) => state.flightsReducer.createdFlight);
  const { state } = useLocation();
  const { item } = state || { item: createdFlight } || { item: null };
  return (
    item && (
    <div className="detailMain">
      <div>
        <img className="detailPic" alt="flight-pic" src={item.image} />
        <Link to="/">
          <button
            type="button"
            className="CustomPrevArrow"
          >
            <img alt="prev" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/36/ffffff/external-Chevron-arrows-tanah-basah-glyph-tanah-basah-4.png" />
          </button>
        </Link>
      </div>
      <div className="cardDetails">
        <ul className="detailsList">
          <li>
            Flight name:
            {' '}
            {item.name}
          </li>
          <li>
            Flight number:
            {' '}
            {item.flight_number}
          </li>
          <li>
            Price:
            {' '}
            $
            {item.price}
          </li>
        </ul>
        <Link to="/reservations/add" state={{ item_id: `${id}` }}>
          <button
            type="button"
            className="reserve-btn"
          >
            Reserve
          </button>
        </Link>
        {/* <NavLink to="/reservations/add" state={{ item_id: `${id}` }}>
          Reserve
        </NavLink> */}
      </div>
    </div>
    )
  );
};

export default DetailsPage;
