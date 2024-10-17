import express from "express"
import { userLogin, userLogOut, userRegister } from "../routeController/userRouterController.js";

const router = express.Router();

router.post("/register",userRegister)

router.post("/login",userLogin)


router.post("/logout",userLogOut)

export default router