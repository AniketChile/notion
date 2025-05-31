import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveDocument, saveDocumentWithStatus } from "../documents/documentsSlice";

const SAVE_DELAY = 2000; // 2 seconds

const Editor = () => {
  const dispatch = useDispatch();
  const activeDocument = useSelector(selectActiveDocument);
  const [content, setContent] = useState("");
  const saveTimeout = useRef(null);

  useEffect(() => {
    if (activeDocument) setContent(activeDocument.content);
  }, [activeDocument]);

  useEffect(() => () => clearTimeout(saveTimeout.current), []);

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

  if (!activeDocument)
    return <div className="text-gray-500 p-4">No document selected</div>;

  return (
    <textarea
      className="w-full h-full bg-gray-800 text-white p-4 rounded outline-none resize-none"
      placeholder="Start typing..."
      onChange={handleChange}
      value={content}
    />
  );
};

export default Editor;
