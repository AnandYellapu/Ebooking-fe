import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/e-logoo.jpg'; // Import the logo image

const OpeningPage = () => {
  return (
    <div className="opening-page-container">
      <img src={logo} alt="App Logo" className="app-logo" />
      <h1 className="welcome-heading">Welcome to our Hotel EBooking</h1>
      <p className="app-description1">
        Discover a world of exceptional hotels for your next adventure.
      </p>
      <p className="get-started-text">
        Ready to embark on your journey? Sign in or register to start booking!
      </p>
      <Link to="/home">
        <button className="get-started-button">Get Started</button>
      </Link>
      <p className="explore-more">
        Explore more and discover the world with our Hotel Booking App.
      </p>
    </div>
  );
};

export default OpeningPage;
