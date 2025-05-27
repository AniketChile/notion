export const saveState = (key, state) => {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(key, serialized);
    } catch (err) {
      console.error("Failed to save state:", err);
    }
  };
  
  export const loadState = (key) => {
    try {
      const serialized = localStorage.getItem(key);
      return serialized ? JSON.parse(serialized) : undefined;
    } catch (err) {
      console.error("Failed to load state:", err);
      return undefined;
    }
  };
  