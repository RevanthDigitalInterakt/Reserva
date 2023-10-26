import { useEffect, useState } from 'react';

interface IUseDebounce {
  value: string;
  delay: number;
}

export default function useDebounce({ value, delay }: IUseDebounce) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}
