import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // const { token } = useSelector((state) => state.auth);
  const token  = useSelector((state) => state.user?.isLoggedIn);
console.log("token prouyewgj", token);

  // const token= true
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
