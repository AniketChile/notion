import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  documents: [
    {
      id: '1',
      title: 'Untitled Document',
      content: '',
      createdAt: new Date().toISOString(),
    },
  ],
  activeDocumentId: '1',
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action) => {
      const newDoc = {
        id: nanoid(),
        title: 'Untitled Document',
        content: '',
        createdAt: new Date().toISOString(),
      };
      state.documents.push(newDoc);
      state.activeDocumentId = newDoc.id;
    },
    updateDocument: (state, action) => {
      const { id, title, content } = action.payload;
      const doc = state.documents.find(doc => doc.id === id);
      if (doc) {
        if (title !== undefined) doc.title = title;
        if (content !== undefined) doc.content = content;
      }
    },
    deleteDocument: (state, action) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload.id);
      if (state.activeDocumentId === action.payload.id) {
        state.activeDocumentId = state.documents[0]?.id || null;
      }
    },
    setActiveDocument: (state, action) => {
      state.activeDocumentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('LOAD_STATE', (state, action) => {
      if (action.payload?.documents) {
        return action.payload.documents;
      }
    });
  },
});

export const selectActiveDocument = (state) => 
  state.documents.documents.find(doc => doc.id === state.documents.activeDocumentId);
  
export const { addDocument, updateDocument, deleteDocument, setActiveDocument } = documentsSlice.actions;

export default documentsSlice.reducer;