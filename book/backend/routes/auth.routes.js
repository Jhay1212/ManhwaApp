import express from 'express';

const authRouter = express.Router();

authRouter.post('/auth/signup', async (req, res) => {
    res.send("register");
})

authRouter.post('/auth/login', (req, res) => {
    res.send("login");
})

export default authRouter;