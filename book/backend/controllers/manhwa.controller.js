import AsyncHandler from "express-async-handler";
import Manhwa from "../models/manhwa.js"

const getAllManhwa = AsyncHandler(async(req, res) => {
    try{
        const manhwas = await Manhwa.find();
        res.send(200).json({message: "Fetch Succesfull"})
    }catch(err){
        res.send(500).json({message: err.message})
    }
})


const getManhwaByID = AsyncHandler(async(req, res) => {
    try{
        const {id} = req.id;
        if(!id) res.send(404).json({message: "Eror Manhwa ID Not Found!"})
        res.status(200).json({message: "Manhwa fetch successfully!"})
    }catch(err) {
        res.status(500).json({message: err})
    }
})

const createManhwa = AsyncHandler(async(req, res) => {
    'asdad'

})


const updateManhwa = AsyncHandler(async(req, res) => {
    const { id } = req.id;
    const {title, genre, description } = req.body;
    try {
        if(!id) res.status(404).json({message: "Manhwa not found!"})
        const manhwa = await Manhwa.findByIdAndUpdate(id)
        res.send(200).json({message: "Success"})
    }catch(err) {
        res.status(500).json({message: error})
    }
})

const deleteManhwa = AsyncHandler(async(req, res) => {
    const {id} = req.id;
    if(!id) res.status(404).json({message: "Manhwa ID not found!"})
    const manhwa = await Manhwa.findByIdAndDelete(id);
    res.status(200).json({message: "Manhwa deleted succesfully"})
})