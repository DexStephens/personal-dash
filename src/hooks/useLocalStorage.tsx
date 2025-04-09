import { useSyncExternalStore } from "react";

export function useLocalStorageSync(key: string): string | null {
  const getSnapshot = () => localStorage.getItem(key);

  const subscribe = (callback: () => void) => {
    const handleChange = () => callback();

    // Listen for storage changes across tabs
    window.addEventListener("storage", handleChange);
    // Listen for local custom events within same tab
    window.addEventListener("localstorage-sync", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("localstorage-sync", handleChange);
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function setLocalStorageValue(key: string, value: string) {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event("localstorage-sync"));
}
