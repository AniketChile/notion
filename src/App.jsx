import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, selectUser } from "./features/auth/authSlice";
import HomePage from "./pages/HomePage";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    document.documentElement.classList.add("dark");
  }, [dispatch]);

  if (user) return <HomePage />;

  return showSignup ? (
    <Signup onSwitchToLogin={() => setShowSignup(false)} />
  ) : (
    <Login />
  );
};

export default App;
