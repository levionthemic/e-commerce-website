import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  return auth ? <>{children}</> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
