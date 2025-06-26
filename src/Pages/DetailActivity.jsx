import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteActivity } from "../utils/deleteActivity";

export const DetailActivity = () => {
  const [detailActivity, setDetailActivity] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setUserId(user.uid);
          const getActivityRef = doc(db, "Users", user.uid, "Activity", id);
          const activitySnapshot = await getDoc(getActivityRef);
          if (activitySnapshot.exists()) {
            setDetailActivity({
              acivityId: activitySnapshot.id,
              ...activitySnapshot.data(),
            });
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        alert("User Not LoggedIn!!");
        navigate("/login");
      }
    });
    return () => unsubs();
  }, []);

  const deleteHandler = () => {
    DeleteActivity(id, userId);
  };

  return (
    <>
      {loading ? (
        <div
          className="w-100 min-vh-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#1e1e26" }}
        >
          <div
            className="spinner-border"
            style={{
              width: "3rem",
              height: "3rem",
              color: "#6C63FF",
            }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          className="w-100 min-vh-100"
          style={{
            backgroundColor: "#1e1e26",
            color: "#f1f1f1",
            padding: "2rem",
          }}
        >
          <div className="container mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="d-flex gap-2 flex-wrap">
              <Link
                to="/home"
                className="btn btn-outline-light btn-sm rounded-pill px-4"
                style={{
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                }}
              >
                ← Back Home
              </Link>

              <Link
                to={`/update-activity/${id}`}
                className="btn btn-outline-primary btn-sm rounded-pill px-4"
                style={{
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  boxShadow: "0 0 10px rgba(108,99,255,0.1)",
                  color: "#6C63FF",
                  borderColor: "#6C63FF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#6C63FF";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#6C63FF";
                }}
              >
                ✏️ Update
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  try {
                    deleteHandler();
                  } catch (err) {
                    console.error(err);
                  } finally {
                    navigate("/home");
                  }
                }}
                className="btn btn-outline-danger btn-sm rounded-pill px-4 d-flex align-items-center gap-2"
                style={{
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  borderColor: "#e74c3c",
                  color: "#e74c3c",
                  boxShadow: "0 0 10px rgba(231, 76, 60, 0.15)",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e74c3c";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#e74c3c";
                }}
              >
                🗑️ Delete
              </button>
            </div>

            <span style={{ color: "#bbbbbb", fontSize: "0.85rem" }}>
              🕒 Created: {detailActivity.createdAt?.toDate().toLocaleString()}
            </span>
          </div>

          <div className="container mb-3">
            <h1
              className="fw-bold"
              style={{
                fontSize: "2.4rem",
                color: "#f5f5f5",
                borderBottom: "2px solid #3a3a46",
                paddingBottom: "0.5rem",
              }}
            >
              {detailActivity.titleActivity}
            </h1>
          </div>

          <div className="container">
            <div
              style={{
                backgroundColor: "#2a2a33",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow:
                  "inset 3px 3px 6px #1a1a1f, inset -3px -3px 6px #33333a",
              }}
            >
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#e0e0e0",
                  lineHeight: 1.8,
                  whiteSpace: "pre-line",
                  textAlign: "justify",
                  marginBottom: 0,
                }}
              >
                {detailActivity.textActivity}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
