// ...existing code...
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import { JobPage } from "./Pages/JobPage";
import JobDetails from "./Pages/JobDetails";
import Landing from "./Pages/Landing";
import NotFound from "./Pages/NotFound";
import { ProtectedRoute } from "./Components/ProtectedRoute";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Optional Navbar across all pages */}
        <Navbar />

        <div
          style={{
            minHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "60px",
          }}
        >
          <Routes>
            {/* Landing page as root */}
            <Route path="/" element={<Landing />} />

            {/* Public pages */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected pages */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <JobPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute>
                  <JobDetails />
                </ProtectedRoute>
              }
            />

            {/* Fallback for anything unknown */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
