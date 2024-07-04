
// Utility function to reverse a string
const reverseString = (str) => {
  let reversedStr = str.split('').reverse().join('');

  // Alternate the case
  let result = '';
  for (let i = 0; i < reversedStr.length; i++) {
    let char = reversedStr[i];
    if (i % 2 === 0) {
      // Even index: uppercase
      result += char.toUpperCase();
    } else {
      // Odd index: lowercase
      result += char.toLowerCase();
    }
  }

  return result;
};

// Utility function to get initials from a string
const getInitials = (str) => {
  return str.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
};

const alternateCase = (str) => {
  let noSpacesStr = str.replace(/\s/g, '');

  let result = '';
  for (let i = 0; i < noSpacesStr.length; i++) {
    let char = noSpacesStr[i];
    if (i % 2 === 0) {
      result += char.toUpperCase();
    } else {
      result += char.toLowerCase();
    }
  }

  return result;
};

// Utility function to generate a random symbol from a list
const getRandomSymbol = () => {
  const symbols = ['*', '"', '$', '#', '@', '!']; // Expand symbols as needed
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
};

// Utility function to generate a random number between min and max (inclusive)
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Utility function to generate a fully custom password 
export const generateFullyCustomPassword = (inputs, length) => {
  const {
    name,
    petName,
    favoriteSportTeam,
    favoriteAthleteArtist,
    favoriteSong,
    friendNickname,
    horoscope,
    luckyNumber,
    remarkableYear
  } = inputs;

  const sections = [];

  if (name) {
    sections.push(reverseString(name));
  }
  if (petName) {
    sections.push(reverseString(petName));
  }
  if (favoriteSportTeam || favoriteAthleteArtist) {
    sections.push(getInitials(favoriteSportTeam || favoriteAthleteArtist));
  }
  if (favoriteSong) {
    sections.push(alternateCase(favoriteSong));
  }
  if (friendNickname) {
    sections.push(alternateCase(friendNickname));
  }
  if (horoscope) {
    sections.push(horoscope.substring(0, 3));
  }
  if (luckyNumber) {
    sections.push(luckyNumber.toString());
  }
  if (remarkableYear) {
    sections.push(remarkableYear.toString());
  }

  if (sections.length === 0) {
    return ''; // Return empty string if no valid sections are available
  }

  // Shuffle sections
  const shuffledSections = shuffleArray(sections);

  // Build the password
  let password = '';
  let currentLength = 0;
  let hasNumber = false; 

  // Ensure the password includes at least one number (luckyNumber or remarkableYear)
  if (typeof luckyNumber === 'number' || typeof remarkableYear === 'number') {
    const numberToUse = typeof luckyNumber === 'number' ? luckyNumber : remarkableYear;

    password += numberToUse;
    currentLength += numberToUse.toString().length;
    hasNumber = true;
  }

  // Continue building the password with sections
  for (let i = 0; i < shuffledSections.length; i++) {
    const section = shuffledSections[i];
    const remainingLength = length - password.length;

    const sectionLength = Math.min(section.length, remainingLength);

    // Add section to password
    password += section.slice(0, sectionLength);
    currentLength += sectionLength;

    if (/[0-9]/.test(section)) {
      hasNumber = true;
    }

    if (currentLength >= length) {
      break;
    }

    if (i < shuffledSections.length - 1) {
      password += getRandomSymbol();
      currentLength += 1;
    }
  }

  // Ensure the password includes at least one number if not already included
  if (!hasNumber) {
    const randomNumber = getRandomNumber(0, 9);
    const insertIndex = getRandomNumber(0, password.length);
    password = `${password.slice(0, insertIndex)}${randomNumber}${password.slice(insertIndex)}`;
  }

  // Ensure the password meets the required length
  if (password.length < length) {
    const remainingChars = length - password.length;
    const additionalSymbols = Array.from({ length: remainingChars }, () => getRandomSymbol()).join('');
    password += additionalSymbols;
  }

  return password;
};

// Utility function to shuffle array elements (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
