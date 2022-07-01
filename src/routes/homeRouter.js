import { Router } from 'express';
import { homeDelete, homeGet } from '../controllers/home.js';
import { tokenMiddleware } from '../middlewares/tokenMiddleware.js';
import { itemIdMiddleware } from '../middlewares/itemIdMiddleware.js';

const homeRouter = Router();
homeRouter.get('/', tokenMiddleware, homeGet)
homeRouter.delete('/:itemId', tokenMiddleware, itemIdMiddleware, homeDelete)
export default homeRouter;