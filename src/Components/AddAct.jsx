import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useState } from "react";
{
  /** Title, Neumorphic input */
}

import { Link } from "react-router-dom";

export const AddAct = () => {
  const [titleAct, setTitleAct] = useState("");
  const [textAct, setTextAct] = useState("");
  const [loading, setLoading] = useState(false);

  const addActivityHanlder = async () => {
    if(!titleAct.trim() || !textAct.trim()) {
      alert("Input Field Cannot Be Empty!!")
      return
    }
    try {
      setLoading(true);
      const user = auth.currentUser;
      const subCollection = collection(db, "Users", user.uid, "Activity");
      await addDoc(subCollection, {
        titleActivity: titleAct,
        textActivity: textAct,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      alert("Activity Has Been Created!!");
    }
  };

  return (
    <>
      <div
        className="w-100 min-vh-100 d-flex justify-content-center align-items-center"
        style={{ background: "#2C2C34" }}
      >
        <div
          style={{
            maxWidth: "500px",
            width: "100%",
            background: "#2E2E38",
            borderRadius: "20px",
            boxShadow: "20px 20px 60px #23232b, -20px -20px 60px #3a3a46",
            padding: "2rem",
            position: "relative",
          }}
        >
          <Link
            to="/home"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "0.9rem",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.4)",
            }}
          >
            Cancel
          </Link>

          <div className="text-center mb-4">
            <div
              style={{
                width: 60,
                height: 60,
                margin: "0 auto",
                borderRadius: "50%",
                background: "#2C2C34",
                boxShadow: "8px 8px 16px #23232b, -8px -8px 16px #3a3a46",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="fs-3">📝</span>
            </div>
            <h2 className="text-light fw-bold mt-3">Create Activity</h2>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-light mb-3" role="status" />
              <p className="text-secondary">Saving...</p>
            </div>
          ) : (
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  value={titleAct}
                  onChange={(e) => setTitleAct(e.target.value)}
                  placeholder="Activity Title"
                  required
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "12px",
                    border: "none",
                    background: "#2C2C34",
                    boxShadow:
                      "inset 5px 5px 10px #23232b, inset -5px -5px 10px #3a3a46",
                    color: "#eee",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div className="mb-5">
                <textarea
                  value={textAct}
                  onChange={(e) => setTextAct(e.target.value)}
                  placeholder="Describe your activity..."
                  required
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "12px",
                    border: "none",
                    background: "#2C2C34",
                    boxShadow:
                      "inset 5px 5px 10px #23232b, inset -5px -5px 10px #3a3a46",
                    color: "#eee",
                    fontSize: "1rem",
                  }}
                ></textarea>
              </div>

              <div className="d-grid">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addActivityHanlder();
                  }}
                  disabled={loading}
                  className="w-100"
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "12px",
                    border: "none",
                    background: "#6C63FF",
                    color: "#ffffff",
                    fontSize: "1rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 15px rgba(108, 99, 255, 0.3)",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(108, 99, 255, 0.6)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(108, 99, 255, 0.3)")
                  }
                >
                  <span style={{ fontSize: "1.2rem" }}>🚀</span> Create Activity
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
