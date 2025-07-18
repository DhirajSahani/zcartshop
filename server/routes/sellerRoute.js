import express from "express";
import {
  sellerLogin,
  isSellerAuth,
  sellerLogout
} from "../controllers/sellerController.js"; // ✅ adjust path if needed
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = express.Router();

// Define your routes
sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/is-auth",  authSeller,isSellerAuth);
sellerRouter.get("/logout",sellerLogout);

export default sellerRouter;
