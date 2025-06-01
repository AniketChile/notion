import React from "react";
import { useDispatch } from "react-redux";
import { deleteDocument } from "../features/documents/documentsSlice";

const DocumentItem = ({ document, isActive, onSelect }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteDocument({ id: document.id }));
  };

  return (
    <div
      className={`p-2 rounded cursor-pointer flex justify-between items-center transition ${
        isActive ? "bg-blue-900" : "hover:bg-gray-800"
      }`}
      onClick={() => onSelect(document.id)}
    >
      <span className="truncate flex-1">{document.title || "Untitled"}</span>
      {isActive && (
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-600 ml-2"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default DocumentItem;
