import { Router } from 'express';
import { cadastroPost } from '../controllers/cadastro.js';
import { loginPost } from '../controllers/login.js';

const authRouter = Router();
authRouter.post('/cadastro', cadastroPost)
authRouter.post('/login', loginPost)
export default authRouter;