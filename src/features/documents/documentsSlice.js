import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setIsSaving, setLastSaved } from '../editor/editorSlice';

export const saveDocumentWithStatus = createAsyncThunk(
  'documents/saveWithStatus',
  async (doc, { dispatch }) => {
    dispatch(setIsSaving(true));
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch(updateDocument(doc));
    dispatch(setIsSaving(false));
    dispatch(setLastSaved(Date.now()));
  }
);

const initialState = {
  documents: [],
  activeDocumentId: null,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument(state, action) {
      state.documents.push(action.payload);
    },
    updateDocument(state, action) {
      const { id, title, content } = action.payload;
      const doc = state.documents.find((d) => d.id === id);
      if (doc) {
        if (title !== undefined) doc.title = title;
        if (content !== undefined) doc.content = content;
      }
    },
    deleteDocument(state, action) {
      const id = action.payload.id || action.payload;
      state.documents = state.documents.filter((doc) => doc.id !== id);
      if (state.activeDocumentId === id) {
        state.activeDocumentId = null;
      }
    },
    setActiveDocument(state, action) {
      state.activeDocumentId = action.payload;
    },
  },
});

export const {
  addDocument,
  updateDocument,
  deleteDocument,
  setActiveDocument,
} = documentsSlice.actions;

export const selectDocuments = (state) => state.documents.documents;
export const selectActiveDocumentId = (state) => state.documents.activeDocumentId;
export const selectActiveDocument = (state) => {
  const activeDocumentId = state.documents.activeDocumentId;
  return state.documents.documents.find((doc) => doc.id === activeDocumentId) || null;
};

export default documentsSlice.reducer;
