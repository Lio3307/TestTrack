import { Route, Routes } from "react-router-dom";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { AddAct } from "./Components/AddAct";
import { useEffect } from "react";
import { DetailActivity } from "./Pages/DetailActivity";


function App() {
    useEffect(() => {
    document.body.style.backgroundColor = "#1e1e26";
    document.body.style.color = "#f1f1f1";
    document.body.style.margin = 0;
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-activity" element={<AddAct/>}/>
        <Route path="/activity-detail/:id" element={<DetailActivity />}/>
      </Routes>
    </>
  );
}

export default App;
