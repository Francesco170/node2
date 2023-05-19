import { NextFunction } from "express"

const authorize=(req,res,NextFunction)=>{
    passport.authenticate("jwt",{session:false}, (err,user)=>{
        if(!user || err){
            res.status(401).json({msg:"unathorized"})
        }else{
            req.user = user;
            NextFunction();
        }
    })(req,res,NextFunction);
}


export {authorize}