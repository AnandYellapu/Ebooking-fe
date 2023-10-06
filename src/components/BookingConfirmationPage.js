import React from 'react';
import { useLocation } from 'react-router-dom';
import { BiCheckCircle } from 'react-icons/bi';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const bookingDetails = location.state && location.state.bookingDetails;

  if (!bookingDetails) {
    return <p className="error-message">No booking details found.</p>;
  }

  return (
    <div className="confirmation-container">
      <BiCheckCircle className="confirmation-icon" />

      <h2 className="confirmation-heading">Booking Confirmation</h2>
      <p className="confirmation-detail-name">Hotel Name: {bookingDetails.hotelName}</p>
      <p className="confirmation-detail-address">Hotel Address: {bookingDetails.hotelAddress}</p>
      <p className="confirmation-detail-start">Start Date: {bookingDetails.startDate}</p>
      <p className="confirmation-detail-end">End Date: {bookingDetails.endDate}</p>
      <p className="confirmation-detail-rooms">
        Number of Rooms: {bookingDetails.numRooms}
      </p>
      <p className="confirmation-detail-price">
        Discounted Price: {bookingDetails.discountedPrice}
      </p>

      <div className="additional-details">
        <h3>Additional Details</h3>
        <p>
          Thank you for choosing {bookingDetails.hotelName} for your stay! If you have
          any special requests or need further assistance, please contact our customer
          service at <strong>support@ebooking.com</strong>.
        </p>
      </div>

      <div className="stay-information">
        <h3>Stay Information</h3>
        <p>
          Your reservation is confirmed for {bookingDetails.numRooms} room(s) from{' '}
          {bookingDetails.startDate} to {bookingDetails.endDate}.
        </p>
        <p>
          We hope you have a wonderful and comfortable stay at {bookingDetails.hotelName}!
        </p>
      </div>

      <p className="confirmation-message">Thank you for your booking!</p>
    </div>
  );
};

export default BookingConfirmationPage;