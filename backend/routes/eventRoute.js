import express from 'express'
import protect from '../middlewares/auth.js';
import { admin } from '../middlewares/admin.js';
import { countTodaysEvents, countUpcomingEvents, createEvent, deleteEvent, getAllEvent, getEventById, registerForEvent, unregisterForEvent, updateEvent } from '../controllers/eventController.js';

const router=express.Router();

//anyone can access these routes
router.get("/get",protect,getAllEvent);
router.get("/:id",protect,getEventById);
router.put("/register/:id",protect,registerForEvent);
router.delete("/register/:id",protect,unregisterForEvent);

//only admin can create events
router.post("/create",protect,admin,createEvent);
router.delete("/delete/:id",protect,admin,deleteEvent);
router.put("/update/:id",protect,admin,updateEvent);
router.get("/count/activeevents",protect,admin,countUpcomingEvents)//only admin can access
router.get("/count/todayevent",protect,admin,countTodaysEvents)

export default router;