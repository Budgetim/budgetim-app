import { useEffect, useRef } from 'react';

/**
 * Хук для сохранения и работы с предыдущим значением переменной в компоненте
 * @param value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
