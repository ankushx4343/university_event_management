import express from 'express'
import { signup , login , getProfile } from '../controllers/authController.js';
// import {protect} from '../middlewares/auth.js'

const  router=express.Router();

//public routes
router.post("/signup",signup);
router.post("/login",login);

//protected routes
// router.get('/profile',protect,getProfile)

export default router;
