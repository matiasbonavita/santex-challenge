import { useState, useEffect } from 'react';

type SetValue<T> = T | ((prevValue: T) => T);

function useStateWithStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<SetValue<T>>>] {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
        setState(newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [state, setState as React.Dispatch<React.SetStateAction<SetValue<T>>>];
}

export default useStateWithStorage;