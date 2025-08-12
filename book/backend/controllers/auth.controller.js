
import { User } from "../models/users";
import AsyncHandler from "express-async-handler";

export const Register = AsyncHandler(async (req, res) => {
    const { username, email, password, profile } = req.body;
    try {
        const newUser = new User({
            username,
            profile,
            email,
            password,
        });
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",
            });
        const savedUser = await newUser.save(); // save new user into the database
        const {password:_, ...user_data} = savedUser._doc;
        res.status(200).json({
            status: "success",
            data: [user_data],
            message:
                "Thank you for registering with us. Your account has been successfully created.",
        });
        console.log("User created successfully". newUser);
    } catch (err) {
        console.log("did not create")
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
});

export const Login = AsyncHandler(async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user) {
            return res.status(401).json({
                status: 'failed',
                message: "User with that email doesn\'t exist.",
                data: [email]
            });
        };
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid) {
            return res.status(401).json({
                status: "failed",
                message: "Password is incorrect.",
                data: []
            });
        }
     const options = {
        maxAge: 20 * 60 *1000,
        httpOnly: true,
        secure: true
     }
    const token = user.generateJWTToken(); // generate session token for user
    res.cookie("token", token, options)   
     res.status(200).json({
        status: "Success", 
        message:"Logged in Successfully"    })
            }catch(err) {
        res.status(500).json({
            status: "Failed",
            code: 500,
            message: "Server Error" + err.message
        })
    }
}
);