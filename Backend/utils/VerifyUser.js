import { errorHandler } from './error';

const jwt = require('jsonwebtoken');

export const verifyToken = (req,res,next) => {
    const token = req.cookie.access_token;
    if(!token){
        next(errorHandler(401,'Unauthorized'))
        return;
    }
    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error){
            next(errorHandler(401,'Unauthorized'));
        }
        req.user = user;
        next()
    })
}