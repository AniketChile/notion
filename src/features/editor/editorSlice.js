import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditorReady: false,
  isSaving: false,
  lastSaved: null,
  editorOptions: {
    spellCheck: false,
    autoCapitalize: true,
    placeholder: "Start typing here...",
  },
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorReady: (state, action) => {
      state.isEditorReady = action.payload;
    },
    startSaving: (state) => {
      state.isSaving = true;
    },
    endSaving: (state) => {
      state.isSaving = false;
      state.lastSaved = new Date().toISOString();
    },
    updateEditorOptions: (state, action) => {
      state.editorOptions = {
        ...state.editorOptions,
        ...action.payload,
      };
    },
    resetEditorState: () => initialState,
  },
});

export const {
  setEditorReady,
  startSaving,
  endSaving,
  updateEditorOptions,
  resetEditorState,
} = editorSlice.actions;

export const selectEditorState = (state) => state.editor;
export const selectEditorOptions = (state) => state.editor.editorOptions;
export const selectIsSaving = (state) => state.editor.isSaving;
export const selectLastSaved = (state) => state.editor.lastSaved;

export default editorSlice.reducer;