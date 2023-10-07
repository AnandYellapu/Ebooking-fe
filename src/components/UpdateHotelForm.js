import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateHotelForm = ({ id }) => {
    const params = useParams();
    const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [amenities, setAmenities] = useState('');

  useEffect(() => {
    // Fetch the hotel data based on the hotelId and populate the form
    const fetchHotelData = async (id) => {
      try {
        const response = await axios.get(`https://ebooking-7qqn.onrender.com/api/hotels/${id}`);
        const hotelData = response.data.data;

        setName(hotelData.name);
        setDescription(hotelData.description);
        setPrice(hotelData.price);
        setAddress(hotelData.address);
        setLocation(hotelData.location);
        setImageUrl(hotelData.imageUrl.join(', ')); // Join image URLs into a single string
        setAmenities(hotelData.amenities.join(', ')); // Join amenities into a single string
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData(params.id);
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrlArray = imageUrl.split(',').map(url => url.trim());
    const amenitiesArray = amenities.split(',').map(amenity => amenity.trim());

    const updatedHotel = {
      name,
      description,
      price,
      address,
      location,
      imageUrl: imageUrlArray,
      amenities: amenitiesArray,
    };

    try {
      await axios.put(`https://ebooking-7qqn.onrender.com/api/hotels/update-hotel/${params.id}`, updatedHotel);
        console.log('Hotel updated successfully');
         navigate(`/hotel/${params.id}`);
      // You can add a callback or redirection logic here after successful update
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

  return (
    <div className="update-hotel">
      <h2>Update Hotel</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <label>Amenities:</label>
        <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} />

        <button type="submit">Update Hotel</button>
      </form>
    </div>
  );
};

export default UpdateHotelForm;
