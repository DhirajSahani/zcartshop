
import express from 'express'
import authUser from '../middlewares/authUser';
import { addAddress, getaddress } from '../controllers/addressController';

const addressRouter = express.Router();

addressRouter.post('/add',authUser, addAddress);
addressRouter.post('/get',authUser, getaddress);

export default addressRouter;