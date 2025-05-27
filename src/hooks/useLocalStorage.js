import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { loadState, saveState } from '../utils/storage';

const STORAGE_KEY = 'notion-clone-state';

const useLocalStorage = () => {
  const store = useStore();

  // Load state on initial render
  useEffect(() => {
    const persistedState = loadState(STORAGE_KEY);
    if (persistedState) {
      store.dispatch({ type: 'LOAD_STATE', payload: persistedState });
    }
  }, [store]);

  // Save state on changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      saveState(STORAGE_KEY, state);
    });

    return unsubscribe;
  }, [store]);
};

export default useLocalStorage;