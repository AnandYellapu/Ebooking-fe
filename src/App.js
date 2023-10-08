// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import About from './pages/About';
// import HotelDetail from './components/HotelDetail';
// import AddHotelForm from './components/AddHotelForm'; 
// import ContactPage from './components/ContactPage'; 
// import UpdateHotelForm from './components/UpdateHotelForm'; 
// import BookingPage from './components/BookingPage';
// import BookingConfirmationPage from './components/BookingConfirmationPage';
// import StripeContainer from './components/StripeContainer';
// import NotFound from './pages/NotFound'; 
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';

// function App() {
//   return (
//     <BrowserRouter>
//         <Header />
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/hotel/:id" element={<HotelDetail />} />
//             <Route path="/contact-page" element={<ContactPage />} />
//             <Route path="/add-hotel" element={<AddHotelForm />} />
//             <Route path="/update-hotel/:id" element={<UpdateHotelForm />} />
//             <Route path="/booking/:id" element={<StripeContainer><BookingPage /></StripeContainer>} />
//             <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         <Footer />
//         <ToastContainer />
//     </BrowserRouter>
//   );
// }

// export default App;





import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import HotelDetail from './components/HotelDetail';
import AddHotelForm from './components/AddHotelForm'; 
import ContactPage from './components/ContactPage'; 
import UpdateHotelForm from './components/UpdateHotelForm'; 
import BookingPage from './components/BookingPage';
import BookingConfirmationPage from './components/BookingConfirmationPage';
import StripeContainer from './components/StripeContainer';
import NotFound from './pages/NotFound'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OpeningPage from './pages/OpeningPage';
import Logout from './components/auth/Logout';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/home" element={<>
          <Header />
          <Home />
          <Footer />
        </>} />
        <Route path="/about" element={<>
          <Header />
          <About />
          <Footer />
        </>} />
        <Route path="/hotel/:id" element={<>
          <Header />
          <HotelDetail />
          <Footer />
        </>} />
        <Route path="/contact-page" element={<>
          <Header />
          <ContactPage />
          <Footer />
        </>} />
        <Route path="/add-hotel" element={<>
          <Header />
          <AddHotelForm />
          <Footer />
        </>} />
        <Route path="/update-hotel/:id" element={<>
          <Header />
          <UpdateHotelForm />
          <Footer />
        </>} />
        <Route path="/booking/:id" element={<>
          <Header />
          <StripeContainer>
            <BookingPage />
          </StripeContainer>
          <Footer />
        </>} />
        <Route path="/booking-confirmation" element={<>
          <Header />
          <BookingConfirmationPage />
          <Footer />
        </>} />
        <Route path="/logout" element={<>
          <Header />
          <Logout />
          <Footer />
        </>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;





// <Route path="/booking/:id" element={<BookingPage />} />