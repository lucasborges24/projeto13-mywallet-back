import { Router } from 'express';
import { homeDelete, homeGet } from '../controllers/home.js';

const homeRouter = Router();
homeRouter.get('/', homeGet)
homeRouter.delete('/:id', homeDelete)
export default homeRouter;