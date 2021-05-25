import { useState } from 'react';

// A hook that checks to see if the image is correct or not!
const useIsValidURL = (imageURL) => {
  const [isValid, setIsValid] = useState(false);

  const img = new Image();
  img.onerror = () => setIsValid(false);
  img.onload = () => setIsValid(true);
  img.src = imageURL;

  return isValid
    ? { imageURL, isValid }
    : {
      imageURL: 'https://i.stack.imgur.com/y9DpT.jpg',
      isValid
    };
};

export default useIsValidURL;
