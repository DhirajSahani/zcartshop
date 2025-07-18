import express from 'express';
import { login, isAuth, logout, register } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', isAuth);
userRouter.get('/logout', logout);

export default userRouter;
