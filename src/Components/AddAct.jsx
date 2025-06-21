import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useState } from "react";

export const AddAct = () => {
  const [titleAct, setTitleAct] = useState("");
  const [textAct, setTextAct] = useState("");
  const [loading, setLoading] = useState(false);

  const addActivityHanlder = async () => {
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
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="bg-white p-4 rounded shadow w-100"
          style={{ maxWidth: "500px" }}
        >
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status" />
              <h5 className="mt-2">Creating Activity...</h5>
            </div>
          ) : (
            <form>
              <h3 className="text-center mb-4">Create New Activity</h3>

              <div className="mb-3">
                <label htmlFor="titleAct" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="titleAct"
                  className="form-control"
                  placeholder="Enter activity title"
                  value={titleAct}
                  onChange={(e) => setTitleAct(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="textAct" className="form-label">
                  Description
                </label>
                <textarea
                  id="textAct"
                  className="form-control"
                  placeholder="Enter activity details"
                  value={textAct}
                  onChange={(e) => setTextAct(e.target.value)}
                  rows="4"
                  required
                />
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-success"
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    addActivityHanlder();
                  }}
                >
                  Create Activity
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
