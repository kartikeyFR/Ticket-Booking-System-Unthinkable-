import React, { useState, useEffect } from "react";
import API from "../api/axios";

export default function OrganizerDashboard({ eventId }) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/booking/organizer/revenue/${eventId}`)
            .then(res => setSummary(res.data))
            .catch(err => console.error("Failed to load organizer summary:", err))
            .finally(() => setLoading(false));
    }, [eventId]);

    if (loading) return <div className="p-6">Loading revenue analytics...</div>;
    if (!summary) return <div className="p-6">No data found for this event.</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Organizer Revenue & Summary[cite: 1]</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border p-5 rounded-lg shadow bg-blue-50">
                    <p className="text-sm text-gray-600">Total Revenue Generated</p>
                    <p className="text-3xl font-extrabold text-blue-600 mt-1">₹{summary.totalRevenue}</p>
                </div>
                <div className="border p-5 rounded-lg shadow bg-green-50">
                    <p className="text-sm text-gray-600">Total Tickets Sold</p>
                    <p className="text-3xl font-extrabold text-green-600 mt-1">{summary.totalTicketsSold}</p>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Category Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(summary.categoryBreakdown || {}).map(([category, stats]) => (
                    <div key={category} className="border p-4 rounded shadow bg-white">
                        <h4 className="font-bold text-lg text-gray-800">{category}</h4>
                        <p className="text-sm text-gray-600 mt-2">Sold: {stats.ticketsSold} tickets</p>
                        <p className="text-sm text-gray-600">Revenue: ₹{stats.revenue}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}