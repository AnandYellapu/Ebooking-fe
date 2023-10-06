import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import { MdOutlineCelebration } from 'react-icons/md';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [bookingData, setBookingData] = useState({
    discountedPrice: '',
    startDate: '',
    endDate: '',
    numRooms: 1,
  });
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [savings, setSavings] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:2345/api/hotels/${id}`)
      .then((response) => {
        setHotel(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching hotel details:', error);
      });
  }, [id]);

  useEffect(() => {
    if (hotel && bookingData.startDate && bookingData.endDate) {
      const pricePerRoom = hotel.price;
      const numRooms = bookingData.numRooms;
      const startDate = new Date(bookingData.startDate);
      const endDate = new Date(bookingData.endDate);
      const numDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const originalPrice = pricePerRoom * numRooms * numDays;
      setOriginalPrice(originalPrice);

      const discountPercentage = 10;
      const discountAmount = (originalPrice * discountPercentage) / 100;
      const discountedPrice = originalPrice - discountAmount;
      setDiscountedPrice(discountedPrice.toFixed(0)); // Round to 2 decimal places

      // Calculate the savings
      const savingsAmount = originalPrice - discountedPrice;
      setSavings(savingsAmount);
    }
  }, [hotel, bookingData.startDate, bookingData.endDate, bookingData.numRooms]);

  const showConfirmationDialog = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmBooking = () => {
    setShowConfirmationModal(false);

    // The rest of the booking submission logic
    const bookingDetails = {
      hotelName: hotel.name,
      hotelAddress: hotel.address,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      numRooms: bookingData.numRooms,
      discountedPrice: `₹${discountedPrice}`,
    };

    axios
      .post(`http://localhost:2345/api/bookings/booking/${id}`, {
        hotelId: id,
        ...bookingData,
        discountedPrice: `₹${discountedPrice}`,
        address: hotel.address,
      })
      .then(() => {
        navigate(`/booking-confirmation`, { state: { bookingDetails } });
      })
      .catch((error) => {
        console.error('Error submitting booking:', error);
        navigate('/404');
      });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    // Display the confirmation modal
    showConfirmationDialog();
  };

  return (
    <div className="booking-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <IoIosArrowBack /> Back
      </button>

      {hotel ? (
        <div>
          <h2 className="hotel-name">{hotel.name}</h2>
          <h3 className="hotel-address">{hotel.address}</h3>
          <p className="discounted-price">
            Discounted Price: ₹{discountedPrice}
          </p>
          <p className="savings">
            <span className="savings-icon">
              <MdOutlineCelebration />
            </span>
            <p className='savings-message'> Yay! You have saved ₹{savings} on this booking.</p>
          </p>

          <form onSubmit={handleBookingSubmit}>
            <div className="form-row">
              <div className="date-input">
                <label className="form-label">Start Date:</label>
                <input
                  className="form-input"
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="date-input">
                <label className="form-label">End Date:</label>
                <input
                  className="form-input"
                  type="date"
                  value={bookingData.endDate}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <label className="form-label">Number of Rooms:</label>
            <div className="number-of-rooms-input">
              <button
                className="decrement-button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default button behavior
                  setBookingData({
                    ...bookingData,
                    numRooms: Math.max(1, parseInt(bookingData.numRooms) - 1), // Parse to integer
                  });
                }}
              >
                -
              </button>
              <input
                className="form-input number-of-rooms"
                type="number"
                value={bookingData.numRooms}
                onChange={(e) =>
                  setBookingData({ ...bookingData, numRooms: e.target.value })
                }
              />
              <button
                className="increment-button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default button behavior
                  setBookingData({
                    ...bookingData,
                    numRooms: parseInt(bookingData.numRooms) + 1, // Parse to integer
                  });
                }}
              >
                +
              </button>
            </div>
            <p className="number-of-guests">Number of Guests: {bookingData.numRooms * 2}</p>
            <button className="submit-button1" type="button" onClick={showConfirmationDialog}>
              Confirm Booking
            </button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* The confirmation modal */}
      {showConfirmationModal && (
        <div className="confirmation-modal">
          <p>Are you sure you want to confirm the booking?</p>
          <button onClick={handleConfirmBooking}>Yes</button>
          <button onClick={() => setShowConfirmationModal(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;





// // BookingPage.js
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// // import { Elements } from '@stripe/react-stripe-js';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { IoIosArrowBack } from 'react-icons/io';
// import { MdOutlineCelebration } from 'react-icons/md';
// import StripeContainer from '../components/StripeContainer';

// const BookingPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [hotel, setHotel] = useState(null);
//   const [bookingData, setBookingData] = useState({
//     discountedPrice: '',
//     startDate: '',
//     endDate: '',
//     numRooms: 1,
//   });
//   const [originalPrice, setOriginalPrice] = useState(0);
//   const [discountedPrice, setDiscountedPrice] = useState(0);
//   const [savings, setSavings] = useState(0);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:2345/api/hotels/${id}`)
//       .then((response) => {
//         setHotel(response.data.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching hotel details:', error);
//       });
//   }, [id]);

//   useEffect(() => {
//     if (hotel && bookingData.startDate && bookingData.endDate) {
//       const pricePerRoom = hotel.price;
//       const numRooms = bookingData.numRooms;
//       const startDate = new Date(bookingData.startDate);
//       const endDate = new Date(bookingData.endDate);
//       const numDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
//       const originalPrice = pricePerRoom * numRooms * numDays;
//       setOriginalPrice(originalPrice);

//       const discountPercentage = 10;
//       const discountAmount = (originalPrice * discountPercentage) / 100;
//       const discountedPrice = originalPrice - discountAmount;
//       setDiscountedPrice(discountedPrice.toFixed(0));

//       const savingsAmount = originalPrice - discountedPrice;
//       setSavings(savingsAmount);
//     }
//   }, [hotel, bookingData.startDate, bookingData.endDate, bookingData.numRooms]);

//   const showConfirmationDialog = () => {
//     setShowConfirmationModal(true);
//   };

//   const handleConfirmBooking = async () => {
//     setShowConfirmationModal(false);

//     try {
//       const { token, error } = await stripe.createToken(elements.getElement(CardElement));

//       if (error) {
//         console.error('Error creating token:', error);
//         return;
//       }

//       const bookingDetails = {
//         hotelName: hotel.name,
//         hotelAddress: hotel.address,
//         startDate: bookingData.startDate,
//         endDate: bookingData.endDate,
//         numRooms: bookingData.numRooms,
//         discountedPrice: `₹${discountedPrice}`,
//       };

//       axios
//         .post(`http://localhost:2345/api/bookings/booking/${id}`, {
//           hotelId: id,
//           ...bookingData,
//           discountedPrice: `₹${discountedPrice}`,
//           address: hotel.address,
//           stripeToken: token.id,
//         })
//         .then(() => {
//           navigate(`/booking-confirmation`, { state: { bookingDetails } });
//         })
//         .catch((error) => {
//           console.error('Error submitting booking:', error);
//           navigate('/404');
//         });
//     } catch (error) {
//       console.error('Error handling payment:', error);
//     }
//   };

//   const handleBookingSubmit = (e) => {
//     e.preventDefault();
//     showConfirmationDialog();
//   };

//   return (
//     <StripeContainer>
//       <div className="booking-container">
//         <button className="back-button" onClick={() => navigate(-1)}>
//           <IoIosArrowBack /> Back
//         </button>

//         {hotel ? (
//           <div>
//             <h2 className="hotel-name">{hotel.name}</h2>
//             <h3 className="hotel-address">{hotel.address}</h3>
//             <p className="discounted-price">Discounted Price: ₹{discountedPrice}</p>
//             <p className="savings">
//               <span className="savings-icon">
//                 <MdOutlineCelebration />
//               </span>
//               <p className='savings-message'> Yay! You have saved ₹{savings} on this booking.</p>
//             </p>

//             <form onSubmit={handleBookingSubmit}>
//               <div className="form-row">
//                 <div className="date-input">
//                   <label className="form-label">Start Date:</label>
//                   <input
//                     className="form-input"
//                     type="date"
//                     value={bookingData.startDate}
//                     onChange={(e) =>
//                       setBookingData({ ...bookingData, startDate: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="date-input">
//                   <label className="form-label">End Date:</label>
//                   <input
//                     className="form-input"
//                     type="date"
//                     value={bookingData.endDate}
//                     onChange={(e) =>
//                       setBookingData({ ...bookingData, endDate: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//               <label className="form-label">Number of Rooms:</label>
//               <div className="number-of-rooms-input">
//                 <button
//                   className="decrement-button"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setBookingData({
//                       ...bookingData,
//                       numRooms: Math.max(1, parseInt(bookingData.numRooms) - 1),
//                     });
//                   }}
//                 >
//                   -
//                 </button>
//                 <input
//                   className="form-input number-of-rooms"
//                   type="number"
//                   value={bookingData.numRooms}
//                   onChange={(e) =>
//                     setBookingData({ ...bookingData, numRooms: e.target.value })
//                   }
//                 />
//                 <button
//                   className="increment-button"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setBookingData({
//                       ...bookingData,
//                       numRooms: parseInt(bookingData.numRooms) + 1,
//                     });
//                   }}
//                 >
//                   +
//                 </button>
//               </div>
//               <p className="number-of-guests">Number of Guests: {bookingData.numRooms * 2}</p>
//               <CardElement />
//               <button className="submit-button1" type="button" onClick={handleConfirmBooking}>
//                 Confirm Booking
//               </button>
//             </form>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}

//         {showConfirmationModal && (
//           <div className="confirmation-modal">
//             <p>Are you sure you want to confirm the booking?</p>
//             <button onClick={handleConfirmBooking}>Yes</button>
//             <button onClick={() => setShowConfirmationModal(false)}>No</button>
//           </div>
//         )}
//       </div>
//     </StripeContainer>
//   );
// };

// export default BookingPage;
