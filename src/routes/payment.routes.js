import { Router } from "express";
import { createPaymentIntent, verifyPayment } from "../controllers/payment.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-intent", verifyJWT, createPaymentIntent);
router.post("/verify", verifyJWT, verifyPayment);

export default router;