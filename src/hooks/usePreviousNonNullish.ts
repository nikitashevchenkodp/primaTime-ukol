import { useEffect, useRef } from "react";

export const usePreviousNonNullish = <T>(value: T): T => {
  const ref = useRef<T>(value);
  useEffect(() => {
    if (value !== null && value !== undefined) {
      ref.current = value;
    }
  });
  return ref.current;
};
