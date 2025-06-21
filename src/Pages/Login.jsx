import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { auth, db, googleProvider } from "../firebase/config";

export const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    sigInEmail,
    signInGoogle,
    loading,
  } = useAuthContext();

  const handleLogin = async () => {
    try {
      await sigInEmail(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
        />
        <br />

        <label>Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          ype={isShowPassword ? "text" : "password"}
        />

        <input
          onChange={(e) => {
            setIsShowPassword(e.target.value);
          }}
          value={isShowPassword}
          type="checkbox"
        />
        <button disabled={loading}>Login</button>
        <button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            signInGoogle(db, auth, googleProvider);
          }}
        >
          Login With Google
        </button>
      </form>
    </>
  );
};
