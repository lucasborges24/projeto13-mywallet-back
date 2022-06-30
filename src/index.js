import express from "express";
import cors from 'cors';
import joi from 'joi';
import dotenv from 'dotenv';
import dayjs from "dayjs";
import chalk from 'chalk';

import addRouter from './routes/addRouter.js'
import authRouter from './routes/authRouter.js'
import editRouter from './routes/editRouter.js'
import homeRouter from './routes/homeRouter.js'


dotenv.config();
const app = express();
app.use(cors());
console.log('CORS worked')
app.use(express.json());
console.log('JSON worked')

app.use(authRouter)
app.use(addRouter)
app.use(editRouter)
app.use(homeRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(chalk.cyanBright(`Server running on ${process.env.MONGO_URI}`))
})