import express from 'express'
import protect from '../middlewares/auth.js';
import { admin } from '../middlewares/admin.js';
import { createEvent, getAllEvent, getEventById } from '../controllers/eventController.js';

const router=express.Router();

router.get("/get",protect,getAllEvent);
router.get("/:id",protect,getEventById);
router.post("/create",protect,admin,createEvent);

export default router;