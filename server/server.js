
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/ordersRoute.js';
import userRoute from './routes/userRoute.js';


const app = express();
const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

// Allow Multiple Origins

const allowedOrigins = ['http://localhost:5173']

// middleware configuration

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  // ✅ Allow frontend origin
  credentials: true                 // ✅ Allow cookies/credentials
}));

// app.use(cors({origin: allowedOrigins, Credential:true}));

// Mount the user Routes
app.get('/', (req,res)=>res.send("API is Working"));
app.use('/api/user',userRoute ); // ✅ This makes /api/user/register available
app.use('/api/seller', sellerRouter);
app.use('/api/product',productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

