import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
    <div className="container m-2">
      <Link to={""} className="btn btn-outline-primary d-flex flex-column align-items-center justify-content-center px-4 py-3 rounded-4 shadow-sm gap-1">
        <span className="fs-1">+</span>
        <span className="fw-semibold">Add Activity</span>
      </Link>

    </div>
    </>
  );
};
