import { useState, createContext, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const AuthProvider = createContext();

export const AuthContext = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "Users", user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
            navigate("/home")
          } else {
            alert("User Doc Not Found");
            setUserData(null);
          }
        } catch (err) {
          console.error(err);
          setUserData(null)
        }
      } else {
        setUserData(null)
      } 
      setLoading(false)

      return () => unsubscribe()
    });
  }, []);

  async function signInEmail(auth, email, password) {
    if (!email.trim() || !password.trim()) {
      alert("Input Field Cannot Empt!!");
      return;
    }
    if (password.length < 6 && typeof password === "string") {
      alert("Password At Least 6 Character");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  }

  async function signUpEmail(auth, db, username, email, password) {
    if (!email.trim() || !password.trim() || !username.trim()) {
      alert("Input Field Cannot Empty!!");
      return;
    }
    if (password.length < 6 && typeof password === "string") {
      alert("Create Password At Least 6 Character!!");
    }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const docRef = doc(db, "Users", user.uid);
      await setDoc(docRef, {
        userId: user.uid,
        username: username,
        email: email,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
      setUsername("");
    }
  }

  async function signInGoogle(db, auth, googleProvider) {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      const docRef = doc(db, "Users", googleUser.uid);
      const userGoogle = await getDoc(docRef);
      if (!userGoogle.exists()) {
        await setDoc(docRef, {
          userId: googleUser.uid,
          username: googleUser.displayName,
          email: googleUser.email,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    userData,
    setUserData,
    loading,
    setLoading,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    signInEmail,
    signUpEmail,
    signInGoogle,
  };

  return (
    <AuthProvider.Provider value={value}>{children}</AuthProvider.Provider>
  );
};

export const useAuthContext = () => useContext(AuthProvider);
