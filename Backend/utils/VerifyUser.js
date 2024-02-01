const   {errorHandler } = require ('./error')

const jwt = require('jsonwebtoken');

 const verifyToken = (req,res,next) => {
    const token = req.cookies;
    if(!token){
        next(errorHandler(401,'Unauthorized'))
        return;
    }
    jwt.verify(token.access_token,process.env.JWT_SECRET,(error,user)=>{
        if(error){
            next(errorHandler(401,'Unauthorized'));
        }
        req.user = user;
        next()
    })
}

module.exports ={
    verifyToken
}