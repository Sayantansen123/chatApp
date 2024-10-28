import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwtToken from '../utils/jwtwebToken.js'


export const userRegister = async(req,res) =>{
    try {
        //requesting from json
        const { fullname, username, email, gender, password, profilepic } = req.body;  
        console.log(req.body);
        //finding if the user exists
        const user = await User.findOne({ username, email }); 
        if (user) return res.status(500).send({ success: false, message: " UserName or Email Alredy Exist " });
        //if the user dont exists hash the password
        const hashPassword = bcryptjs.hashSync(password, 10); 
        //generating random profilepic boy
        const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        //generating random profilepic girl
        const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;


        //creating the user
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: gender === "male" ? profileBoy : profileGirl
        })
        
        //assigning jwt for the user
        if (newUser) {
            await newUser.save();
            jwtToken(newUser._id,res);
            
        } else {
            res.status(500).send({ success: false, message: "Inavlid User Data" })
        }

        res.status(201).send({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic,
            email: newUser.email,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

export const userLogin = async (req, res) => {
    try {
        //getting the user credentials for login
        const { email, password } = req.body;
        //finding if the user exists or not
        const user = await User.findOne({ email })
        if (!user) return res.status(500).send({ success: false, message: "Email Dosen't Exist Register" })
        //comparing the user entered password and password saved in database    
        const comparePasss = bcryptjs.compareSync(password, user.password || "");
        if (!comparePasss) return res.status(500).send({ success: false, message: "Email Or Password dosen't Matching" })
        
        //assigning the jwt 
        jwtToken(user._id, res);

        res.status(200).send({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic,
            email:user.email,
            message: "Succesfully LogIn"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

export const userLogOut=async(req,res)=>{
    
    try {
        //logout so clear the cookie
        res.cookie("jwt",'',{
            maxAge:0
        })
        res.status(200).send({success:true ,message:"User LogOut"})

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}