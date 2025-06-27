import express from 'express'
import { register } from '../controllers/UserController.js';


const UserRoutes = express.Router();

UserRoutes.post('/register', register)




export default UserRoutes