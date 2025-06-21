import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

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
          <div className="container d-flex flex-column gap-4">
            {getListAct.map((list) => (
              <div
                key={list.activityId}
                style={{
                  background: "#2E2E38",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  boxShadow: "10px 10px 30px #23232b, -10px -10px 30px #3a3a46",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h4 className="fw-semibold mb-2">{list.titleActivity}</h4>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#aaa",
                    marginBottom: "0.75rem",
                  }}
                >
                  {list.createdAt.toDate().toLocaleString()}
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.5 }}>
                  {list.textActivity.length > 90
                    ? list.textActivity.slice(0, 90) + "..."
                    : list.textActivity}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
