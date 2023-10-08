// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
// import { ImPriceTag } from 'react-icons/im';

// function App() {
//   const [hotels, setHotels] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

//   useEffect(() => {
//     const token = sessionStorage.getItem('token');

//     if (!token) {
//       console.error('No token, cannot fetch');
//       return;
//     }

//     const headers = {
//       'Content-Type': 'application/json',
//       'x-auth-token': token,
//     };

//     axios
//       .get('https://ebooking-7qqn.onrender.com/api/hotels/home', { headers })
//       .then((response) => {
//         setHotels(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         // You may want to handle the error or show a user-friendly message here
//       });
//   }, []);

//   const priceRanges = [
//     { label: 'Below ₹500', min: 0, max: 500 },
//     { label: '₹500 - ₹1000', min: 500, max: 1000 },
//     { label: '₹1000 - ₹1500', min: 1000, max: 1500 },
//     { label: '₹1500 - ₹2000', min: 1500, max: 2000 },
//     { label: 'Above ₹2000', min: 2000, max: Infinity }
//   ];

//   const handleSearchTermChange = (newSearchTerm) => {
//     setSearchTerm(newSearchTerm);
//   };

//   const handlePriceRangeChange = (selectedRange) => {
//     if (selectedPriceRanges.includes(selectedRange)) {
//       setSelectedPriceRanges(
//         selectedPriceRanges.filter((range) => range !== selectedRange)
//       );
//     } else {
//       setSelectedPriceRanges([...selectedPriceRanges, selectedRange]);
//     }
//   };

//   const filteredHotels = hotels
//     .filter((hotel) => hotel.location.toLowerCase().includes(searchTerm.toLowerCase()))
//     .filter((hotel) => {
//       if (selectedPriceRanges.length === 0) {
//         return true;
//       }
//       return selectedPriceRanges.some(
//         (selectedRange) =>
//           hotel.price >= priceRanges.find((range) => range.label === selectedRange).min &&
//           hotel.price <= priceRanges.find((range) => range.label === selectedRange).max
//       );
//     });

//   return (
//     <div className="app-container">
//       <div className="search-container">
//         <FaSearch />
//         <input
//           type="text"
//           placeholder="Search by location"
//           value={searchTerm}
//           onChange={(e) => handleSearchTermChange(e.target.value)}
//         />
//       </div>
//       <div className="price-filter">
//         <h4>Filter by Price Range:</h4>
//         {priceRanges.map((range) => (
//           <label key={range.label}>
//             <input
//               type="checkbox"
//               value={range.label}
//               checked={selectedPriceRanges.includes(range.label)}
//               onChange={() => handlePriceRangeChange(range.label)}
//             />
//             {range.label}
//           </label>
//         ))}
//       </div>
//       <div className="card-list">
//         {filteredHotels.map((hotel) => (
//           <div className="card" key={hotel.id}>
//             <img className="card-image" src={hotel.imageUrl} alt={hotel.name} />
//             <h3 className="card-title">{hotel.name}</h3>
//             <p className="card-price">
//               <ImPriceTag /> ₹{hotel.price} per-night
//             </p>
//             <p className="card-location">
//               <FaMapMarkerAlt /> {hotel.location}
//             </p>
//             <Link to={`/hotel/${hotel._id}`} className="button view-button">
//             <span>View Details</span>
//           </Link>
//           <Link to={`/booking/${hotel._id}`} className="button book-button">
//             <span>Book Now</span>
//           </Link>          
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { ImPriceTag } from 'react-icons/im';

function App() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // New state to store admin status

  useEffect(() => {
    const token = sessionStorage.getItem('token');
  
    if (!token) {
      console.error('No token, cannot fetch');
      return;
    }
  
    console.log('Decoding token...');
    const decodedToken = parseJwt(token);
    console.log('Decoded token:', decodedToken);
  
    // Check if the user is an admin after decoding the token
    if (decodedToken && decodedToken.user && decodedToken.user.role === 'admin') {
      console.log('User is an admin.');
      setIsAdmin(true);
    } else {
      console.log('User is not an admin.');
    }
  
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    };
  
    axios
      .get('https://ebooking-7qqn.onrender.com/api/hotels/home', { headers })
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // You may want to handle the error or show a user-friendly message here
      });
  }, []);

  const priceRanges = [
    { label: 'Below ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹1500', min: 1000, max: 1500 },
    { label: '₹1500 - ₹2000', min: 1500, max: 2000 },
    { label: 'Above ₹2000', min: 2000, max: Infinity }
  ];

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handlePriceRangeChange = (selectedRange) => {
    if (selectedPriceRanges.includes(selectedRange)) {
      setSelectedPriceRanges(
        selectedPriceRanges.filter((range) => range !== selectedRange)
      );
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, selectedRange]);
    }
  };

  const filteredHotels = hotels
    .filter((hotel) => hotel.location.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((hotel) => {
      if (selectedPriceRanges.length === 0) {
        return true;
      }
      return selectedPriceRanges.some(
        (selectedRange) =>
          hotel.price >= priceRanges.find((range) => range.label === selectedRange).min &&
          hotel.price <= priceRanges.find((range) => range.label === selectedRange).max
      );
    });

  return (
    <div className="app-container">
      <div className="search-container">
        <FaSearch />
        <input
          type="text"
          placeholder="Search by location"
          value={searchTerm}
          onChange={(e) => handleSearchTermChange(e.target.value)}
        />
      </div>
      <div className="price-filter">
        <h4>Filter by Price Range:</h4>
        {priceRanges.map((range) => (
          <label key={range.label}>
            <input
              type="checkbox"
              value={range.label}
              checked={selectedPriceRanges.includes(range.label)}
              onChange={() => handlePriceRangeChange(range.label)}
            />
            {range.label}
          </label>
        ))}
      </div>
      <div className="card-list">
        {filteredHotels.map((hotel) => (
          <div className="card" key={hotel.id}>
            <img className="card-image" src={hotel.imageUrl} alt={hotel.name} />
            <h3 className="card-title">{hotel.name}</h3>
            <p className="card-price">
              <ImPriceTag /> ₹{hotel.price} per-night
            </p>
            <p className="card-location">
              <FaMapMarkerAlt /> {hotel.location}
            </p>
            <Link to={`/hotel/${hotel._id}`} className="button view-button">
              <span>View Details</span>
            </Link>
            <Link to={`/booking/${hotel._id}`} className="button book-button">
              <span>Book Now</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export default App;
