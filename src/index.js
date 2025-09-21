require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const {authenticate, requireOrganizer}=require('./middlewares/authMiddleware')
app.use('/api',authRoutes)
app.use('/api',eventRoutes)

app.get('/',(req,res)=>{
    res.json({status:'ok',time: new Date().toISOString()});
});

app.get('/api/protected',authenticate,(req,res)=>{
    return res.json({message:'you accessed a protected route'})
})
app.get('/api/organizer-only',authenticate,requireOrganizer,(req,res)=>{
    return res.json({message:'welcome organizer'})
})



const PORT =  process.env.PORT|| 3000;
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
});