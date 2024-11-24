import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";
const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-lg">
      Logout
    </button>
  );
};

export default Logout;
