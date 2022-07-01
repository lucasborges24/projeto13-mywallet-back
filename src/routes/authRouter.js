import { Router } from 'express';

import { cadastroPost } from '../controllers/cadastro.js';
import { loginPost } from '../controllers/login.js';
import { cadastroValidationMiddleware } from '../middlewares/CadastroValidationMiddleware.js';
import { loginValidationMiddleware } from '../middlewares/loginValidationMiddleware.js';


const authRouter = Router();
authRouter.post('/cadastro', cadastroValidationMiddleware, cadastroPost)
authRouter.post('/login', loginValidationMiddleware, loginPost)
export default authRouter;