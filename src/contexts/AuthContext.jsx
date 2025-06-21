import { useState, createContext, useContext } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const AuthProvider = createContext()

export const AuthContext = ({children}) => {

    function signInEmail() {
        
    }

    return (
        <AuthProvider.Provider>
            {children}
        </AuthProvider.Provider>
    )
}

export const useAuthContext = () => useContext(AuthProvider)