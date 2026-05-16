import { Router } from "express";
import { userController } from "./userController";

const router = Router();

// create single user
router.post("/",userController.createUser);
// get all users
router.get("/",userController.getAllUser);
// get single user by id
router.get("/:id", userController.getSingleUser);
// update user
router.put("/:id", userController.updateUser);
// DELETE USER
router.delete("/:id", userController.deleteUser);
export const userRoute = router