import express from "express"
import protect from "../middlewares/auth.js";
import { otpgenerate, otpverify } from "../controllers/otp.js";

const router=express.Router();
router.post("/send-otp",otpgenerate);
router.put("/verify-otp",otpverify)
export default router