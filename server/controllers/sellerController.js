
import jwt from 'jsonwebtoken';

// ✅ login Seller : /api/seller/login
import jwt from "jsonwebtoken";

export const sellerLogin = (req, res) => {
  const { email, password } = req.body;

  // Check if credentials are present
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  // Match with environment (or DB)
  if (
    email === process.env.SELLER_EMAIL &&
    password === process.env.SELLER_PASSWORD
  ) {
    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set cookie
    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: false, // set to true in production (https)
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid seller credentials" });
  }
};



// Seller isAuth : /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message:error.message });
  }
};


 
// logout Seller: /api/seller/logout

export const sellerLogout =  async (req,res)=>{
try {
    res.clearCookie('sellerToken',{
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',

    })
    return res.json({success:true, message:"Logged out"})

} catch (error) {
     console.log(error.message);
     res.json({ success: false, message: error.message });
}
}