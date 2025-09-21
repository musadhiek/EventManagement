const express = require('express');
const router = express.Router();
const {authenticate, requireOrganizer}=require('../middlewares/authMiddleware')

const {createEvent,getAllEvents,getEventById,updateEvent,deleteEvent,registerForEvent}= require('../controllers/eventController')


router.get('/events',getAllEvents)
router.get('/events/:id',getEventById)
router.post('/events',authenticate,requireOrganizer,createEvent)
router.patch('/events/:id',authenticate,requireOrganizer,updateEvent)
router.delete('/events/:id',authenticate,requireOrganizer,deleteEvent)
router.post('/events/:id/register', authenticate, registerForEvent);


module.exports = router;