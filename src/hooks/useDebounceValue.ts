import { useEffect, useRef, useState } from 'react';

export function useDebouncedValue<T>(value: T, ms: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, ms]);

  return debouncedValue;
}
