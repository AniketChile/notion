import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, selectAuthLoading, selectAuthError } from "./authSlice";

const Signup = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(signupUser({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-2 w-full p-2 border rounded"
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
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-600 underline"
        >
          Log in
        </button>
      </p>
    </form>
  );
};

export default Signup;
