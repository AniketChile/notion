import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema } from "prosemirror-model";
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
  const saveTimeoutRef = useRef(null);

  // Initialize schema
  const mySchema = useRef(
    new Schema({
      nodes: basicSchema.spec.nodes,
      marks: basicSchema.spec.marks,
    })
  ).current;

  const getInitialContent = useCallback(() => {
    return activeDocument?.content?.trim() || "Start typing...";
  }, [activeDocument]);

  const handleSave = useCallback(() => {
    if (!activeDocument || !editorViewRef.current) return;

    try {
      // Get JSON from the editor state (not just textContent)
      const json = editorViewRef.current.state.doc.toJSON();
      const contentString = JSON.stringify(json);

      dispatch(startSaving());
      dispatch(
        updateDocument({
          id: activeDocument.id,
          content: contentString,
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

    // Parse initial content from JSON or fallback
    let doc;
    try {
      if (activeDocument?.content) {
        const parsed = JSON.parse(activeDocument.content);
        doc = mySchema.nodeFromJSON(parsed);
      } else {
        doc = mySchema.node("doc", null, [
          mySchema.node("paragraph", null, mySchema.text("Start typing...")),
        ]);
      }
    } catch {
      doc = mySchema.node("doc", null, [
        mySchema.node("paragraph", null, mySchema.text("Start typing...")),
      ]);
    }

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
          // Optionally debounce save on each transaction
          if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
          saveTimeoutRef.current = setTimeout(() => {
            handleSave();
          }, 1000);
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
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      dispatch(setEditorReady(false));
    };
  }, [activeDocument, dispatch, handleSave, mySchema]);

  // Update editor content safely when active document changes (only if different)
  useEffect(() => {
    if (!activeDocument || !editorViewRef.current) return;

    try {
      const newDoc = (() => {
        try {
          if (activeDocument?.content) {
            return mySchema.nodeFromJSON(JSON.parse(activeDocument.content));
          }
        } catch {
          // ignore parsing error
        }
        return mySchema.node("doc", null, [
          mySchema.node("paragraph", null, mySchema.text("Start typing...")),
        ]);
      })();

      const state = editorViewRef.current.state;

      if (!state.doc.eq(newDoc)) {
        const tr = state.tr.replaceWith(0, state.doc.content.size, newDoc.content);
        editorViewRef.current.dispatch(tr);
      }
    } catch (error) {
      console.error("Content update error:", error);
    }
  }, [activeDocument, mySchema]);

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
        // Delay save on blur to avoid race conditions
        onBlur={() => {
          setTimeout(() => handleSave(), 200);
        }}
      />
    </div>
  );
};

export default Editor;
