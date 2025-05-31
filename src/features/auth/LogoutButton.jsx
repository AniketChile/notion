import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { account } from "../../appwriteClient";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await account.deleteSession("current");
    dispatch(logout());
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
};

export default LogoutButton;
