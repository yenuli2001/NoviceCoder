import jwt, { decode } from 'jsonwebtoken';
import UserModel from "../models/UserModel.js"
// Is user login 

export const isAuthenticated = async (req, res, next) => {
    try {
        // Get token
        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({
                error: "Please Login to your account"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await UserModel.findById(decoded._id);

        next();

    } catch (error) {
        console.log(error)
    }
}


export const authorizeAdmin = (req, res, next) => {
    try {
      if(req.user.role !== "admin"){
        return res.json({
            error: `${req.user.role} is not allowed to access this resource`
        })
      }
      next();

    } catch (error) {
        console.log(error)
    }
}




