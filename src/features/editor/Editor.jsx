import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveDocument, saveDocumentWithStatus } from "../documents/documentsSlice";

const SAVE_DELAY = 5000; // 5 seconds

const Editor = () => {
  const dispatch = useDispatch();
  const activeDocument = useSelector(selectActiveDocument);
  const [content, setContent] = useState("");
  const saveTimeout = useRef(null);

  // Set content when document changes
  useEffect(() => {
    if (activeDocument) setContent(activeDocument.content || "");
    clearTimeout(saveTimeout.current);
  }, [activeDocument]);

  // Debounced save
  useEffect(() => {
    if (!activeDocument) return;
    if (content === activeDocument.content) return;
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      dispatch(
        saveDocumentWithStatus({
          id: activeDocument.id,
          title: activeDocument.title,
          content,
        })
      );
    }, SAVE_DELAY);
    return () => clearTimeout(saveTimeout.current);
    // eslint-disable-next-line
  }, [content, activeDocument?.id]);

  if (!activeDocument)
    return <div className="text-gray-500 p-4">No document selected</div>;

  return (
    <textarea
      className="w-full h-64 md:h-full bg-gray-800 text-white p-4 rounded outline-none resize-none"
      placeholder="Start typing..."
      onChange={e => setContent(e.target.value)}
      value={content}
      style={{ minHeight: "10rem" }}
    />
  );
};

export default Editor;
