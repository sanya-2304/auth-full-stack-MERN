

const jwt=require('jsonwebtoken')

const auth=(req, res, next)=>{
    const token=req.headers['authorization'];
    
    if(!token){
        return res.status(401).json({message:"Unauthorized, jwt token is required.", success:false});
    }
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({ message: "Invalid token.", success: false });
    }
}
module.exports = auth;