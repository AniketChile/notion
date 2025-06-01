import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsSaving, selectLastSaved } from "../features/editor/editorSlice";
import { selectActiveDocument, saveDocumentWithStatus } from "../features/documents/documentsSlice";

const TITLE_SAVE_DELAY = 2000; // 2 seconds

const Toolbar = () => {
  const dispatch = useDispatch();
  const isSaving = useSelector(selectIsSaving);
  const lastSaved = useSelector(selectLastSaved);
  const activeDocument = useSelector(selectActiveDocument);

  const [title, setTitle] = useState(activeDocument?.title || "");
  const titleTimeout = useRef(null);

  // Update local title when switching documents
  useEffect(() => {
    setTitle(activeDocument?.title || "");
    clearTimeout(titleTimeout.current);
  }, [activeDocument]);

  // Debounced save for title
  useEffect(() => {
    if (!activeDocument) return;
    if (title === activeDocument.title) return;

    clearTimeout(titleTimeout.current);
    titleTimeout.current = setTimeout(() => {
      dispatch(
        saveDocumentWithStatus({
          id: activeDocument.id,
          title,
          content: activeDocument.content,
        })
      );
    }, TITLE_SAVE_DELAY);

    return () => clearTimeout(titleTimeout.current);
    // eslint-disable-next-line
  }, [title, activeDocument?.id]);

  return (
    <div className="border-b border-gray-800 p-2 flex justify-between items-center bg-gray-800 text-white">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Untitled Document"
        className="text-lg md:text-xl font-semibold px-2 py-1 border-none outline-none bg-transparent w-full md:w-1/2"
      />
      <div className="text-xs md:text-sm text-gray-400 ml-4">
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
