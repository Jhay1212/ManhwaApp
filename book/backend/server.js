import express from 'express';
import "dotenv/config";


import authRouter from './routes/auth.routes.js';

import { connectDb } from './utils/connect.js';


const app = express();
const PORT = process.env.PORT;

app.use("/api/", authRouter);
app.listen(PORT, () => {
    connectDb();
    console.log("Server runnint at port: 3000");
})