import { useState, useEffect, Dispatch, SetStateAction } from "react";

type InitialValue<T> = T | (() => T);

const getSavedValue = <T>(key: string, initialValue: InitialValue<T>): T => {
  const savedValue = JSON.parse(localStorage.getItem(key) || "null") as T;
  if (savedValue !== null) return savedValue;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const useLocalStorage = <T>(
  key: string,
  initialValue: InitialValue<T>
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    return getSavedValue<T>(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
