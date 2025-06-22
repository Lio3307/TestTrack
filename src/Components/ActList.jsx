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

    // cleanup listener
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
        <div
          className="w-100 min-vh-100 py-4"
          style={{ backgroundColor: "#2C2C34", color: "#f1f1f1" }}
        >
          <div
            className="container d-flex flex-wrap gap-4 justify-content-start"
            style={{ rowGap: "1.5rem" }}
          >
            {getListAct.map((list) => (
              <Link
                key={list.activityId}
                to={`/activity-detail/${list.activityId}`}
                className="text-decoration-none"
                style={{
                  flex: "1 1 calc(33.333% - 1rem)",
                  minWidth: "250px",
                  maxWidth: "100%",
                  background: "#2E2E38",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  boxShadow: "10px 10px 30px #23232b, -10px -10px 30px #3a3a46",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  color: "#f1f1f1",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(108, 99, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "10px 10px 30px #23232b, -10px -10px 30px #3a3a46";
                }}
              >
                <h4 className="fw-bold mb-2" style={{ color: "#ffffff" }}>
                  {list.titleActivity}
                </h4>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#bbb",
                    marginBottom: "1rem",
                  }}
                >
                  🕒 Created:{" "}
                  {list.createdAt?.toDate
                    ? list.createdAt.toDate().toLocaleString()
                    : "Unknown"}
                </p>

                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    color: "#dddddd",
                  }}
                >
                  {list.textActivity.length > 90
                    ? list.textActivity.slice(0, 90) + "..."
                    : list.textActivity}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
