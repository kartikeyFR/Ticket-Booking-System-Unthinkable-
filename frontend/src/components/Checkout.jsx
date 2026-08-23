import React, { useState } from "react";
import API from "../api/axios";

export default function Checkout({ seatId, eventId, onComplete }) {
    const [loading, setLoading] = useState(false);

    const handlePaymentAndConfirm = async () => {
        setLoading(true);
        try {
            const paymentRes = await API.post("/payment/create-intent", {
                amount: 500,
                currency: "INR"
            });
            const transactionId = paymentRes.data.transactionId;

            const confirmRes = await API.post("/booking/confirm", {
                seatId,
                eventId,
                transactionId
            });

            alert("Booking confirmed successfully!");
            if (onComplete) onComplete(confirmRes.data);
        } catch (err) {
            alert(err.response?.data?.message || "Checkout failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-lg max-w-sm mx-auto shadow-md bg-white">
            <h3 className="text-xl font-bold mb-4">Complete Payment</h3>
            <p className="text-gray-600 mb-4">Seat is held temporarily. Complete payment to secure your ticket[cite: 1].</p>
            <button
                disabled={loading}
                onClick={handlePaymentAndConfirm}
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
                {loading ? "Processing..." : "Pay ₹500 & Confirm"}
            </button>
        </div>
    );
}