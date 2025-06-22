import { Link, useNavigate } from "react-router-dom";
import { ActList } from "../Components/ActList";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const Home = () => {
  const navigate = useNavigate();

  const signOutHandler = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };
  return (
    <>
      <div className="text-end p-3" style={{ backgroundColor: "#1e1e26" }}>
        <button
          onClick={signOutHandler}
          className="btn btn-outline-light btn-sm rounded-pill"
          style={{
            fontWeight: 500,
            fontSize: "0.9rem",
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          }}
        >
          🔒 Sign Out
        </button>
      </div>

      <div
        className="w-100 min-vh-100"
        style={{
          backgroundColor: "#1e1e26",
          color: "#f1f1f1",
          padding: "2rem 1rem",
        }}
      >
        <div className="d-flex justify-content-center mb-5">
          <Link
            to="/add-activity"
            className="text-decoration-none"
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "20px",
              background: "linear-gradient(145deg, #2e2e38, #26262d)",
              boxShadow: "8px 8px 16px #19191f, -8px -8px 16px #3b3b49",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease-in-out",
              textAlign: "center",
              cursor: "pointer",
              color: "#f1f1f1",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(108, 99, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "8px 8px 16px #19191f, -8px -8px 16px #3b3b49";
            }}
          >
            <span
              style={{
                fontSize: "3.2rem",
                color: "#6C63FF",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              ＋
            </span>
            <span
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                marginTop: "0.5rem",
                letterSpacing: "0.5px",
              }}
            >
              Add Activity
            </span>
          </Link>
        </div>

        <div className="text-center mb-4">
          <h3 className="fw-bold">Activity List</h3>
        </div>

        <ActList />
      </div>
    </>
  );
};
