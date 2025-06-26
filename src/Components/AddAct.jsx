import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddAct = () => {
  const [titleAct, setTitleAct] = useState("");
  const [textAct, setTextAct] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectStatus, setSelectStatus] = useState("On Progress");

  const navigate = useNavigate();

  const addActivityHanlder = async () => {
    if (!titleAct.trim() || !textAct.trim()) {
      alert("Input Field Cannot Be Empty!!");
      return;
    } 

    try {
      setLoading(true);
      const user = auth.currentUser;
      const subCollection = collection(db, "Users", user.uid, "Activity");
      await addDoc(subCollection, {
        titleActivity: titleAct,
        textActivity: textAct,
        status: selectStatus,
        userId: user.uid,
        createdAt: serverTimestamp(), 
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      alert("Activity Has Been Created!!");
      navigate("/home");
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
              <button
                onClick={() => navigate("/home")}
                className="btn btn-outline-light btn-sm rounded-pill px-4"
                style={{
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                }}
              >
                ← Back Home
              </button>
            </div>

            <div className="mb-4">
              <label
                htmlFor="dropdownPilihan"
                className="form-label fw-semibold text-light"
                style={{ fontSize: "1rem", letterSpacing: "0.3px" }}
              >
                🗂️ Select Status
              </label>
              <select
                id="dropdownPilihan"
                name="pilihan"
                className="form-select bg-dark text-light border-0 shadow-sm"
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  boxShadow:
                    "inset 2px 2px 6px #14141a, inset -2px -2px 6px #2a2a35",
                }}
                value={selectStatus}
                onChange={(e) => setSelectStatus(e.target.value)}
                required
              >
                <option value="On Progress">🕓 On Progress</option>
                <option value="Completed">✅ Completed</option>
                <option value="Not Completed">❌ Not Completed</option>
              </select>
            </div>

            {console.log(selectStatus)}

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={addActivityHanlder}
                className="btn btn-sm fw-semibold rounded-pill px-4 py-2"
                style={{
                  background: "linear-gradient(135deg, #6C63FF, #8d79ff)",
                  color: "#fff",
                  fontSize: "0.9rem",
                  boxShadow: "0 0 12px rgba(108, 99, 255, 0.4)",
                }}
              >
                🚀 Create Activity
              </button>
            </div>
          </div>

          <div className="container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addActivityHanlder();
              }}
            >
              <input
                type="text"
                placeholder="Activity Title"
                value={titleAct}
                onChange={(e) => setTitleAct(e.target.value)}
                className="form-control bg-dark text-light border-0 mb-4 px-4 py-3 fs-3 fw-bold rounded"
                style={{
                  boxShadow:
                    "inset 2px 2px 6px #14141a, inset -2px -2px 6px #2a2a35",
                }}
                required
              />

              <textarea
                placeholder="Describe your activity..."
                value={textAct}
                onChange={(e) => setTextAct(e.target.value)}
                rows="9"
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
