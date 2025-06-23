import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useParams } from "react-router-dom";
import { DeleteActivity } from "../utils/deleteActivity";

export const DetailActivity = () => {
  const [detailActivity, setDetailActivity] = useState({});
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

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
      }
    });
    return () => unsubs();
  }, []);

  const deleteHandler = (e) => {
    e.preventDefault();
    DeleteActivity(id, userId);
  };

  return (
    <>
      {loading ? (
        <div
          className="w-100 min-vh-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#1e1e26", color: "#f1f1f1" }}
        >
          <p className="fs-5">Loading...</p>
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
          {/* Top Bar */}
          <div className="container mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="d-flex gap-2">
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

              <button
                onClick={deleteHandler}
                className="btn btn-danger btn-sm rounded-pill px-4"
                style={{
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  boxShadow: "0 0 10px rgba(255, 0, 0, 0.2)",
                }}
              >
                🗑️ Delete
              </button>
            </div>

            <span className="small text-muted">
              {detailActivity.createdAt?.toDate().toLocaleString()}
            </span>
          </div>

          {/* Content */}
          <div className="container">
            <h1 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
              {detailActivity.titleActivity}
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "#dcdcdc",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
              }}
            >
              {detailActivity.textActivity}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
