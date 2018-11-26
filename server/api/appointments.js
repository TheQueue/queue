const router = require('express').Router()
const {Appointment} = require('../db/models')


//fetch all appointments
router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll()

    res.json(appointments)
  } catch (err) {
    next(err)
  }
})


router.get('/user', async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      where:{
        userId: req.user.id
      }
    })

    res.json(appointments)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try{
    const {stylistId, slotId, note} = req.body
    const userId = req.user.id
    const newAppointment = {userId, stylistId, slotId, note}
    const appointment = await Appointment.create(newAppointment)
    res.json(appointment)
    
  }
  catch(err){
    next(err)
  }
})


module.exports = router
