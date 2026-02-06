import express from "express"
import protect from "../middlewares/auth.js";
import { otpgenerate } from "../controllers/otp.js";

const router=express.Router();
router.post("/send-otp",otpgenerate);
export default router