import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectActiveDocument,
  updateDocument,
} from "../documents/documentsSlice";
import {
  selectEditorOptions,
  setEditorReady,
  startSaving,
  endSaving,
} from "./editorSlice";

const Editor = () => {
  const dispatch = useDispatch();
  const activeDocument = useSelector(selectActiveDocument);
  const editorOptions = useSelector(selectEditorOptions);
  const [localContent, setLocalContent] = React.useState("");

  useEffect(() => {
    dispatch(setEditorReady(true));
    return () => dispatch(setEditorReady(false));
  }, [dispatch]);

  useEffect(() => {
    if (activeDocument) {
      setLocalContent(activeDocument.content || "");
    }
  }, [activeDocument]);

  const handleContentChange = (e) => {
    setLocalContent(e.target.value);
  };

  const handleSave = () => {
    if (!activeDocument) return;

    dispatch(startSaving());
    dispatch(
      updateDocument({
        id: activeDocument.id,
        content: localContent,
      })
    );
    setTimeout(() => {
      dispatch(endSaving());
    }, 500);
  };

  useEffect(() => {
    return () => {
      handleSave(); // Save on unmount
    };
  }, []);

  return (
    <div className="editor-container h-full dark:bg-gray-900 dark:text-white">
      <textarea
        value={localContent}
        onChange={handleContentChange}
        onBlur={handleSave}
        placeholder={editorOptions.placeholder}
        spellCheck={editorOptions.spellCheck}
        autoCapitalize={editorOptions.autoCapitalize ? "on" : "off"}
        className="w-full h-full p-4 bg-transparent text-white placeholder-gray-400 outline-none resize-none"
      />
    </div>
  );
};

export default Editor;
