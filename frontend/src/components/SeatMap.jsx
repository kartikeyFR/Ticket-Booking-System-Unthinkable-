import React, { useState, useEffect } from "react";
import API from "../api/axios";

export default function SeatMap({ eventId }) {
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);

    useEffect(() => {
        API.get(`/seats/${eventId}`)
            .then(res => setSeats(res.data.seats))
            .catch(err => console.error(err));
    }, [eventId]);

    const handleHoldSeat = async (seatId) => {
        try {
            await API.post("/seats/hold", { seatId, eventId });
            setSelectedSeat(seatId);
            alert("Seat successfully held! Proceed to payment.");
        } catch (err) {
            alert(err.response?.data?.message || "Seat hold failed.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Select Your Seat</h2>
            <div className="grid grid-cols-6 gap-3 max-w-md">
                {seats.map((seat) => {
                    const isAvailable = seat.status === "available";
                    const isHeld = seat.status === "held";
                    
                    let bg = "bg-green-500";
                    if (isHeld) bg = "bg-yellow-500 text-black";
                    if (seat.status === "booked") bg = "bg-red-500 cursor-not-allowed";

                    return (
                        <button
                            key={seat._id}
                            disabled={!isAvailable}
                            onClick={() => handleHoldSeat(seat._id)}
                            className={`p-3 rounded text-white font-semibold ${bg}`}
                        >
                            {seat.seatNumber}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}