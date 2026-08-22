import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized request: No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
        
        req.user = decodedToken; // Attaches {_id: userId} to the request object
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
};