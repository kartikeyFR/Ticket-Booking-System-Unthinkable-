import {Router} from "express";
import {confirmBooking} from "../controllers/booking.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();

router.post("/confirm",verifyJWT,confirmBooking)

export default router;




