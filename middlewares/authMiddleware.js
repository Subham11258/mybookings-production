const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    //get the token
    //verify the token
    //get the user out of the token
    //jwt token
    //Bearer token
    
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verification = jwt.verify(token,"mybookings");
        console.log(verification);
        req.body.userId = verification.userId;
        console.log('middleware working fine')
        next();
        
    }
    catch(err){
        
        res.status(404).send({success:false,message:'Invalid token'})
    }
}