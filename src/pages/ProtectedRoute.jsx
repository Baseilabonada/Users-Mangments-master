import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../App";
import SiedPar from "./Login/SiedPar";
const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext); // استخدام isAuthenticated من السياق

  return (
    <div>
      {!isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <>
          <SiedPar  />
          <Outlet />
        </>
      )}
      {console.log("in the proteted route ", isAuthenticated)}
    </div>
  );
};
export default ProtectedRoute;

