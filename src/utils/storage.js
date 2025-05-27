export const loadState = (key) => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
      console.error('Failed to load state:', error);
      return undefined;
    }
  };
  
  export const saveState = (key, state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  };