import { Link } from "react-router-dom";
import { ActList } from "../Components/ActList";

export const Home = () => {
  return (
    <>
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
              width: "160px",
              height: "160px",
              backgroundColor: "#2E2E38",
              borderRadius: "50%",
              boxShadow:
                "inset 8px 8px 16px #23232b, inset -8px -8px 16px #3a3a46",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#f1f1f1",
              transition: "all 0.3s ease-in-out",
              textAlign: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(108, 99, 255, 0.5)";
              e.currentTarget.style.transform = "scale(1.07)";
              e.currentTarget.style.backgroundColor = "#38384a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "inset 8px 8px 16px #23232b, inset -8px -8px 16px #3a3a46";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#2E2E38";
            }}
          >
            <span
              style={{
                fontSize: "3rem",
                lineHeight: 1,
                color: "#6C63FF",
                transition: "transform 0.3s",
              }}
            >
              ＋
            </span>
            <span
              style={{
                fontWeight: "600",
                marginTop: "0.5rem",
                fontSize: "0.95rem",
              }}
            >
              Add Activity
            </span>
          </Link>
        </div>

        <div className="text-center mb-4">
          <h3 className="fw-bold">Activity List</h3>
        </div>

        <ActList />
      </div>
    </>
  );
};
