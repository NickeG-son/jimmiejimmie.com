import { useState, useEffect } from "react";

/**
 * Returns a boolean that is `true` only once per browser session per key.
 * After the first render it writes to sessionStorage so revisiting the page
 * within the same tab session will return `false` immediately.
 */
export function useSessionIndicator(key: string): boolean {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(key);
    if (!alreadySeen) {
      sessionStorage.setItem(key, "1");
      setShow(true);
    }
  }, [key]);

  return show;
}
