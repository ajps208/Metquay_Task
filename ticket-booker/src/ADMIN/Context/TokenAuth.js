import React, { useEffect, useState } from "react";
import { createContext } from "react";

// Create a context to manage authorization status
export const tokenAuthorisationContext = createContext();

function TokenAuth({ children }) {
  // State to track authorization status
  const [isAuthorizes, setIsAuthorizes] = useState(false);

  // Check if the admin token exists in sessionStorage on component mount
  useEffect(() => {
    if (sessionStorage.getItem("Admintoken")) {
      setIsAuthorizes(true);
    } else {
      setIsAuthorizes(false);
    }
  }, []);

  return (
    <>
      {/* Provide the authorization status and setter function to children components */}
      <tokenAuthorisationContext.Provider
        value={{ isAuthorizes, setIsAuthorizes }}
      >
        {children}
      </tokenAuthorisationContext.Provider>
    </>
  );
}

export default TokenAuth;
