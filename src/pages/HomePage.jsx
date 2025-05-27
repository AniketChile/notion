import React from "react";
import Sidebar from "../components/Sidebar";
import Editor from "../features/editor/Editor";
import Toolbar from "../components/Toolbar";

const HomePage = () => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Toolbar />
        <div className="flex-1 overflow-auto">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default HomePage;