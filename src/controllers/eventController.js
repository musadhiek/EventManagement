const {v4:uuidv4}=require('uuid');
const events = require('../models/eventModel')
const users = require('../models/userModel');
const {sendMail} = require('../utils/email')

function createEvent(req,res){
const { title, description, date,time } = req.body;
if (!title || !description|| !date ||!time ){
    return res.status(400).json({error:"All fields are required"})
}

const newEvent = {
    id:uuidv4(),
    title,
    description,
    date,
    time,
    organizerId: req.user.id,
    participants:[]
}
events.push(newEvent);
return res.status(201).json({message:"event crated",event:newEvent})
}





function getAllEvents(req,res){
    return res.json(events)
    
}
function getEventById(req,res){
    const event = events.find(e=>e.id=== req.params.id)
   

    if(!event){
        return res.status(404).json({error:"event not found"})
    }
    return res.json(event)
    
}

function updateEvent(req,res){
    const event = events.find(e=>e.id=== req.params.id)
   

    if(!event){
        return res.status(404).json({error:"event not found"})
    }
   if(event.organizerId!== req.user.id){
            return res.status(403).json({error:"you can only update your own events"})

   }
   const { title, description, date,time } = req.body;
    
    if (title)event.title=title;
    if (description)event.description=description;
    if (date)event.date=date;
    if (time)event.time=time;
    return res.json({message:'event updated',event})

    
}
    


function deleteEvent(req,res){
    const index = events.findIndex(e=>e.id=== req.params.id)

    if(index==-1){
        return res.status(404).json({error:"event not found"})
    }
    const event = events[index]
    if(event.organizerId!== req.user.id){
            return res.status(403).json({error:"you can only delete your own events"})

   }
   events.splice(index,1)

    res.json({message:'event deleted'})
}


// POST /events/:id/register
function registerForEvent(req, res) {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  // Check if user already registered
  if (event.participants.includes(req.user.userId)) {
    return res.status(400).json({ error: 'Already registered for this event' });
  }

  // Add user to participants
  event.participants.push(req.user.userId);

  sendMail(
  req.user.email,
  'Event Registration Confirmation',
  `Hi ${req.user.name},\n\nYou have successfully registered for "${event.title}" on ${event.date} at ${event.time}.\n\nThanks!`
).catch(err => console.error('Email error:', err));



  // Optionally fetch user for display
  const user = users.find(u => u.id === req.user.userId);

  return res.json({
    message: `User ${user?.name || req.user.userId} registered for event`,
    event
  });
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent   // 👈 add this
};

// module.exports = {createEvent,getAllEvent,getEventById,updateEvent,deleteEvent}