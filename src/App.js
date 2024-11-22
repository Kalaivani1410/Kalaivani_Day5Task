import React from 'react';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <BookingForm />
      <BookingList />
    </div>
  );
};

export default App;
