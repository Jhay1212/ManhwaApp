import { Schema } from "mongoose";
import mongoose from "mongoose";

const ManhwaSchema = new Schema({
    title: {
        type: String,
        required: true,
        
    },
    genre: {
        type: String,
        

    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: String,
        default: "",

    },
    rating: {
        type: Number,
        default: 0,


    },
    user: mongoose.Schema.ObjectId
}, {
    timestamps: true
})

const Manhwa = mongoose.model("Manhwa", ManhwaSchema);
export default Manhwa