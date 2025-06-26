import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { UpdateActivity } from "../utils/updateActivity";

export const UpdatedActivity = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [getUserId, setUserId] = useState(null);
  const [newText, setNewText] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setUserId(user.uid);
          const docRef = doc(db, "Users", user.uid, "Activity", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            console.log(docData);
            setNewText(docData.textActivity);
            setNewTitle(docData.titleActivity);
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
  }, [id]);

  const updateHandler = (e) => {
    e.preventDefault();

    if(!newText.trim() || !newTitle.trim()) {
        alert("Input Field Cannot Be Empty!!")
        return;
    }

    try {
      setLoading(true);
      UpdateActivity(getUserId, id, {
        titleActivity: newTitle,
        textActivity: newText,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      navigate(`/activity-detail/${id}`);
    }
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
            style={{ width: "3rem", height: "3rem", color: "#8d79ff" }}
            role="status"
          />
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
                to={`/activity-detail/${id}`}
                className="btn btn-outline-secondary btn-sm rounded-pill px-4"
                style={{
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  borderColor: "#aaa",
                  color: "#ccc",
                }}
              >
                ❌ Cancel
              </Link>
            </div>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={updateHandler}
                className="btn btn-sm fw-semibold rounded-pill px-4 py-2"
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #8d79ff)",
                  color: "#fff",
                  fontSize: "0.9rem",
                  boxShadow: "0 0 12px rgba(108, 99, 255, 0.4)",
                }}
              >
                💾 Save
              </button>
            </div>
          </div>

          <div className="container">
            <form onSubmit={updateHandler}>
              <input
                type="text"
                placeholder="Note Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="form-control bg-dark text-light border-0 mb-4 px-4 py-3 fs-3 fw-bold rounded"
                style={{
                  boxShadow:
                    "inset 2px 2px 6px #14141a, inset -2px -2px 6px #2a2a35",
                }}
                required
              />

              <textarea
                placeholder="Write your note here..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                rows="10"
                className="form-control bg-dark text-light border-0 mb-4 px-4 py-3 fs-5 rounded"
                style={{
                  lineHeight: "1.8",
                  resize: "vertical",
                  boxShadow:
                    "inset 2px 2px 6px #14141a, inset -2px -2px 6px #2a2a35",
                }}
                required
              ></textarea>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
