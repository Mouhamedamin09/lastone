import React, { useState } from 'react';
import savedData from './data';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState({ name: '', type: '' });
  const [filteredCities, setFilteredCities] = useState(Object.keys(savedData));

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    // Filter cities based on input value
    const filtered = Object.keys(savedData).filter((city) =>
      city.includes(newValue)
    );
    setFilteredCities(filtered);

    setShowDropdown(newValue !== ''); // Show dropdown only if there's input
  };

  const handleSelectCity = (cityName) => {
    const selectedType = savedData[cityName];
    setSelectedCity({
      name: cityName,
      type: selectedType
    });
    setInputValue(`${cityName} - ${selectedType}`);
    setShowDropdown(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">City Selector</h1>
      <div className="input-container">
        <input
          type="text"
          id="cityInput"
          className="input"
          placeholder="Start typing..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
        />
        {showDropdown && (
          <div className="city-dropdown">
            {filteredCities.map((cityName) => (
              <div
                key={cityName}
                className="dropdown-item"
                onClick={() => handleSelectCity(cityName)}
              >
                <h1>{cityName}</h1>
                <p>{savedData[cityName]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedCity.name && (
        <div className="selected-city">
          Selected city: {selectedCity.name}
          <br />
          Type: {selectedCity.type}
        </div>
      )}
      <footer className="footer">Created by Mohamedamin Kraiem</footer>
    </div>
  );
}

export default App;
