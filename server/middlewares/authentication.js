const authMiddleware = (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({error:"Middleware Error"})
    }
};

export default authMiddleware;