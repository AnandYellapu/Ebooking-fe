import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowRoundBack, IoMdCreate, IoMdTrash, IoIosBed } from 'react-icons/io';
import { TbAirConditioning, TbToolsKitchen2 } from 'react-icons/tb';
import { AiOutlineWifi } from 'react-icons/ai';
import { PiTelevisionSimpleFill, PiCoffee } from 'react-icons/pi';
import { GiPowerGenerator, GiElevator } from 'react-icons/gi';
import { FaHotTub, FaParking, FaFireExtinguisher, FaSwimmingPool, FaUmbrellaBeach } from 'react-icons/fa';
import { MdBalcony, MdKitchen, MdRoomService, MdSmokeFree, MdBathroom } from 'react-icons/md';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { confirmAlert } from 'react-confirm-alert'; // Import the confirmAlert function
import 'react-confirm-alert/src/react-confirm-alert.css';

const HotelDetails = () => {
  const [hotel, setHotel] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numRooms, setNumRooms] = useState(1);
  const [numGuests, setNumGuests] = useState(2);

  useEffect(() => {
    const fetchHotelDetails = async (id) => {
      try {
        const response = await axios.get(`https://ebooking-7qqn.onrender.com/api/hotels/${id}`);
        setHotel(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching hotel details');
        setLoading(false);
      }
    };

    fetchHotelDetails(params.id);
  }, [params.id]);

  const handleDeleteHotel = () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this hotel?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`https://ebooking-7qqn.onrender.com/api/hotels/${params.id}`);
              // Redirect to the home page after successful deletion
              navigate('/');
            } catch (error) {
              console.error('Error deleting hotel:', error);
              // Handle error response, display an error message, or take appropriate action
            }
          },
        },
        {
          label: 'No',
          onClick: () => {}, // Do nothing when the user clicks "No"
        },
      ],
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!hotel) {
    return <div className="not-found">Hotel not found</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getAmenityIconComponent = (amenity) => {
    switch (amenity) {
      case 'AC':
        return <TbAirConditioning />;
      case 'TV':
        return <PiTelevisionSimpleFill />;
      case 'Free Wifi':
        return <AiOutlineWifi />;
      case 'Balcony':
        return <MdBalcony />;
      case 'Coffee':
        return <PiCoffee />;
      case 'Kitchen':
        return <TbToolsKitchen2 />;
      case 'Fridge':
        return <MdKitchen />;
      case 'Swimming Pool':
        return <FaSwimmingPool />;
      case 'Queen Size Bed':
        return <IoIosBed />;
      case 'Beach NearBy':
        return <FaUmbrellaBeach />;
      case 'Attached Bathroom':
        return <MdBathroom />;
      case 'Room Service':
        return <MdRoomService />;
      case 'Card Accept':
        return <BsFillCreditCardFill />;
      case 'Fire':
        return <FaFireExtinguisher />;
      case 'Geyser':
        return <FaHotTub />;
      case 'No smoke':
        return <MdSmokeFree />;
      case 'Power Backup':
        return <GiPowerGenerator />;
      case 'Elevator':
        return <GiElevator />;
      case 'Car Parking':
        return <FaParking />;
      default:
        return null;
    }
  };

  return (
    <div className="hotel-details">
      <div className="buttons-container">
        <Link to="/home" className="back-button">
          <IoIosArrowRoundBack /> Back
        </Link>
      </div>
      <div className="image-container">
        <Slider {...sliderSettings}>
          {hotel.imageUrl.map((url, index) => (
            <div key={index}>
              <img src={url} alt={hotel.name} className="hotel-image" />
            </div>
          ))}
        </Slider>
      </div>
      <h2 className="hotel-name">{hotel.name}</h2>
      <p className="hotel-address">{hotel.address}</p>
      <div className="hotel-description">
        <span className="span-des">Description</span>
        <br />
        <span className="description-content">{hotel.description}</span>
      </div>
      <div className="hotel-amenities">
        <span className="span-ame">Amenities</span>
        <br />
        <div className="amenities-list">
          {hotel.amenities.map((amenity, index) => (
            <div key={index} className="amenity">
              {getAmenityIconComponent(amenity)} {amenity}
            </div>
          ))}
        </div>
      </div>
      <div className="card-thing">
        <div className="label-input-container">
          <label htmlFor="rooms">Rooms:</label>
          <input
            type="number"
            id="rooms"
            value={numRooms}
            onChange={(e) => setNumRooms(e.target.value)}
          />
        </div>
        <div className="label-input-container">
          <label htmlFor="guests">Guests per Room:</label>
          <input
            type="number"
            id="guests"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
          />
        </div>
      </div>
      <div className="per-night">
        <h4>per-night</h4>
        <button className="book-now-button">
          <Link
            to={`/booking/${params.id}?rooms=${numRooms}`}
            className="book-link"
          >
            Book Now
          </Link>
        </button>
      </div>
      <div className="button-container">
        <Link to={`/update-hotel/${params.id}`} className="update-button">
          <IoMdCreate />
        </Link>
        <button className="delete-button" onClick={handleDeleteHotel}>
          <IoMdTrash />
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;
