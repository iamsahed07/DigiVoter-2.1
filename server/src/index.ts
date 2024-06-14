import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import "./db/dbConfig";
const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;
import authRouter from '#/routers/auth';
import elections from "#/routers/elections"
import candidatesRouter from "#/routers/candidates";
import voteRouter from '#/routers/vote'
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static('src/public'))
app.use("/auth", authRouter);
app.use("/elections", elections)
app.use("/candidates", candidatesRouter);
app.use("/vote", voteRouter);
app.listen(PORT,()=>{
    console.log('Server is listening on port '+PORT)
})
