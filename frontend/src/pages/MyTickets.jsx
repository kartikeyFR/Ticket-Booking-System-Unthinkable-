import React, { useState, useEffect } from "react";
import API from "../api/axios";

export default function MyTickets() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = async () => {
        try {
            const res = await API.get("/booking/tickets");
            setBookings(res.data.bookings);
        } catch (err) {
            console.error("Failed to fetch tickets:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await API.delete(`/booking/cancel/${bookingId}`);
            alert("Booking cancelled successfully.");
            fetchTickets();
        } catch (err) {
            alert(err.response?.data?.message || "Cancellation failed.");
        }
    };

    if (loading) return <div className="p-6">Loading your tickets...</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">My Booked Tickets[cite: 1]</h2>
            {bookings.length === 0 ? (
                <p>No active bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="border p-5 rounded-lg shadow bg-white">
                            <p className="text-sm text-gray-500">Ticket Reference:</p>
                            <p className="font-mono font-bold text-lg">{booking.ticketNumber}</p>
                            
                            <p className="mt-2"><strong>Seat:</strong> {booking.seatId?.seatNumber || "Assigned Seat"}</p>
                            <p><strong>Status:</strong> <span className="text-green-600 font-semibold">{booking.status}</span></p>

                            {booking.qrCodeData && (
                                <div className="mt-4 flex flex-col items-center">
                                    <img src={booking.qrCodeData} alt="Ticket QR Code" className="w-36 h-36" />
                                    <span className="text-xs text-gray-400 mt-1">Scan at venue entrance</span>
                                </div>
                            )}

                            <button
                                onClick={() => handleCancel(booking._id)}
                                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}