import {db} from "./../db.js"
import jwt from"jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()
const logIn = async(req,res) =>{
 const{username,password} = req.body

 const user = await db.one(`SELECT * FROM users WHERE username=$1`, username)
 if (user && user.password === password){
    const payload={
        id: updateSourceFileNode,
        username,
    };
  const {SECRET} = precess.env;
  const token= jwt.sign(payload,SECRET);
  console.log(token);

    await db.none(`UPDATE users SET token=$2 WHERE id=$1`,[user.id,token])

    res.status(200).json({id: user.id, username ,token });

 }else{
   res.status(400).json({msg:"username or password incorrect"})
 }
}


const singUp= async (req,res)=>{
    const {username,password} = req.body
    const user =db.oneOrNone(`SELECT * FROM users WHERE usernme=$1`, username)
    if(user){
        req.status(409).json({msg:"username alredy in use"})
    }else{
       const {id}= await db.one(`INSERT INTO users (username,password) VALUES ($1,$2) RETURNING id`,[username,password]);
       res.status(201).json({mag:"user created sucesfully"});
    }
};

const logOut= async (req,res)=>{
const user = req.user;
await db.none(`UPDATE user SET token=$2 WHERE id=$1`,[user.id,null]);
res.status(200).json({msg:"the logout was succesfull"});
};




export{logIn,singUp,logOut};