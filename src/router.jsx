import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Ajoute d'autres routes ici au besoin */}
    </Routes>
  );
}