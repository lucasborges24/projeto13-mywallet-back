import { Router } from 'express';

import { editarPut } from '../controllers/editar.js';
import { tokenMiddleware } from '../middlewares/tokenMiddleware.js';
import { itemIdMiddleware } from '../middlewares/itemIdMiddleware.js';
import { valueValidationMiddleware } from '../middlewares/valueValidationMiddleware.js';


const editRouter = Router();
editRouter.put('/editar/:itemId', tokenMiddleware, itemIdMiddleware, valueValidationMiddleware, editarPut)
export default editRouter;