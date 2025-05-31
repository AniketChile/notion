import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  lastSaved: null,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setIsSaving(state, action) {
      state.isSaving = action.payload;
    },
    setLastSaved(state, action) {
      state.lastSaved = action.payload;
    },
  },
});

export const { setIsSaving, setLastSaved } = editorSlice.actions;

export const selectIsSaving = (state) => state.editor.isSaving;
export const selectLastSaved = (state) => state.editor.lastSaved;

export default editorSlice.reducer;
