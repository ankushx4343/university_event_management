import express from 'express'
import protect from '../middlewares/auth.js';
import { admin } from '../middlewares/admin.js';
import { createEvent, getAllEvent, getEventById, registerForEvent } from '../controllers/eventController.js';

const router=express.Router();

//anyone can access these routes
router.get("/get",protect,getAllEvent);
router.get("/:id",protect,getEventById);
router.put("/register/:id",protect,registerForEvent);

//only admin can create events
router.post("/create",protect,admin,createEvent);

export default router;