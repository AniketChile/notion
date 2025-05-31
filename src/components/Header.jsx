import React from "react";
import LogoutButton from "../features/auth/LogoutButton";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Notion Lite</h1>
      <LogoutButton />
    </div>
  );
};

export default Header;
