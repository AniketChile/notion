import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from '../features/documents/documentsSlice';
import editorReducer from '../features/editor/editorSlice';

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    editor: editorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;