import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Proptypes from 'prop-types';
import { CustomNextArrow, CustomPrevArrow } from './CustomArrows';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export function Flight(props) {
  const {
    name, flightNumber, image, price,
  } = props;

  return (
    <div className="itemsContainer">
      <img className="itemImage" src={image} alt="itemImage" />
      <h2>{name}</h2>
      <h3>{flightNumber}</h3>
      <h3>{price}</h3>
    </div>
  );
}

Flight.propTypes = {
  name: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  flightNumber: Proptypes.number.isRequired,
  price: Proptypes.number.isRequired,
};

function Flights() {
  const flights = useSelector((state) => state.flightsReducer.flights);
  const navigate = useNavigate();
  const path = useSelector((state) => state.authReducer.path);

  useEffect(() => {
    if (path) navigate(path);
  }, [path]);
  return (
    <section className="MainPage">
      <div className="MainTitle">
        <h1>Recommended Flights</h1>
        <p>please select a flight</p>
      </div>
      <Carousel
        // partialVisible
        autoPlay
        // focusOnSelect
        centerMode
        swipeable
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr // means to render carousel on server-side.
        infinite
        autoPlaySpeed={2000}
        keyBoardControl
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        customRightArrow={<CustomPrevArrow />}
        customLeftArrow={<CustomNextArrow />}
      >
        {
          flights.map((Item) => (
            <Link to={`Item_detail/${Item.id}`} key={Item.id}>
              <Flight
                name={Item.name}
                image={Item.image}
                flightNumber={Item.flight_number}
                price={Item.price}
              />
            </Link>
          ))
        }
      </Carousel>
    </section>
  );
}

export default Flights;
