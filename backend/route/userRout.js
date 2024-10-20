import express from 'express'
import isLogin from '../Middleware/isLogin.js'
import { getCorrentChatters, getUserBySearch } from '../routeController/userhandlerControler.js';

const router = express.Router()

router.get('/search',isLogin,getUserBySearch);

router.get('/currentchatters',isLogin,getCorrentChatters)



export default router