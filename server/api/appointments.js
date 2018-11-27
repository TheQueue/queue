const router = require('express').Router()
const {Appointment, Stylist, Business, Slot} = require('../db/models')

//fetch all appointments
router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Stylist,
          required: false,
          include: [
            {
              model: Business,
              required: false
            }
          ]
        },
        {
          model: Slot,
          required: false
        }
      ]
    })

    res.json(appointments)
  } catch (err) {
    next(err)
  }
})

router.get('/user', async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        userId: req.user.id,
        status: 'Active'
      },
      include: [
        {
          model: Stylist,
          required: false,
          include: [
            {
              model: Business,
              required: false
            }
          ]
        },
        {
          model: Slot,
          required: false
        }
      ]
    })

    res.json(appointments)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const {stylistId, slotId, note} = req.body
    const userId = req.user.id
    const newAppointment = {userId, stylistId, slotId, note}
    const appointment = await Appointment.create(newAppointment)
    const appointmentWithInclude = await Appointment.findAll({
      where: {
        id: appointment.id
      },
      include: [
        {
          model: Stylist,
          required: false,
          include: [
            {
              model: Business,
              required: false
            }
          ]
        },
        {
          model: Slot,
          required: false
        }
      ]
    })
    res.json(appointmentWithInclude)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const {status, id} = req.body
    const oldAppointment = await Appointment.findOne({where: {id: id}})
    if (!oldAppointment) {
      res.sendStatus(404)
    } else {
      const newAppointment = {status}
      const appointment = await oldAppointment.update(newAppointment)
      res.json(appointment)
    }
  } catch (err) {
    next(err)
  }
})
module.exports = router
