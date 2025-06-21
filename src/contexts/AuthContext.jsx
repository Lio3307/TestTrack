import { useState, createContext, useContext } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, doc } from "firebase/firestore";

const AuthProvider = createContext()

export const AuthContext = ({children}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [loading, setLoading] = useState(true)

    async function signInEmail(auth, email, password) {
        if(!email.trim() || !password.trim()) {
            alert("Input Field Cannot Empt!!")
            return
        }
        if(password.length < 6 && typeof password === 'string') {
            alert("Password At Least 6 Character")
            return
        }

        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
    }

    async function signUpEmail (auth, db, username, email, password) {
        if(!email.trim() || !password.trim() || !username.trim()) {
            alert ("Input Field Cannot Empty!!")
            return;
        }
        if(password.length < 6 && typeof password ===  'string') {
            alert("Create Password At Least 6 Character!!")
        }
        try {
            setLoading(true)
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            const docRef = doc(db, "Users", user.uid)
            await addDoc(docRef, {
                userId: user.uid,
                username: username,
                email: email,
            })
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            setEmail('')
            setPassword('')
            setUsername('')
        }
    }

    const value = {
        email,
        setEmail,
        password,
        setPassword,
        username,
        setUsername,
        signInEmail,
        signUpEmail,
    }

    return (
        <AuthProvider.Provider value={value}>
            {children}
        </AuthProvider.Provider>
    )
}

export const useAuthContext = () => useContext(AuthProvider)