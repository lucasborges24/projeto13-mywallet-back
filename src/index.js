import express from "express";
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import joi from 'joi';
import dotenv from 'dotenv';
import dayjs from "dayjs";
import chalk from 'chalk';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI)
let db;
client.connect().then(() => {
    db = client.db(process.env.MONGO_DATABASE_NAME)
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(chalk.cyanBright(`Server running on ${process.env.MONGO_URI}`))
})