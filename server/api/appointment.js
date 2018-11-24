const router = require('express').Router()
const {Appointment} = require('../db/models')


//fetch all appointments
router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll(
    {
      include: [
        {
          model: Queue,
          include: [{model: Business}]
        }
      ]
    }
    )

    res.json(categories)
  } catch (err) {
    next(err)
  }
})

module.exports = router
