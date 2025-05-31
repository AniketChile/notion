import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import Editor from "../features/editor/Editor";

const HomePage = () => (
  <div className="min-h-screen flex flex-col bg-gray-900 text-white">
    <Header />
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col p-6">
        <Sidebar />
      </aside>
      <main className="flex-1 flex flex-col bg-gray-900">
        <Toolbar />
        <div className="flex-1 overflow-auto p-8">
          <Editor />
        </div>
      </main>
    </div>
  </div>
);

export default HomePage;
