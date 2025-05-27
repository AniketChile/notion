import React, { useEffect, useRef } from "react";
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

// Required ProseMirror CSS (add to your global CSS if not importing)
import "../../prosemirror.css";

const Editor = () => {
  const dispatch = useDispatch();
  const activeDocument = useSelector(selectActiveDocument);
  const editorOptions = useSelector(selectEditorOptions);
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

  // Initialize ProseMirror editor
  useEffect(() => {
    if (!editorRef.current) return;

    const mySchema = new Schema({
      nodes: basicSchema.spec.nodes,
      marks: basicSchema.spec.marks,
    });

    // Create initial document content safely
    const initialContent = activeDocument?.content || "";
    const doc = mySchema.node("doc", null, [
      mySchema.node("paragraph", null, mySchema.text(initialContent)),
    ]);

    const initialState = EditorState.create({
        schema: mySchema,
        doc,
        plugins: [
          history(),
          keymap(baseKeymap),
          keymap({
            "Mod-s": () => {
              handleSave();
              return true; // Prevent default save behavior
            },
          }),
        ],
      });
      

    editorViewRef.current = new EditorView(editorRef.current, {
      state: initialState,
      dispatchTransaction(transaction) {
        const newState = editorViewRef.current.state.apply(transaction);
        editorViewRef.current.updateState(newState);
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
      }
      dispatch(setEditorReady(false));
    };
  }, [dispatch]);

  // Update editor content when active document changes
  useEffect(() => {
    if (!activeDocument || !editorViewRef.current) return;

    const { state } = editorViewRef.current;
    const doc = state.schema.node("doc", null, [
      state.schema.node("paragraph", null, [
        state.schema.text(activeDocument.content || "Start typing..."),
      ]),
    ]);

    editorViewRef.current.updateState(
      EditorState.create({
        doc,
        schema: state.schema,
        plugins: state.plugins,
      })
    );
  }, [activeDocument]);

  const handleSave = () => {
    if (!activeDocument || !editorViewRef.current) return;

    const content = editorViewRef.current.state.doc.textContent;
    dispatch(startSaving());
    dispatch(
      updateDocument({
        id: activeDocument.id,
        content,
      })
    );
    setTimeout(() => dispatch(endSaving()), 500);
  };

  // Save on unmount
  useEffect(() => {
    return () => {
      handleSave();
    };
  }, []);

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