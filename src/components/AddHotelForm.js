import React, { useState } from 'react';
import axios from 'axios';

const AddHotelForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [amenities, setAmenities] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrlArray = imageUrl.split(',').map((url) => url.trim());
    const amenitiesArray = amenities.split(',').map((amenity) => amenity.trim());

    const newHotel = {
      name,
      description,
      price,
      address,
      location,
      imageUrl: imageUrlArray,
      amenities: amenitiesArray,
    };

    try {
      const response = await axios.post('http://localhost:2345/api/hotels/add-hotel', newHotel);
      console.log('Hotel added:', response.data);

      // Provide user feedback (e.g., show a success message)
      alert('Hotel added successfully');

      // Clear form fields
      setName('');
      setDescription('');
      setPrice('');
      setAddress('');
      setLocation('');
      setImageUrl('');
      setAmenities('');
    } catch (error) {
      console.error('Error adding hotel:', error);
      // Provide user feedback (e.g., show an error message)
      alert('Error adding hotel. Please try again later.');
    }
  };

  return (
    <div className="add-hotel">
      <h2>Add Hotel</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Hotel Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="price">Price:</label>
        <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />

        <label htmlFor="imageUrl">Image URL (comma-separated):</label>
        <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <label htmlFor="amenities">Amenities (comma-separated):</label>
        <input type="text" id="amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} />

        <button type="submit">Add Hotel</button>
      </form>
    </div>
  );
};

export default AddHotelForm;

