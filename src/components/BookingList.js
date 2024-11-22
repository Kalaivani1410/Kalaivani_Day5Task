import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching bookings', error));
  }, []);

  return (
    <div className="booking-list">
      <h2>All Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Pickup</th>
            <th>Drop-off</th>
            <th>Fare ($)</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.pickup}</td>
              <td>{booking.dropoff}</td>
              <td>{booking.fare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
