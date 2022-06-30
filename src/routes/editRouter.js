import { Router } from 'express';
import { editarPut } from '../controllers/editar.js';

const editRouter = Router();
editRouter.put('/editar/:url', editarPut)
export default editRouter;