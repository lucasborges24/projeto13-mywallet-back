import express from "express";
import cors from 'cors';
import joi from 'joi';
import dotenv from 'dotenv';
import dayjs from "dayjs";
import chalk from 'chalk';

import { loginPost } from './controllers/login.js'
import { cadastroPost } from './controllers/cadastro.js'
import { homeGet, homeDelete } from './controllers/home.js'
import { entradaPost } from './controllers/entrada.js'
import { saidaPost } from './controllers/saida.js'
import { editarPut } from './controllers/editar.js'


dotenv.config();
const app = express();
app.use(cors());
console.log('CORS worked')
app.use(express.json());
console.log('JSON worked')

// cadastro
app.post('/cadastro', cadastroPost)

// login
app.post('/login', loginPost)

// home
app.get('/', homeGet)
app.delete('/:id', homeDelete)

// entrada
app.post('/entrada', entradaPost)

// saida
app.post('/saida', saidaPost)

// editar 
app.put('/editar/:url', editarPut)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(chalk.cyanBright(`Server running on ${process.env.MONGO_URI}`))
})