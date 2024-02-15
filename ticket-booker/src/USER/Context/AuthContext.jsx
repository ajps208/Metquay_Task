import React, { createContext, useState } from "react";

// Create context for authentication status
export const AuthStatus = createContext();
// Create context for delete status
export const deleteStatus = createContext();

function AuthContext({ children }) {
  // State to manage logged-in user information
  const [logedUser, setLogedUser] = useState({});
  // State to manage delete status
  const [deleteinfo, setDeleteStaus] = useState("");

  return (
    <>
      {/* Provide the AuthStatus context with the value of logged-in user information */}
      <AuthStatus.Provider value={{ logedUser, setLogedUser }}>
        {/* Provide the deleteStatus context with the value of delete status */}
        <deleteStatus.Provider value={{ deleteinfo, setDeleteStaus }}>
          {/* Render the child components wrapped by the context providers */}
          {children}
        </deleteStatus.Provider>
      </AuthStatus.Provider>
    </>
  );
}

export default AuthContext;
