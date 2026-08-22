import {Router} from "express";
import {joinWaitlist} from "../controllers/waitlist.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();

router.post("/join",verifyJWT,joinWaitlist);

export default router;