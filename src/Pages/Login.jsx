import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { auth, db, googleProvider } from "../firebase/config";
import { Link } from "react-router-dom";

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
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="border p-4 rounded shadow bg-white w-100"
          style={{ maxWidth: "400px" }}
        >
          <h3 className="text-center mb-4">Login</h3>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
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
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>

          <div className="d-grid mb-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="d-grid mb-3">
            <button
              type="button"
              className="btn btn-danger"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                signInGoogle(db, auth, googleProvider);
              }}
            >
              Login with Google
            </button>
          </div>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Create here!
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
