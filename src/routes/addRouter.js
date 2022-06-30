import { Router } from 'express';
import { entradaPost } from '../controllers/entrada.js';
import { saidaPost } from '../controllers/saida.js';

const addRouter = Router();
addRouter.post('/entrada', entradaPost)
addRouter.post('/saida', saidaPost)
export default addRouter;