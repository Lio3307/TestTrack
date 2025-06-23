import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useParams } from "react-router-dom";
import { DeleteActivity } from "../utils/deleteActivity";

export const DetailActivity = () => {
  const [detailActivity, setDetailActivity] = useState({});
  const [userId, setUserId] = useState(null)

  const { id } = useParams();

  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        const getActivityRef = doc(db, "Users", user.uid, "Activity", id);
        const activitySnapshot = await getDoc(getActivityRef);
        if (activitySnapshot.exists()) {
          setDetailActivity({
            acivityId: activitySnapshot.id,
            ...activitySnapshot.data(),
          });
        }
      }
    });
    return () => unsubs();
  }, []);

  const deleteHandler = (e) => {
    e.preventDefault()
    DeleteActivity(id, userId)
  }

  return (
    <>
      <div
        className="w-100 min-vh-100"
        style={{
          backgroundColor: "#1e1e26",
          color: "#f1f1f1",
          padding: "2rem",
        }}
      >
        <div className="container mb-4 d-flex justify-content-between align-items-center">
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

          <button onClick={deleteHandler}>Delete Activity</button>

          <span className=" small">
           Created : {detailActivity.createdAt?.toDate().toLocaleString()}
          </span>
        </div>

        <div className="container">
          <h1
            style={{
              fontWeight: 700,
              fontSize: "2.5rem",
              marginBottom: "1rem",
              color: "#ffffff",
            }}
          >
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
    </>
  );
};
