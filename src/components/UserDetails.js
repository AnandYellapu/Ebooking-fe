import React, { useState } from 'react';

const UserDetails = ({ onSave, onCancel }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    billingAddress: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
  };

  return (
    <div className="user-details-container1">
      <h2 className='user-detail1'>User Details</h2>
      <form onSubmit={handleSubmit} className="user-details-form1">
        <div className="form-row1">
          <label className='label-label'>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row1">
          <label className='label-label'>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row1">
          <label className='label-label'>Billing Address:</label>
          <input
            type="text"
            name="billingAddress"
            value={userData.billingAddress}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="save-button1">Save</button>
        <button onClick={onCancel} className="cancel-button1">Cancel</button>
      </form>
    </div>
  );
};

export default UserDetails;
