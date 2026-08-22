import {Router} from "express";
import {holdSeat} from "../controllers/seat.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/hold",verifyJWT,holdSeat);

export default router;

