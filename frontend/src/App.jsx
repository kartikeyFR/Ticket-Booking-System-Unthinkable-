import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MyTickets from "./pages/MyTickets";
import SeatMap from "./components/SeatMap";
import OrganizerDashboard from "./pages/OrganizerDashboard";

export default function App() {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/tickets" 
                    element={isAuthenticated ? <MyTickets /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/event/:eventId/seats" 
                    element={<SeatMap eventId="sample-event-id" />} 
                />
                <Route 
                    path="/organizer/event/:eventId" 
                    element={<OrganizerDashboard eventId="sample-event-id" />} 
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}
