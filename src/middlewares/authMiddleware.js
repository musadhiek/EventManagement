const jwt = require('jsonwebtoken');


function authenticate(req,res,next){
    const authHeader = req.headers['authorization'];

    if (!authHeader){
        return res.status(401).json({message:'Authorisation header is missing'})
    }
    const token = authHeader.split(' ')[1];
    if (!token){
        return res.status(401).json({message:'Token is missing'})

    }
try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next()
}catch(err){
    return res.status(401).json({message:'Invalid or expired token'})
}
}

function requireOrganizer(req,res, next){
    if (req.user.role !=='organizer'){
            return res.status(403).json({message:'Organizer role required'})

    }
    next()
}

module.exports = {authenticate,requireOrganizer}