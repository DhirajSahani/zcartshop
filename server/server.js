
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import UserRoutes from './routes/UserRoutes.js';


const app = express();
const port = process.env.PORT || 4000;

await connectDB()

// Allow Multiple Origins

const allowedOrigins = ['http://localhost:5173']

// middleware configuration

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, Credential:true}));

// Mount the user Routes
app.get('/', (req,res)=>res.send("API is Working"));
app.use('/api/user', UserRoutes); // ✅ This makes /api/user/register available

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

