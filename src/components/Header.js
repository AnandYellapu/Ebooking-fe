// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { AiOutlineLogout } from 'react-icons/ai';  // Import the AiOutlineLogout icon
// import logo from '../assets/images/e-logoo.jpg';

// function Header() {
//   const [openNav, setOpenNav] = useState(false);

//   const toggleNav = () => {
//     setOpenNav(!openNav);
//   };

//   return (
//     <header className="header">
//       <div className="logo-booking-container" style={{ backgroundColor: 'salmon' }}>
//         <a href="/">
//           <img src={logo} alt="EBooking Logo" className="logo" />
//         </a>
//         <span className="booking-text">booking</span>
//       </div>
//       <nav className={`navbar ${openNav ? 'open' : ''}`}>
//         <Link to="/home" className="nav-link">
//           Home
//         </Link>
//         <Link to="/about" className="nav-link">
//           About
//         </Link>
//         <div className="nav-item dropdown">
//           <button
//             className="btn btn-dark dropdown-toggle"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             More
//           </button>
//           <ul className="dropdown-menu dropdown-menu-dark">
//             <li>
//               <Link to="/login" className="dropdown-item">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link to="/add-hotel" className="dropdown-item">
//                 Add Hotel
//               </Link>
//             </li>
//           </ul>
          
//         </div>
//         <Link to="/logout" className="nav-link" onClick={toggleNav}>
//             <AiOutlineLogout />
//           </Link>
//       </nav>
//       <button className="nav-toggle" onClick={toggleNav}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </button>
//     </header>
//   );
// }

// export default Header;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoMdCreate, IoMdTrash } from 'react-icons/io'; // Import IoMdCreate and IoMdTrash icons for admin actions
import logo from '../assets/images/e-logoo.jpg';

function Header() {
  const [openNav, setOpenNav] = useState(false);
  const isAdmin = sessionStorage.getItem('token')
    ? JSON.parse(atob(sessionStorage.getItem('token').split('.')[1])).user.role === 'admin'
    : false;

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
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        {isAdmin && (
          <>
            <Link to="/add-hotel" className="nav-link">
              Add Hotel
            </Link>
            <Link to="/admin-panel" className="nav-link">
              Admin Panel
            </Link>
          </>
        )}
        <div className="nav-item dropdown">
          <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <Link to="/login" className="dropdown-item">
                Login
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link to="/admin-settings" className="dropdown-item">
                    Admin Settings
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/logout" className="nav-link" onClick={toggleNav}>
          <AiOutlineLogout />
        </Link>
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
