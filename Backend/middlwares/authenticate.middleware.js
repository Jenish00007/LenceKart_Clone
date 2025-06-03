const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret_key";
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded) {
        const userID = decoded.userID;
        console.log(decoded);
        req.body.userID = userID;
        next();
      } else {
        res.status(401).json({ message: "Please Login" });
      }
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Please Login" });
  }
};

module.exports = { authenticate };
