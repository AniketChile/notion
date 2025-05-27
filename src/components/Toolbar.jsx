import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsSaving, selectLastSaved } from "../features/editor/editorSlice";
import { updateDocument } from "../features/documents/documentsSlice";
import { selectActiveDocument } from "../features/documents/documentsSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  const isSaving = useSelector(selectIsSaving);
  const lastSaved = useSelector(selectLastSaved);
  const activeDocument = useSelector(selectActiveDocument);

  const handleTitleChange = (e) => {
    if (activeDocument) {
      dispatch(
        updateDocument({
          id: activeDocument.id,
          title: e.target.value,
        })
      );
    }
  };

  return (
    <div className="border-b border-gray-200 p-2 flex justify-between items-center">
      <input
        type="text"
        value={activeDocument?.title || ""}
        onChange={handleTitleChange}
        placeholder="Untitled Document"
        className="text-xl font-semibold px-2 py-1 border-none outline-none bg-transparent"
      />
      <div className="text-sm text-gray-500">
        {isSaving ? "Saving..." : lastSaved ? `Last saved: ${new Date(lastSaved).toLocaleTimeString()}` : "Not saved yet"}
      </div>
    </div>
  );
};

export default Toolbar;