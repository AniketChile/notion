// src/features/editor/Editor.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveDocument } from "../documents/documentsSlice";
import { saveDocumentWithStatus } from "../documents/documentsSlice";

const SAVE_DELAY = 5000; // 5 seconds

const Editor = () => {
  const dispatch = useDispatch();
  const activeDocument = useSelector(selectActiveDocument);
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");
  const saveTimeout = useRef(null);

  useEffect(() => {
    if (activeDocument) {
      setContent(activeDocument.content);
      if (textareaRef.current) {
        textareaRef.current.value = activeDocument.content;
      }
    }
  }, [activeDocument]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      clearTimeout(saveTimeout.current);
    };
  }, []);

  const scheduleSave = (newContent) => {
    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      if (activeDocument) {
        dispatch(
          saveDocumentWithStatus({
            id: activeDocument.id,
            title: activeDocument.title,
            content: newContent,
          })
        );
      }
    }, SAVE_DELAY);
  };

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    scheduleSave(newContent);
  };

  return (
    <div className="h-full dark:bg-gray-900 dark:text-white p-4">
      {activeDocument ? (
        <textarea
          ref={textareaRef}
          className="w-full h-full bg-gray-800 text-white p-4 rounded outline-none resize-none"
          placeholder="Start typing..."
          onChange={handleChange}
          value={content}
        />
      ) : (
        <div className="text-gray-500">No document selected</div>
      )}
    </div>
  );
};

export default Editor;
