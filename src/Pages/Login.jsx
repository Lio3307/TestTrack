import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { auth, db, googleProvider } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

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
    } finally {
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
            handleLogin();
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
          <h3 className="text-center mb-4 fw-bold text-light">Sign In</h3>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
              style={{
                background: "#2C2C34",
                border: "none",
                color: "#eee",
                padding: "0.75rem",
                borderRadius: "12px",
                boxShadow:
                  "inset 5px 5px 10px #23232b, inset -5px -5px 10px #3a3a46",
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">
              Password
            </label>
            <input
              id="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              style={{
                background: "#2C2C34",
                border: "none",
                color: "#eee",
                padding: "0.75rem",
                borderRadius: "12px",
                boxShadow:
                  "inset 5px 5px 10px #23232b, inset -5px -5px 10px #3a3a46",
              }}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isShowPassword}
              onChange={(e) => setIsShowPassword(e.target.checked)}
              id="showPassword"
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
              className="btn"
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
              {loading ? "Logging in..." : "Login"}
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
                } catch (err) {
                  console.error(err);
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
              Login with Google
            </button>
          </div>

          <p className="text-center text-light">
            Don't have an account?{" "}
            <Link to="/" className="text-decoration-none text-info">
              Create here!
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
