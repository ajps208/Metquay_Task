import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const tokenAuthorisationContext = createContext();

function TokenAuth({ children }) {
  const [isAuthorizes, setIsAuthorizes] = useState(false);
  useEffect(()=>{
    if(sessionStorage.getItem("Admintoken")){
      setIsAuthorizes(true)
    }else{
      setIsAuthorizes(false)
    }
},[isAuthorizes])
  return (
    <>
      <tokenAuthorisationContext.Provider value={{isAuthorizes, setIsAuthorizes}}>
        {children}
     </tokenAuthorisationContext.Provider>
    </>
  );
}

export default TokenAuth;
