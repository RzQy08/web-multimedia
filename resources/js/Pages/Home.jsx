import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Index";
import AdminDashboard from "./admin/AdminDashboard";

export default function LuminaApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}