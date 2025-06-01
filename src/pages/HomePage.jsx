import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import Editor from "../features/editor/Editor";

const HomePage = () => (
  <div className="min-h-screen flex flex-col bg-gray-900 text-white">
    <Header />
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar: full width on mobile, fixed width on md+ */}
      <aside className="w-full md:w-72 bg-gray-800 border-b md:border-b-0 md:border-r border-gray-700 flex-shrink-0 flex flex-col p-4 md:p-6">
        <Sidebar />
      </aside>
      {/* Main content: takes full width on mobile, rest on md+ */}
      <main className="flex-1 flex flex-col bg-gray-900">
        <Toolbar />
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Editor />
        </div>
      </main>
    </div>
  </div>
);

export default HomePage;
