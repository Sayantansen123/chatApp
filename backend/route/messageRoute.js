import express from "express"
import { sendMessage } from "../routeController/messageRouteController";
import isLogin from "../Middleware/isLogin";



const router = express.Router();

router.post('/send/:id',isLogin,sendMessage)



export default router