import mongoose from "mongoose";
import bcrypt from bcrypt;
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: string,
            required: true,
            validate: {
            validator: v => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(v);
            },
            message: props => "Not a valid email"
             }
        },

        profile: {
            type: String,
            default: ""
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            select: false
        },
        timestamps: true
    }
)

UserSchema.pre("save", async function(next) {
    // Modify the user data hashing the password bfore saving it into database
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch(err) {
        next(err);
    }
})

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
