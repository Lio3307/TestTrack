import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

export const ActList = () => {
  const [getListAct, setGetListAct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const getAct = async () => {
          try {
            const collectionRef = collection(db, "Users", user.uid, "Activity");
            const collectionSnap = await getDocs(collectionRef);

            const list = collectionSnap.docs.map((doc) => ({
              activityId: doc.id,
              ...doc.data(),
            }));

            setGetListAct(list);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };

        getAct();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center text-light py-5">
          <div className="spinner-border text-light mb-3" role="status" />
          <p>Loading activities...</p>
        </div>
      ) : getListAct.length === 0 ? (
        <div
          className="w-100 min-vh-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#2C2C34", color: "#f1f1f1" }}
        >
          <h3 className="text-center">No Activity Created</h3>
        </div>
      ) : (
        <div className="w-100 min-vh-100 py-4" style={{ color: "#f1f1f1" }}>
          <div
            className="container d-flex flex-wrap justify-content-start"
            style={{ gap: "1.5rem" }}
          >
            {getListAct.map((list) => (
              <Link
                key={list.activityId}
                to={`/activity-detail/${list.activityId}`}
                className="text-decoration-none"
                style={{
                  flex: "1 1 calc(31% - 1rem)",
                  minWidth: "260px",
                  background: "linear-gradient(145deg, #2e2e38, #26262d)",
                  borderRadius: "18px",
                  padding: "1.8rem",
                  boxShadow: "6px 6px 12px #1e1e26, -6px -6px 12px #3a3a46",
                  transition: "all 0.3s ease-in-out",
                  color: "#f1f1f1",
                  display: "block",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(108, 99, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "6px 6px 12px #1e1e26, -6px -6px 12px #3a3a46";
                }}
              >
                <h5
                  className="fw-bold mb-2"
                  style={{
                    color: "#ffffff",
                    fontSize: "1.25rem",
                  }}
                >
                  {list.titleActivity}
                </h5>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#aaa",
                    marginBottom: "1rem",
                  }}
                >
                  <span role="img" aria-label="clock">
                    🕒 Created :
                  </span>{" "}
                  {list.createdAt?.toDate
                    ? list.createdAt.toDate().toLocaleString()
                    : "Unknown"}
                </p>

                <p
                  style={{
                    fontSize: "1rem",
                    color: "#e0e0e0",
                    lineHeight: 1.6,
                  }}
                >
                  {list.textActivity.length > 100
                    ? list.textActivity.slice(0, 100) + "..."
                    : list.textActivity}
                </p>

                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "4px",
                    background: "linear-gradient(to right, #6C63FF, #9A7DFF)",
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
