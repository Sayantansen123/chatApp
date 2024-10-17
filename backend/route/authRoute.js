import express from "express"
import { userRegister } from "../routeController/userRouterController.js";

const router = express.Router();

router.post("/register",userRegister)

export default router