import {Router} from "express";
import {confirmBooking, getUserTickets} from "../controllers/booking.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();

router.post("/confirm",verifyJWT,confirmBooking)
router.get("/tickets", verifyJWT, getUserTickets);

export default router;




