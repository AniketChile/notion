import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import documentsReducer from '../features/documents/documentsSlice';
import editorReducer from '../features/editor/editorSlice';
import authReducer from '../features/auth/authSlice';

// Combine all your reducers
const rootReducer = combineReducers({
  documents: documentsReducer,
  editor: editorReducer,
  auth: authReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['documents'], // <-- persist only the documents slice (add more if needed)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
