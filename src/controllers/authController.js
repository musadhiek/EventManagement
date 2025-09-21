const bcrypt = require('bcryptjs');
const {v4:uuidv4}=require('uuid');

const users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const router = require('../routes/authRoutes');



async function register(req,res) {
    try{
        const {name, email, password, role}=req.body;

        if (!name||!email||!password||!role){
            return res.status(400).json({error:'All fields are required'});
        }

        const existingUser = users.find(u=> u.email===email)
        if (existingUser){
            return res.status(400).json({error:'Email already registered'});
        }
        const passwordHash = await bcrypt.hash(password,10)

        const newUser ={
            id:uuidv4(),
            name,
            email,
            passwordHash,
            role
        };
        users.push(newUser);
        return res.status(201).json({message:'User registered successfully',userId:newUser.id})

    }catch(err){
        console.log(err);
       return res.status(500).json({error:'something went wrong'})
    }
    
};

async function login(req,res) {

    try{
        const {email, password}=req.body;

        if (!email||!password){
            return res.status(400).json({error:"Email and passsword are requried"})
        }
        const user = users.find(u=>u.email===email)
        if(!user){
            return res.status(400).json({error:"invalid credetntials"})

        }
        const isMatch = await bcrypt.compare(password,user.passwordHash)

        if (!isMatch){
            return res.status(400).json({error:"invalid credetntials"})

        }
        const token = jwt.sign(
            {userId: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        return res.json({message:"login succesful",token})

        

    }catch(err){
        return res.status(500).json({error:'something went wrong'})
    }
    
}


module.exports = {register,login};
