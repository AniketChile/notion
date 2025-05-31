import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from '../features/documents/documentsSlice';
import editorReducer from '../features/editor/editorSlice';
import authReducer from '../features/auth/authSlice';

const persistedState = (() => {
  try {
    const serializedState = localStorage.getItem("notion-lite-state");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load state", e);
    return undefined;
  }
})();

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    editor: editorReducer,
    auth: authReducer
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;