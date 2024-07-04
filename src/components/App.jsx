/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaClipboard, FaInfoCircle, FaGithub } from 'react-icons/fa';
import { generateFullyCustomPassword } from '../utils/fullyCustomPasswordUtils'; 
import '../style.css';

const App = () => {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12); 
  const [formInputs, setFormInputs] = useState({
    name: '',
    petName: '',
    favoriteSportTeam: '',
    favoriteAthleteArtist: '',
    favoriteSong: '',
    friendNickname: '',
    horoscope: '',
    luckyNumber: '',
    remarkableYear: ''
  });
  const [selectedInputs, setSelectedInputs] = useState({
    name: false,
    petName: false,
    favoriteSportTeam: false,
    favoriteAthleteArtist: false,
    favoriteSong: false,
    friendNickname: false,
    horoscope: false,
    luckyNumber: false,
    remarkableYear: false
  });
  const [showInfo, setShowInfo] = useState(false);
  const [passwordType, setPasswordType] = useState('custom'); 
  const [randomOptions, setRandomOptions] = useState({
    capital: true,
    small: true,
    number: true,
    symbol: true
  });

  const [showParamInfo, setShowParamInfo] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const onlyLetters = /^[a-zA-Z]*$/;
    const maxLengths = {
      name: 16,
      petName: 16,
      favoriteSportTeam: 25,
      favoriteAthleteArtist: 25,
      favoriteSong: 25,
      friendNickname: 25,
      horoscope: 25,
      luckyNumber: 8,
      remarkableYear: 4
    };

    if (
      (name === 'name' || name === 'petName') &&
      (!onlyLetters.test(value) || value.length > maxLengths[name])
    ) {
      return;
    } else if (value.length <= maxLengths[name]) {
      setFormInputs({ ...formInputs, [name]: value });
    }
  };

  const handleCheckboxChange = (inputName) => {
    setSelectedInputs({ ...selectedInputs, [inputName]: !selectedInputs[inputName] });
  };

  const handleRandomOptionsChange = (e) => {
    const { name, checked } = e.target;
    setRandomOptions({ ...randomOptions, [name]: checked });
  };

  // Function to handle password generation based on complexity
  const handleGeneratePassword = () => {
    if (passwordType === 'custom') {
      // Filter out only selected inputs
      const selectedValues = Object.keys(selectedInputs).reduce((acc, key) => {
        if (selectedInputs[key]) {
          acc[key] = formInputs[key];
        }
        return acc;
      }, {});

      // Generate password based on selected inputs and length
      const newPassword = generateFullyCustomPassword(selectedValues, passwordLength);

      // Set generated password
      setGeneratedPassword(newPassword);
    } else {
      // Generate random password based on random options and length
      const newPassword = generateRandomPassword(randomOptions, passwordLength);
      setGeneratedPassword(newPassword);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert('Password copied to clipboard!');
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const getHoverMessage = () => {
    if (passwordType === 'custom') {
      const messages = [];
      if (selectedInputs.name) {
        messages.push('Your name, reversed with alternating case');
      }
      if (selectedInputs.petName) {
        messages.push('Your pet\'s name, reversed with alternating case');
      }
      if (selectedInputs.favoriteSportTeam) {
        messages.push('Initials of your favorite sports team');
      }
      if (selectedInputs.favoriteAthleteArtist) {
        messages.push('Initials of your favorite athlete or artist');
      }
      if (selectedInputs.favoriteSong) {
        messages.push('Your favorite song with alternating case');
      }
      if (selectedInputs.friendNickname) {
        messages.push('Your friend\'s nickname with alternating case');
      }
      if (selectedInputs.horoscope) {
        messages.push('First three letters of your horoscope');
      }
      if (selectedInputs.luckyNumber) {
        messages.push('Your lucky number');
      }
      if (selectedInputs.remarkableYear) {
        messages.push('A remarkable year in your life');
      }

      return messages.length > 0 ? (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      ) : '';
    } else {
      return 'Generated based on random selection of characters.';
    }
  };

  const generateRandomPassword = (options, length) => {
    const characters = {
      capital: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      small: 'abcdefghijklmnopqrstuvwxyz',
      number: '0123456789',
      symbol: '!@#$%^&*()_+[]{}|;:,.<>?'
    };

    let allChars = '';
    if (options.capital) allChars += characters.capital;
    if (options.small) allChars += characters.small;
    if (options.number) allChars += characters.number;
    if (options.symbol) allChars += characters.symbol;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }
    return password;
  };

  return (
    <section>
      
      <div className='container'>
      <header className='app-header'>
          <h1>EZPass</h1>
        </header>
        <h2>EZPass simplifies password creation with easy customization. Tailor your passwords effortlessly using personal inputs, ensuring they are secure and memorable.</h2>

        <form id='pg-form' onSubmit={(e) => e.preventDefault()}>
          <div className='result'>
            <input
              type='text'
              id='result'
              placeholder='Password Generated'
              value={generatedPassword}
              readOnly
            />
            
            <div className='clipboard' onClick={handleCopyToClipboard}>
              <FaClipboard />
            </div>
            <div className='info-icon' onClick={toggleInfo}>
          <FaInfoCircle />
              {showInfo && (
              <div className='info-message-container'>
                {getHoverMessage()}
              </div>
              )}
            </div>

          </div>
          <div className='field'>
            <label htmlFor="length">Length</label>
            <input
              type="number"
              id='length'
              name='passwordLength'
              min={6}
              value={passwordLength}
              onChange={(e) => setPasswordLength(parseInt(e.target.value))}
            />
          </div>
          <div className='field'>
            <label>Password Type</label>
            <select value={passwordType} onChange={(e) => setPasswordType(e.target.value)}>
              <option value='custom'>Custom</option>
              <option value='random'>Random</option>
            </select>
          </div>
          {passwordType === 'custom' && showParamInfo && (
            <div className='param-info-box'>
              Please fill in at least 3 parameters for optimal results.
            </div>
          )}

          {passwordType === 'custom' ? (

            <div className='checkbox-fields'>
              {/* Name */}
              <div className='checkbox-field'>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.name}
                    onChange={() => handleCheckboxChange('name')}
                  />
                  Name
                </label>
                {selectedInputs.name && (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formInputs.name}
                    onChange={handleInputChange}
                  />
                )}
              </div>

              {/* Pet Name */}
              <div className='checkbox-field'>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.petName}
                    onChange={() => handleCheckboxChange('petName')}
                  />
                  Pet Name
                </label>
                {selectedInputs.petName && (
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    value={formInputs.petName}
                    onChange={handleInputChange}
                  />
                )}
              </div>

              {/* Favorite Sport Team */}
              <div className='checkbox-field'>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.favoriteSportTeam}
                    onChange={() => handleCheckboxChange('favoriteSportTeam')}
                  />
                  Favorite Sport Team
                </label>
                {selectedInputs.favoriteSportTeam && (
                  <input
                    type="text"
                    id="favoriteSportTeam"
                    name="favoriteSportTeam"
                    value={formInputs.favoriteSportTeam}
                    onChange={handleInputChange}
                  />
                )}
              </div>

              {/* Favorite Athlete/Artist */}
              <div className='checkbox-field'>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.favoriteAthleteArtist}
                    onChange={() => handleCheckboxChange('favoriteAthleteArtist')}
                  />
                  Favorite Athlete/Artist
                </label>
                {selectedInputs.favoriteAthleteArtist && (
                  <input
                    type="text"
                    id="favoriteAthleteArtist"
                    name="favoriteAthleteArtist"
                    value={formInputs.favoriteAthleteArtist}
                    onChange={handleInputChange}
                  />
                )}
              </div>

              {/* Favorite Song */}
              <div className='checkbox-field'>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.favoriteSong}
                    onChange={() => handleCheckboxChange('favoriteSong')}
                  />
                  Favorite Song
                </label>
                {selectedInputs.favoriteSong && (
                  <input
                    type="text"
                    id="favoriteSong"
                    name="favoriteSong"
                    value={formInputs.favoriteSong}
                    onChange={handleInputChange}
                  />
                )}
              </div>

              {/* Friend Nickname */}
              <div className='checkbox-field'>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.friendNickname}
                    onChange={() => handleCheckboxChange('friendNickname')}
                  />
                  Friend Nickname
                </label>
                {selectedInputs.friendNickname && (
                  <input
                    type="text"
                    id="friendNickname"
                    name="friendNickname"
                    value={formInputs.friendNickname}
                    onChange={handleInputChange}
                  />
                )}
              </div>

              {/* Horoscope */}
              <div className='checkbox-field'>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.horoscope}
                    onChange={() => handleCheckboxChange('horoscope')}
                  />
                  Horoscope
                </label>
                {selectedInputs.horoscope && (
                  <input
                    type="text"
                    id="horoscope"
                    name="horoscope"
                    value={formInputs.horoscope}
                    onChange={handleInputChange}
                  />
                )}
              </div>

              {/* Lucky Number */}
              <div className='checkbox-field'>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.luckyNumber}
                    onChange={() => handleCheckboxChange('luckyNumber')}
                  />
                  Lucky Number
                </label>
                {selectedInputs.luckyNumber && (
                  <input
                    type="number"
                    id="luckyNumber"
                    name="luckyNumber"
                    value={formInputs.luckyNumber}
                    onChange={handleInputChange}
                    maxLength="8"
                  />
                )}
              </div>

              {/* Remarkable Year */}
              <div className='checkbox-field'>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.remarkableYear}
                    onChange={() => handleCheckboxChange('remarkableYear')}
                  />
                  Remarkable Year
                </label>
                {selectedInputs.remarkableYear && (
                  <input
                    type="number"
                    id="remarkableYear"
                    name="remarkableYear"
                    value={formInputs.remarkableYear}
                    onChange={handleInputChange}
                    maxLength="4"
                  />
                )}
              </div>

            </div>
          ) : (
            <div className='checkbox-fields'>
              <div className="field">
                <label htmlFor="capital">Capital</label>
                <input
                  type="checkbox"
                  id="capital"
                  name="capital"
                  checked={randomOptions.capital}
                  onChange={handleRandomOptionsChange}
                />
              </div>
              <div className="field">
                <label htmlFor="small">Small</label>
                <input
                  type="checkbox"
                  id="small"
                  name="small"
                  checked={randomOptions.small}
                  onChange={handleRandomOptionsChange}
                />
              </div>
              <div className="field">
                <label htmlFor="number">Number</label>
                <input
                  type="checkbox"
                  id="number"
                  name="number"
                  checked={randomOptions.number}
                  onChange={handleRandomOptionsChange}
                />
              </div>
              <div className="field">
                <label htmlFor="symbol">Symbol</label>
                <input
                  type="checkbox"
                  id="symbol"
                  name="symbol"
                  checked={randomOptions.symbol}
                  onChange={handleRandomOptionsChange}
                />
              </div>
            </div>
          )}
          <button type="button" onClick={handleGeneratePassword}>
            Generate Password
          </button>
        </form>
      </div>
      <footer className="app-footer">
  <p>Made by<a href="https://slimbouras.com">slimbouras.com</a>, Source Code<a href="https://github.com/7wenty7/EZPass">
    <FaGithub />
  </a> </p>
</footer>

    </section>
    
  );
};

export default App;
