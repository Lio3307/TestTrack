import { Link, useNavigate } from "react-router-dom";
import { ActList } from "../Components/ActList";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useAuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
export const Home = () => {
  const [getListAct, setGetListAct] = useState([]);
  const { userData, loading, setLoading } = useAuthContext();
  const [filteredActivity, setFilteredActivity] = useState("");

  const navigate = useNavigate();

  const signOutHandler = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

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
      <div
        className="d-flex justify-content-between align-items-center p-3"
        style={{ backgroundColor: "#1e1e26", color: "#f1f1f1" }}
      >
        {loading ? (
          <p className="mb-0">Loading...</p>
        ) : (
          <p className="mb-0" style={{ fontWeight: 500, fontSize: "1rem" }}>
            👋 Welcome,{" "}
            <span style={{ fontWeight: 600 }}>{userData.username}</span>
          </p>
        )}

        <button
          onClick={signOutHandler}
          className="btn btn-outline-light btn-sm rounded-pill"
          style={{
            fontWeight: 500,
            fontSize: "0.9rem",
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          }}
        >
          🔒 Sign Out
        </button>
      </div>

      <div
        className="w-100 min-vh-100"
        style={{
          backgroundColor: "#1e1e26",
          color: "#f1f1f1",
          padding: "2rem 1rem",
        }}
      >
        <div className="d-flex justify-content-center mb-5">
          <Link
            to="/add-activity"
            className="text-decoration-none"
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "20px",
              background: "linear-gradient(145deg, #2e2e38, #26262d)",
              boxShadow: "8px 8px 16px #19191f, -8px -8px 16px #3b3b49",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease-in-out",
              textAlign: "center",
              cursor: "pointer",
              color: "#f1f1f1",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(108, 99, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "8px 8px 16px #19191f, -8px -8px 16px #3b3b49";
            }}
          >
            <span
              style={{
                fontSize: "3.2rem",
                color: "#6C63FF",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              ＋
            </span>
            <span
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                marginTop: "0.5rem",
                letterSpacing: "0.5px",
              }}
            >
              Add Activity
            </span>
          </Link>
        </div>

        <input
          value={filteredActivity}
          onChange={(e) => {
            setFilteredActivity(e.target.value);
          }}
          type="text"
        />

        <div className="text-center mb-4">
          <h3 className="fw-bold">Activity List</h3>
        </div>

        <ActList searchAct={filteredActivity} loading={loading} listAct={getListAct}/>
      </div>
    </>
  );
};
