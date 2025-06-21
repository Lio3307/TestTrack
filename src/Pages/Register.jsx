import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await signUpEmail(auth, db, username, email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      navigate("/home");
    }
  };
  return (
    <>
      <div
        className="w-100 d-flex justify-content-center align-items-center min-vh-100"
        style={{ background: "#2C2C34" }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          style={{
            maxWidth: "420px",
            width: "100%",
            background: "#2E2E38",
            borderRadius: "20px",
            boxShadow: "20px 20px 60px #23232b, -20px -20px 60px #3a3a46",
            padding: "2rem",
            color: "#f1f1f1",
          }}
        >
          <h3 className="text-center mb-4 fw-bold text-light">
            Create Account
          </h3>

          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={{
                background: "#2C2C34",
                border: "none",
                color: "#eee",
                padding: "0.75rem",
                borderRadius: "12px",
                boxShadow:
                  "inset 5px 5px 10px #23232b, inset -5px -5px 10px #3a3a46",
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                background: "#2C2C34",
                border: "none",
                color: "#eee",
                padding: "0.75rem",
                borderRadius: "12px",
                boxShadow:
                  "inset 5px 5px 10px #23232b, inset -5px -5px 10px #3a3a46",
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">
              Password
            </label>
            <input
              id="password"
              type={isShowPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                background: "#2C2C34",
                border: "none",
                color: "#eee",
                padding: "0.75rem",
                borderRadius: "12px",
                boxShadow:
                  "inset 5px 5px 10px #23232b, inset -5px -5px 10px #3a3a46",
              }}
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="showPassword"
              checked={isShowPassword}
              onChange={(e) => setIsShowPassword(e.target.checked)}
            />
            <label
              className="form-check-label text-light"
              htmlFor="showPassword"
            >
              Show Password
            </label>
          </div>

          <div className="d-grid mb-2">
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.75rem",
                borderRadius: "50px",
                border: "none",
                background: "#5860ef",
                color: "#fff",
                fontWeight: "600",
                boxShadow: "5px 5px 15px #23232b, -5px -5px 15px #3a3a46",
              }}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <div className="d-grid mb-3">
            <button
              type="button"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                try {
                  signInGoogle(db, auth, googleProvider);
                } catch (error) {
                  console.error(error);
                } 
              }}
              style={{
                padding: "0.75rem",
                borderRadius: "50px",
                border: "none",
                background: "#DB4437",
                color: "#fff",
                fontWeight: "600",
                boxShadow: "5px 5px 15px #23232b, -5px -5px 15px #3a3a46",
              }}
            >
              Sign Up with Google
            </button>
          </div>

          <p className="text-center text-light">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none text-info">
              SignIn here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
