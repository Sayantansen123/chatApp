import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js';

const isLogin = (req, res, next) => {
    try {
        //getting the token from the cookies
        const token = req.cookies.jwt
        if (!token) return res.status(500).send({ success: false, message: "User Unauthorize" });
        //verifying the token
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode)  return res.status(500).send({success:false, message:"User Unauthorize -Invalid Token"})
        //getting the user details by its id
        const user = User.findById(decode.userId).select("-password");
        if(!user) return res.status(500).send({success:false, message:"User not found"})
        //assigning the req.user with value of user but the password is not given
        req.user = user,
        //redirected to the next function
        next()
    } catch (error) {
        console.log(`error in isLogin middleware ${error.message}`);
        res.status(500).send({
            success: false,
            message: error
        })
    }
}

export default isLogin