import { Router } from 'express';
import { homeDelete, homeGet } from '../controllers/home.js';
import { tokenMiddleware } from '../middlewares/tokenMiddleware.js';

const homeRouter = Router();
homeRouter.get('/', tokenMiddleware, homeGet)
homeRouter.delete('/:id', homeDelete)
export default homeRouter;