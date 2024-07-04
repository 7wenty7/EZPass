import React, { useState } from 'react';
import { generateFullyCustomPassword } from '../utils/fullyCustomPasswordUtils'; 

const CheckBoxWithTextField = ({ inputName, inputValue, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      const inputs = {
        [inputName]: inputValue,
      };
      const newPassword = generateFullyCustomPassword(inputs); 
      setGeneratedPassword(newPassword);
    } else {
      setGeneratedPassword('');
    }
  };

  return (
    <div className="checkbox-field">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {inputName} {}
      </label>
      {isChecked && (
        <input
          type="text"
          value={generatedPassword}
          readOnly
          placeholder="Generated Password"
        />
      )}
    </div>
  );
};

export default CheckBoxWithTextField;
