import React, { useState, useEffect } from 'react';

function useStickyState(defaultValue, key) {
    // overrides the useState function to check if set in localstorage first
    // if it is, use that as default, otherwise use what is passed in as default
    // only happens once when state is initialized
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    // update the localstorage whenever the state value is updated
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  export default useStickyState;
  