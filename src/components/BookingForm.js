import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [fare, setFare] = useState(null); // 'fare' is now being used
  const [message, setMessage] = useState('');

  // Function to calculate fare
  const calculateFare = (pickup, dropoff) => {
    // Example logic to calculate fare based on pickup and dropoff locations
    return Math.floor(Math.random() * 100) + 20;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculatedFare = calculateFare(pickup, dropoff);

    try {
      const response = await axios.post('http://localhost:5000/bookings', { pickup, dropoff, fare: calculatedFare });
      console.log(response.data); // Log response for debugging

      setMessage(`Booking successful! Estimated Fare: $${calculatedFare}`);
      setPickup('');
      setDropoff('');
      setFare(calculatedFare); // Update the fare state with the calculated fare
    } catch (error) {
      setMessage('Error booking taxi!');
    }
  };

  return (
    <div className="form-container">
        <img src="/logo.png" alt="Taxi Booking Logo" className="logo" />
      <h2>Ride the Future, Book Your Taxi Now!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pickup Location:</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Drop-off Location:</label>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Taxi</button>
        {message && <p>{message}</p>}
        {fare && <p>Estimated Fare: ${fare}</p>} {/* Displaying the fare value */}
      </form>
    </div>
  );
};

export default BookingForm;
