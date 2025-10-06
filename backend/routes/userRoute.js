import express from 'express'
import protect from "../middlewares/auth.js";
import { changePassword, countUser, deleteMe, deleteUserById, getAllUsers, getMe, getUserById, updateME } from "../controllers/userController.js";
import { admin } from "../middlewares/admin.js";

const router=express.Router();

//user controlled routes
router.get("/me",protect,getMe); //checked
router.post("/update",protect,updateME); //checked
router.post("/change-pass",protect,changePassword);
router.delete("/delete",protect,deleteMe);

//admin controlled routes
router.get("/get-users",protect,admin,getAllUsers);
router.get("/:id",protect,admin,getUserById);
router.delete("/:id",protect,admin,deleteUserById);
router.get("/count/user",protect,admin,countUser);

export default router;