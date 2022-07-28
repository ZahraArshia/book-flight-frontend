import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { post } from '../redux/flights/flights';

const AddItem = () => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [price, setPrice] = useState('');

  const imageToSrc = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const result = await reader.result;
      setImageSrc(result);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(post({
      name, image: imageSrc, flight_number: flightNumber, price, user_id: user.id,
    }, navigate));
    setName('');
    setImage('');
    setFlightNumber('');
    setPrice('');
  };

  return (
    user && (
    <div className="AddItemCard">
      <h1 className="AddItemCard-title">Add New Flight</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="AddItemCardform-group">
        <label htmlFor="name" className="labelName">
          Name:
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="AddItem-Input" />
        </label>
        <label htmlFor="image" className="labelImage">
          Image:
          <input
            className="AddItem-Input"
            type="button"
            onClick={() => {
              const imageInput = document.querySelector('#add-image');
              imageInput.click();
            }}
            value={image ? `${image.split('\\')[2]}` : 'Flight image'}
          />
          <input
            id="add-image"
            className="dn"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.value);
              imageToSrc(e.target.files[0]);
            }}
          />
        </label>
        <label htmlFor="flightNumber" className="labelFlight">
          Flight Number:
          <input type="text" name="flightNumber" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} className="AddItem-Input" />
        </label>
        <label htmlFor="price" className="labelPrice">
          Price: $
          <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="AddItem-Input" />
        </label>
        <input type="submit" value="Submit" className="AddItemButton" />
      </form>
    </div>
    )
  );
};

export default AddItem;
