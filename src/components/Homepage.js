import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
    <div className="itemsCard">
      <img className="itemImage" src={image} alt="itemImage" />
      <h2 className="margin">{name}</h2>
      <h3 className="margin">
        Flight Number:
        {flightNumber}
      </h3>
      <h3 className="margin">
        Price: $
        {price}
      </h3>
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

  return (
    flights.length > 0 && (
    <section className="MainPage">
      <div className="MainTitle">
        <h1>Recommended Flights</h1>
        <p>please select a flight</p>
      </div>
      <Carousel
        // partialVisible
        autoPlay
        // focusOnSelect
        // centerMode
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
        itemClass="carousel-item-padding-80-px"
        customRightArrow={<CustomPrevArrow />}
        customLeftArrow={<CustomNextArrow />}
      >
        {
          flights.map((item) => (
            <NavLink to={`Item_detail/${item.id}`} state={{ item }} key={item.id}>
              <Flight
                name={item.name}
                image={item.image}
                flightNumber={item.flight_number}
                price={item.price}
              />
            </NavLink>
          ))
        }
      </Carousel>
    </section>
    )
  );
}

export default Flights;
