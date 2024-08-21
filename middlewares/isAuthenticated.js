import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error('Error in authentication:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token has expired",
                success: false,
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        } else {
            return res.status(500).json({
                message: "Internal server error",
                success: false,
            });
        }
    }
}

export default isAuthenticated;
