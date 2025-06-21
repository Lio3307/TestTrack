import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="my-4 d-flex justify-content-center"
      style={{
      backgroundColor: "#1e1e26",
      color: "#f1f1f1",
    }}>
        <Link
          to="/add-activity"
          className="text-decoration-none"
          style={{
            width: "160px",
            height: "160px",
            backgroundColor: "#2E2E38", // ⬅️ Ubah latar di sini
            borderRadius: "20px",
            boxShadow: "12px 12px 24px #23232b, -12px -12px 24px #3a3a46", // Neumorphic
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#f1f1f1",
            transition: "all 0.3s ease-in-out",
            fontFamily: "inherit",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(108, 99, 255, 0.4)";
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.backgroundColor = "#363646"; // sedikit lebih terang saat hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "12px 12px 24px #23232b, -12px -12px 24px #3a3a46";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "#2E2E38"; // kembali ke warna awal
          }}
        >
          <span style={{ fontSize: "3rem", lineHeight: 1 }}>＋</span>
          <span
            style={{ fontWeight: "600", marginTop: "0.4rem", fontSize: "1rem" }}
          >
            Add Activity
          </span>
        </Link>
      </div>
    </>
  );
};
