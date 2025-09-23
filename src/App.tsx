import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import JobPage from "./pages/JobPage";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Start page goes to Register */}
          <Route path="/" element={<Landing />} />

          {/* Public pages */}
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        

          {/* Protected pages */}
          <Route path="/home" element={ <Home />}
             
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <JobPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
