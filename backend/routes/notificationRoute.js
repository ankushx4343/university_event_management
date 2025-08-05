import express from "express";
import protect from "../middlewares/auth.js";
import { getAllEvent } from "../controllers/eventController.js";
import { getUserNotifications, markNotification } from "../controllers/notificationController.js";

const router=express.Router();
router.get("/",protect,getUserNotifications);
router.put("/:id/read",protect,markNotification);
export default router;