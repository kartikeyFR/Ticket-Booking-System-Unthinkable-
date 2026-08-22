import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import seatRouter from "./routes/seat.routes.js";
app.use("/api/v1/seats", seatRouter);

import bookingRouter from "./routes/booking.routes.js"
app.use("/api/v1/booking",bookingRouter);

import waitlistRouter from "./routes/waitlist.routes.js"
app.use("/api/v1/waitlist",waitlistRouter);

import authRouter from "./routes/auth.routes.js";
app.use("/api/v1/auth",authRouter);

import paymentRouter from "./routes/payment.routes.js";
app.use("/api/v1/payments", paymentRouter);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running smoothly" });
});

export { app };