import { useEffect } from "react";
import { useStore } from "react-redux";
import { loadState, saveState } from "../utils/storage";
import debounce from "lodash.debounce";

const STORAGE_KEY = "notion-clone-state";

const useLocalStorage = () => {
  const store = useStore();

  // Load persisted state once on startup
  useEffect(() => {
    const persistedState = loadState(STORAGE_KEY);
    if (persistedState) {
      store.dispatch({ type: "LOAD_STATE", payload: persistedState });
    }
  }, [store]);

  // Save with debounce
  useEffect(() => {
    const debouncedSave = debounce(() => {
      const state = store.getState();
      saveState(STORAGE_KEY, state);
    }, 500);

    const unsubscribe = store.subscribe(debouncedSave);

    return () => {
      unsubscribe();
      debouncedSave.cancel();
    };
  }, [store]);
};

export default useLocalStorage;
