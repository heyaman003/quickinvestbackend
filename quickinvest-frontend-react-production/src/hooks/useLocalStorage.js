import { useEffect } from "react";
import { useState } from "react";

const getLocalStorageVal = (key, initialVal) => {
  const savedVal = JSON.parse(localStorage.getItem(key));
  return savedVal || initialVal;
};

export const useLocalStorage = (key, initialVal) => {
  const [value, setValue] = useState(() => getLocalStorageVal(key, initialVal));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
