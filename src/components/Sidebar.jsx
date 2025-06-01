import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { selectDocuments, setActiveDocument, addDocument, selectActiveDocumentId } from "../features/documents/documentsSlice";
import DocumentItem from "./DocumentItem";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const documents = useSelector(selectDocuments);
  const activeDocumentId = useSelector(selectActiveDocumentId);
  const dispatch = useDispatch();

  const handleNewDocument = () => {
    const newDoc = {
      id: Date.now().toString(),
      title: "Untitled",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addDocument(newDoc));
    dispatch(setActiveDocument(newDoc.id));
  };

  if (!user) {
    return <div className="p-4 text-gray-400">Please login to view your documents.</div>;
  }

  return (
    <nav className="w-full md:w-64 bg-gray-900 text-white p-4 md:p-6 rounded md:rounded-none">
      <p className="mb-4 truncate">Welcome, {user.email || "User"}</p>
      <button
        onClick={handleNewDocument}
        className="mb-4 w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
      >
        + New Document
      </button>
      <div className="space-y-1">
        {documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            isActive={doc.id === activeDocumentId}
            onSelect={(id) => dispatch(setActiveDocument(id))}
          />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
