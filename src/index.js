import express from "express";
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import joi from 'joi';
import dotenv from 'dotenv';
import dayjs from "dayjs";
import chalk from 'chalk';

import { loginGet } from './controllers/login.js'
import { cadastroPost } from './controllers/cadastro.js'

dotenv.config();
const app = express();
app.use(cors());
console.log('CORS worked')
app.use(express.json());
console.log('JSON worked')

// cadastro
app.post('/cadastro', cadastroPost)

// login
app.get('/login', loginGet)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(chalk.cyanBright(`Server running on ${process.env.MONGO_URI}`))
})