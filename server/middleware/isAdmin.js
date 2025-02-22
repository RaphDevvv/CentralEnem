import jwt from "jsonwebtoken";
import userModel from '../models/user.model.js'

export const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token || req?.headers?.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied" });

        const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
        req.userId = decoded.id;

        const user = await userModel.findById(req.userId, { role: 1 });
        if (!user || user.role !== "ADMIN") {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Invalid or expired token", error: true });
    }
};
