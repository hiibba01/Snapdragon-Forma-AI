import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Claim from "./pages/Claim.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("forma_token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Claim */}
                <Route
                    path="/claim"
                    element={
                        <ProtectedRoute>
                            <Claim />
                        </ProtectedRoute>
                    }
                />

                {/* Default */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Unknown routes */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
};

export default App;