import { useEffect, useRef, useCallback } from "react";

/**
 * Debounced localStorage setter — tranh write amplification khi state update lien tuc.
 * Vi du: stopwatch tick moi giay se chi persist sau khi dung tick > 500ms.
 */
export function useDebouncedStorage(delay = 500) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSet = useCallback(
    (key: string, value: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        localStorage.setItem(key, value);
      }, delay);
    },
    [delay]
  );

  const immediateSet = useCallback((key: string, value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    localStorage.setItem(key, value);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { debouncedSet, immediateSet };
}
