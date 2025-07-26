import jwt from "jsonwebtoken";

/**
 * authMiddleware
 * Checks for a valid JWT token in the Authorization header.
 * Adds decoded user info to req.user if valid.
 */
export const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header: "Bearer <token>"
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // extract token

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      // Attach user info (id, role, etc.) to the request
      req.user = decoded; 
      // decoded will have whatever you signed in loginUser, e.g. { id, role }
      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ message: "Server error in authentication" });
  }
};
