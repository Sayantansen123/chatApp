import express from "express"
import { getMessages, sendMessage } from "../routeController/messageRouteController.js";
import isLogin from "../Middleware/isLogin.js";



const router = express.Router();

router.post('/send/:id',isLogin,sendMessage)
router.get('/:id',isLogin,getMessages)



export default router