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
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="bg-white p-4 rounded shadow w-100"
          style={{ maxWidth: "400px" }}
        >
          <h3 className="text-center mb-4">Register</h3>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
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
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
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
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
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
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <div className="d-grid mb-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                signInGoogle(db, auth, googleProvider);
              }}
            >
              Sign Up with Google
            </button>
          </div>

          <p className="text-center text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
