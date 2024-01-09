import User from "../models/User.js";
import jsonWebToken from "jsonwebtoken";

export const isAuthenticated = async(req, res, next)=>{
    try {
        const {token} = req.cookies;

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Please Login First"
            })
        }

        const decoded = await jsonWebToken.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id);

        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}