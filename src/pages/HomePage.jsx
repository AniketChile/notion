// src/pages/HomePage.jsx
import React from "react";
import Header from "../components/Header";
import Editor from "../features/editor/Editor";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <Editor />
      </div>
    </div>
  );
};

export default HomePage;
