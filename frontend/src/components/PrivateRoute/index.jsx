import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  console.log(auth);
  return auth ? <>{children}</> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
