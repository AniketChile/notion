import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { account } from "../../appwriteClient";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Error logging out:", error);
    }
    dispatch(logout());
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded text-white">
      Logout
    </button>
  );
};

export default LogoutButton;
