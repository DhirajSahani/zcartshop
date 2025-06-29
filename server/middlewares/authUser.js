import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Token missing." });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode?.id) {
      return res.status(401).json({ success: false, message: "Not Authorized. Invalid token." });
    }

    req.userId = tokenDecode.id; // ✅ Attach to req (NOT req.body)
    next(); // ✅ Move to controller
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token verification failed",
      error: error.message,
    });
  }
};

export default authUser;
