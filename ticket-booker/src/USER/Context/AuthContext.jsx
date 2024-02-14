import React, { createContext, useState } from 'react'

export const AuthStatus=createContext()
export const deleteStatus=createContext()
function AuthContext({children}) {
    const[logedUser,setLogedUser]=useState({})
    const[deleteinfo,setDeleteStaus]=useState("")
    return (
    <>
    <AuthStatus.Provider value={{logedUser,setLogedUser}}>
    <deleteStatus.Provider value={{deleteinfo,setDeleteStaus}}>
        {children}
     </deleteStatus.Provider>
    </AuthStatus.Provider>
    </>
  )
}

export default AuthContext