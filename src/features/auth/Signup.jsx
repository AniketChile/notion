import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signupUser,
  selectAuthLoading,
  selectAuthError,
  selectUser,
} from "./authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const user = useSelector(selectUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(signupUser({ email, password }));
  };

  useEffect(() => {
    if (user) navigate("/"); // Redirect after successful signup
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-3 w-full p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-4 w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-600 underline hover:text-blue-800"
        >
          Log in
        </button>
      </p>
    </form>
  );
};

export default Signup;
