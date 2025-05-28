import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema as basicSchema } from "prosemirror-schema-basic";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
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

import "../../prosemirror.css";

const Editor = () => {
  const dispatch = useDispatch();
  const activeDocument = useSelector(selectActiveDocument);
  const editorOptions = useSelector(selectEditorOptions);
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

  // Safe content initialization
  const getInitialContent = useCallback(() => {
    return activeDocument?.content?.trim() || "Start typing...";
  }, [activeDocument]);

  const handleSave = useCallback(() => {
    if (!activeDocument || !editorViewRef.current) return;

    try {
      const content = editorViewRef.current.state.doc.textContent;
      dispatch(startSaving());
      dispatch(
        updateDocument({
          id: activeDocument.id,
          content,
        })
      );
      setTimeout(() => dispatch(endSaving()), 500);
    } catch (error) {
      console.error("Save error:", error);
      dispatch(endSaving());
    }
  }, [activeDocument, dispatch]);

  // Initialize ProseMirror editor
  useEffect(() => {
    if (!editorRef.current) return;

    const mySchema = new Schema({
      nodes: basicSchema.spec.nodes,
      marks: basicSchema.spec.marks,
    });

    // Create initial document with fallback content
    const doc = mySchema.node(
      "doc",
      null,
      mySchema.node("paragraph", null, mySchema.text(getInitialContent()))
    );

    const initialState = EditorState.create({
      schema: mySchema,
      doc,
      plugins: [
        history(),
        keymap(baseKeymap),
        keymap({
          "Mod-s": () => {
            handleSave();
            return true;
          },
        }),
      ],
    });

    editorViewRef.current = new EditorView(editorRef.current, {
      state: initialState,
      dispatchTransaction: (transaction) => {
        try {
          const newState = editorViewRef.current.state.apply(transaction);
          editorViewRef.current.updateState(newState);
        } catch (error) {
          console.error("Transaction error:", error);
        }
      },
      attributes: {
        class: "ProseMirror h-full p-4 outline-none",
        style: "white-space: pre-wrap",
      },
    });

    dispatch(setEditorReady(true));

    return () => {
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
        editorViewRef.current = null;
      }
      dispatch(setEditorReady(false));
    };
  }, [dispatch, getInitialContent, handleSave]);

  // Update editor content safely when active document changes
  useEffect(() => {
    if (!activeDocument || !editorViewRef.current) return;

    try {
      const { state } = editorViewRef.current;
      const currentContent = state.doc.textContent;
      const newContent = activeDocument.content?.trim() || "Start typing...";

      // Only update if content actually changed
      if (currentContent !== newContent) {
        const doc = state.schema.node("doc", null, [
          state.schema.node("paragraph", null, state.schema.text(newContent)),
        ]);

        const tr = state.tr.replaceWith(
          0,
          state.doc.content.size,
          doc.content
        );
        editorViewRef.current.dispatch(tr);
      }
    } catch (error) {
      console.error("Content update error:", error);
    }
  }, [activeDocument]);

  // Save on unmount
  useEffect(() => {
    return () => {
      handleSave();
    };
  }, [handleSave]);

  return (
    <div className="h-full dark:bg-gray-900 dark:text-white">
      <div
        ref={editorRef}
        className="h-full bg-transparent text-white placeholder-gray-400"
        onBlur={handleSave}
      />
    </div>
  );
};

export default Editor;