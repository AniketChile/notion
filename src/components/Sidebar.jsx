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
    <div className="w-64 bg-gray-900 text-white p-4">
      <p className="mb-4">Welcome, {user.email || "User"}</p>
      <button onClick={handleNewDocument} className="btn mb-2 w-full bg-blue-700 text-white py-2 rounded">+ New Document</button>
      <div>
        {documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            isActive={doc.id === activeDocumentId}
            onSelect={(id) => dispatch(setActiveDocument(id))}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
