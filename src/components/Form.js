import React, { useState } from 'react';
import Location from './Location';
import './Form.css'
import image from '../Images/Home2.jpg'

function Form() {
  const [zipCode, setZipCode] = useState('');
  const [ready, setReady] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setReady(zipCode);
    setSubmitted(true);
  };

  const handleClear = () => {
    setZipCode('');
    setReady(null);
    setSubmitted(false);
  };

  return (
    <div className='Parent-container'>
      <div className="home">
      <div class="image">
        <img src={image} alt="groceries"/>
      </div>
      <div className="content">
        <h3>ZipInfo</h3>
        <span> ZipInfo is your go-to destination for discovering detailed information about any location
        based on its zip code. Whether you're planning a trip, relocating, or just curious, ZipInfo
        makes it easy to explore the world around you.</span>
      </div>
    </div>
    <h1>Search By Zipcode</h1>
      <div className="container">
      <form onSubmit={handleSubmit}>
        <label>

          Enter Zip Code: 
          <p>And scroll down for details</p>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
      </div>
      {submitted && ready && (
        <Location zipCode={zipCode} />
      )}
    </div>
  );
}

export default Form;
