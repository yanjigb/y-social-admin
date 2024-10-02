import { useEffect, useMemo, useState } from "react";

export default function usePersistState<T>(initial_value: T, local_storage_name: string): [T, (new_state: T) => void] {
  const _initial_value = useMemo(() => {
    const local_storage_value_str = localStorage.getItem(local_storage_name);
    // If there is a value stored in localStorage, use that
    if (local_storage_value_str) {
      return JSON.parse(local_storage_value_str);
    }
    // Otherwise use initial_value that was passed to the function
    return initial_value;
  }, []);

  const [state, setState] = useState(_initial_value);

  useEffect(() => {
    const state_str = JSON.stringify(state); // Stringified state
    localStorage.setItem(local_storage_name, state_str); // Set stringified state as item in localStorage
  }, [state]);

  return [state, setState];
}
