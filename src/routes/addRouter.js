import { Router } from 'express';
import { entradaPost } from '../controllers/entrada.js';
import { saidaPost } from '../controllers/saida.js';
import { tokenMiddleware } from '../middlewares/tokenMiddleware.js';
import { valueValidationMiddleware } from '../middlewares/valueValidationMiddleware.js';


const addRouter = Router();
addRouter.post('/entrada', tokenMiddleware, valueValidationMiddleware, entradaPost)
addRouter.post('/saida', tokenMiddleware, valueValidationMiddleware, saidaPost)
export default addRouter;