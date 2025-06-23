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
      navigate("/home");
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center text-light py-5">
          <div className="spinner-border text-light mb-3" role="status" />
          <h5>Loading activity...</h5>
        </div>
      ) : (
        <div
          className="container my-5 p-4 rounded shadow"
          style={{
            background: "#1f1f27",
            color: "#f1f1f1",
            maxWidth: "550px",
            border: "1px solid #333",
          }}
        >
          <h2
            className="text-center fw-bold mb-4"
            style={{
              color: "#8d79ff",
              letterSpacing: "0.5px",
            }}
          >
            📝 Update Your Activity
          </h2>

          <form onSubmit={updateHandler}>
            <div className="mb-4">
              <label htmlFor="titleInput" className="form-label fw-semibold">
                Title
              </label>
              <input
                id="titleInput"
                type="text"
                className="form-control bg-dark text-light border-0 rounded px-3 py-2"
                placeholder="e.g. My New Awesome Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                style={{
                  boxShadow:
                    "inset 2px 2px 6px #14141a, inset -2px -2px 6px #2a2a35",
                }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="textInput" className="form-label fw-semibold">
                Description
              </label>
              <textarea
                id="textInput"
                className="form-control bg-dark text-light border-0 rounded px-3 py-2"
                placeholder="Write your thoughts..."
                rows="6"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                required
                style={{
                  boxShadow:
                    "inset 2px 2px 6px #14141a, inset -2px -2px 6px #2a2a35",
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn w-100 py-2 fw-bold rounded-pill"
              style={{
                background: "linear-gradient(135deg, #6C63FF, #8d79ff)",
                color: "#fff",
                fontSize: "1rem",
                letterSpacing: "0.5px",
                boxShadow: "0 0 12px rgba(108, 99, 255, 0.4)",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              💾 Save Changes
            </button>
            <Link to={`/activity-detail/${id}`}>Cancle</Link>
          </form>
        </div>
      )}
    </>
  );
};
