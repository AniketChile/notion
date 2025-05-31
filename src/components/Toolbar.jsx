import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsSaving, selectLastSaved } from "../features/editor/editorSlice";
import { selectActiveDocument, saveDocumentWithStatus } from "../features/documents/documentsSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  const isSaving = useSelector(selectIsSaving);
  const lastSaved = useSelector(selectLastSaved);
  const activeDocument = useSelector(selectActiveDocument);

  const handleTitleChange = (e) => {
    if (activeDocument) {
      dispatch(
        saveDocumentWithStatus({
          id: activeDocument.id,
          title: e.target.value,
          content: activeDocument.content,
        })
      );
    }
  };

  return (
    <div className="border-b border-gray-800 p-2 flex justify-between items-center bg-gray-800 text-white">
      <input
        type="text"
        value={activeDocument?.title || ""}
        onChange={handleTitleChange}
        placeholder="Untitled Document"
        className="text-xl font-semibold px-2 py-1 border-none outline-none bg-transparent w-1/2"
      />
      <div className="text-sm text-gray-400">
        {isSaving
          ? "Saving..."
          : lastSaved
          ? `Last saved: ${new Date(lastSaved).toLocaleTimeString()}`
          : "Not saved yet"}
      </div>
    </div>
  );
};

export default Toolbar;
