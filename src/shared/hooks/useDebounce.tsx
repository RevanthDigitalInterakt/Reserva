import { useEffect, useState } from 'react';

interface IuseDebounce {
  value: string;
  delay: number;
}
export default function useDebounce({ value, delay }: IuseDebounce) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value],
  );

  return debouncedValue;
}
