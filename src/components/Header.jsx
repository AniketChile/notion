import React from "react";
import LogoutButton from "../features/auth/LogoutButton";

const Header = () => (
  <header className="w-full flex items-center justify-between px-4 py-3 md:px-8 bg-gray-800 text-white border-b border-gray-700">
    <h1 className="text-lg md:text-xl font-bold">Notion Lite</h1>
    <LogoutButton />
  </header>
);

export default Header;
