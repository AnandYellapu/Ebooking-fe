
import React, { useState, useEffect, useCallback } from 'react';
import room1 from '../assets/images/room1.jpg';
import room2 from '../assets/images/room2.jpg';
import room3 from '../assets/images/room3.jpg';
import CardList from './CardList';

function Home() {
  const roomImages = [room1, room2, room3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % roomImages.length);
  }, [roomImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + roomImages.length) % roomImages.length);
  }, [roomImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [nextSlide]);

  return (
    <div className="slideshow-container">
      <h1 className="app-title">Welcome to EBooking </h1>
      <div className="slideshow">
        <button className="slide-arrow prev" onClick={prevSlide}>
          &lt;
        </button>
        {roomImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Elegant Hotel Room ${index + 1}`}
            className={`slide ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
        <button className="slide-arrow next" onClick={nextSlide}>
          &gt;
        </button>
      </div>

      <p className='more'>Explore More Rooms</p>
      <CardList />
    </div>
  );
}

export default Home;
