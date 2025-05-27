import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveDocument } from './documentsSlice';

const Documents = () => {
  const activeDocument = useSelector(selectActiveDocument);

  return (
    <div className="flex-1 p-4 text-white">
      {activeDocument ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{activeDocument.title}</h1>
          <p className="whitespace-pre-wrap">{activeDocument.content}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Select or create a document to get started</p>
        </div>
      )}
    </div>
  );
};

export default Documents;
