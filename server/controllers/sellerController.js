import jwt from 'jsonwebtoken'

// seller login: /api/seller/login
import jwt from 'jsonwebtoken';

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Correct comparison: email with EMAIL, password with PASSWORD
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('sellerToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({ success: true, message: 'Logged in' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log('Seller login error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Seller is-Auth :- /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
  try {
    // You can add validation here if needed, e.g., checking req.user or req.seller from middleware
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("isSellerAuth error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// logout Seller: /api/seller/logout

export const sellerlogout =  async (req,res)=>{
try {
    res.clearCookie('sellerToken',{
        httpOnly: true,
        secure:process.env.NODE_ENV === 'prodcution',
        sameSite:process.env.NODE_ENV === 'prodcution' ? 'none' : 'strict',

    })
    return res.json({success:true,message:"Logout"})

} catch (error) {
     console.log(error.message);
     res.json({ success: false, message: error.message });
}
}