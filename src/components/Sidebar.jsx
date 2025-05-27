import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDocument, setActiveDocument } from "../features/documents/documentsSlice";
import DocumentItem from "./DocumentItem";

const Sidebar = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents.documents);
  const activeDocumentId = useSelector((state) => state.documents.activeDocumentId);

  const handleAddDocument = () => {
    dispatch(addDocument());
  };

  const handleSelectDocument = (id) => {
    dispatch(setActiveDocument(id));
  };

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={handleAddDocument}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          + New Document
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            isActive={doc.id === activeDocumentId}
            onSelect={handleSelectDocument}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
