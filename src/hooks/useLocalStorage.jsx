import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storeValue, setStoreValue] = useState(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(initialValue),
      );
    } catch (error) {
      currentValue = initialValue;
    }
    return currentValue;
  });

  const setValue = (value) => {
    try {
      if (typeof value === "function") {
        let newValue = value(storeValue);
        setStoreValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } else {
        setStoreValue(value);
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storeValue, setValue];
};

export default useLocalStorage;
