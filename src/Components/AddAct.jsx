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
      {loading ? (
        <>
          <h3>Creating Activity...</h3>
        </>
      ) : (
        <>
          <label>Create Title</label>
          <input
            value={titleAct}
            onChange={(e) => {
              setTitleAct(e.target.value);
            }}
            type="text"
          />

          <label>Create Text</label>
          <textarea
            value={textAct}
            onChange={(e) => {
              setTextAct(e.target.value);
            }}
            type="text"
          />

          <button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              addActivityHanlder();
            }}
          >
            Create Activity
          </button>
        </>
      )}
    </>
  );
};
