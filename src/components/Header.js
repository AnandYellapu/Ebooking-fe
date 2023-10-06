import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/e-logoo.jpg';


function Header() {
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <header className="header">
      

  <div className="logo-booking-container" style={{ backgroundColor: 'salmon' }}>
  <a href="/">
    <img src={logo} alt="EBooking Logo" className="logo" />
   </a>
      <span className="booking-text">booking</span>  
</div>
      <nav className={`navbar ${openNav ? 'open' : ''}`}>
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact-page" className="nav-link">Contact
        </Link>
        <Link to="/add-hotel" className="nav-link">More</Link>
      </nav>
      <button className="nav-toggle" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
        </button>
    </header>
  );
}

export default Header;