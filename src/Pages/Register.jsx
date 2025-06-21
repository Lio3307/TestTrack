import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { auth, db, googleProvider } from "../firebase/config";

export const Register = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    setLoading,
    loading,
    signUpEmail,
    signInGoogle,
  } = useAuthContext();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await signUpEmail(auth, db, username, email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <label>Username</label>
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="Email"
        />

        <label>Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={isShowPassword ? "text" : "password"}
        />

        <input
          type="checkbox"
          onChange={(e) => {
            setIsShowPassword(e.target.value);
          }}
          value={isShowPassword}
        />

        <p>
          Already have account? <Link>Login Here</Link>{" "}
        </p>

        <button type="submit" disabled={loading}>
          Register
        </button>
        <button
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
