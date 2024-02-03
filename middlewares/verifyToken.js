const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token not provided" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired", expiredAt: error.expiredAt });
    }

    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  } 
};

const verifyAdmin = (req, res, next) => {
  const user = req.user;

  if (user && user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
};


module.exports = { verifyToken, verifyAdmin };
