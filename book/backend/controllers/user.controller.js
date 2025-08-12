import { User } from "../models/users";
import AsyncHandler from "express-async-handler";


const users = AsyncHandler(async(req, res) => {
    try {
        const users = await User.find();
    } catch(err) {
        console.log("Error on fetching users" + err);
        res.send(500).json({message: err.message});
    }
})

const userId = AsyncHandler(async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) res.status(400).json({message: "User ID not found"})
    } catch(err) {
        console.log("Error on fetching user by id ");
        res.send(500).json({message: err.message});

    }
})

const updateUser = AsyncHandler(async(req, res) => {
    try {
        const {username, email, profile } = req.body;
        const user = await User.findById(req.params.id,
            {username, email},
            {new: true, runValidators: true}
        );
        if(!user) res.status(400).json({message: "User not found"});
        res.status(200).json({message: "User updated succesfully"})
            
    } catch(err) {
        console.log("Error on updating users" );
        res.send(500).json({message: err.message});
    }
})

