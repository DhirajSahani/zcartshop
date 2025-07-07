import express from 'express';
import { login, isAuth, logout, register } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post('/register', register);
userRoute.post('/login', login);
userRoute.get('/is-auth', isAuth);
userRoute.get('/logout', logout);

export default userRoute;
