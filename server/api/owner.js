const router = require('express').Router()
const {User, Stylist, Business, Appointment, Slot} = require('../db/models')
const {loginRequired} = require('../utils')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

// returns all businesses associated with logged in user
router.get('/businesses', loginRequired, async (req, res, next) => {
  try {
    const userId = req.user.id
    const businesses = await Business.findAll({
      where: {
        userId: userId
      },
      include: [
        {
          model: Stylist,
          required: false,
          include: [
            {
              model: Appointment,
              required: false,
              include: [
                {
                  model: Slot,
                  required: false
                },
                {
                  model: User,
                  required: false
                }
              ]
            }
          ]
        }
      ]
    })
    res.json(businesses)
  } catch (err) {
    next(err)
  }
})

// view reservations for a specific queue
// ex: GET /api/owner/reservations?stylistId=5
// router.get('/appointments', loginRequired, async (req, res, next) => {
//   const stylistId = req.query.stylistId
//   try {
//     const stylist = await Stylist.findById(stylistId) // look up queue
//     const business = await stylist.getBusiness() // look up business
//     if (req.user.id !== business.userId) {
//       res.sendStatus(403) // send 403 is user is unauthorized
//     } else {
//       // else return all reservations that have the matching queueId
//       const reservations = await Reservation.findAll({
//         where: {
//           stylistId: stylistId
//         }
//       })
//       res.json(reservations)
//     }
//   } catch (err) {
//     console.error(err)
//   }
// })

router.put(
  '/appointments/:appointmentId',
  loginRequired,
  async (req, res, next) => {
    const appointmentId = req.params.appointmentId
    const action = req.query.action
    try {
      // check if user has authorization to edit
      const appointment = await Appointment.findOne({
        where: {
          id: appointmentId
        }
      })
      const stylist = await appointment.getStylist()
      const business = await stylist.getBusiness()
      if (req.user.id !== business.userId) {
        res.sendStatus(403) // send 403 is user is unauthorized
      } else {
        switch (action) {
          case 'cancel':
            await appointment.update({
              status: 'Cancelled'
            })
            res.json(appointment)
            return
          case 'service':
            await appointment.update({
              status: 'Serviced'
            })
            res.json(appointment)
            return
          default:
            res.sendStatus(500)
            return
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
)

router.post('/stylists', loginRequired, async (req, res, next) => {
  try {
    const {name, phoneNumber, email, imageUrl, businessId} = req.body
    const business = await Business.findByPk(businessId)
    if (!business) {
      res.sendStatus(404)
      return
    }
    const user = await Business.getUser()
    if (!user) {
      res.sendStatus(404)
      return
    }
    if (user.id !== req.user.id) {
      res.sendStatus(403)
      return
    }
    const newStylist = {name, phoneNumber, email, imageUrl, businessId}
    const stylist = await Stylist.create(newStylist)
    const stylistAndReservs = await Stylist.findById(stylist.id, {
      include: [
        {
          model: Appointment,
          required: false
        }
      ]
    })
    res.json(stylistAndReservs)
  } catch (err) {
    console.error(err)
  }
})

router.put('/stylists/:stylistId', async (req, res, next) => {
  const stylistId = req.params.stylistId
  try {
    const oldStylist = await Stylist.findById(stylistId)
    if (oldStylist === null) {
      res.sendStatus(404)
      return
    }
    const business = await oldStylist.getBusiness()
    if (business === null) {
      res.sendStatus(500)
    } else if (business.userId !== req.user.id) {
      res.sendStatus(403)
    } else {
      const {name, phoneNumber, email, imageUrl} = req.body
      const stylistInfo = {name, phoneNumber, email}
      if (imageUrl) stylistInfo.imageUrl = imageUrl
      const updatedStylist = await oldStylist.update(stylistInfo)
      const stylistAndAppointments = await Stylist.findById(stylistId, {
        include: [
          {
            model: Appointment,
            required: false,
            include: [
              {
                model: scrollTo,
                required: false
              }
            ]
          }
        ]
      })
      res.json(stylistAndAppointments)
    }
  } catch (err) {
    console.error(err)
  }
})

router.delete('/stylists/:stylistId', async (req, res, next) => {
  const stylistId = req.params.stylistId
  try {
    const oldStylist = await Stylist.findById(stylistId)
    if (oldStylist === null) {
      res.sendStatus(404)
      return
    }
    const business = await oldStylist.getBusiness()
    if (business === null) {
      res.sendStatus(500)
    } else if (business.userId !== req.user.id) {
      res.sendStatus(403)
    } else {
      await oldStylist.destroy()
      res.sendStatus(200)
    }
  } catch (err) {
    console.error(err)
  }
})

router.post('/slots', loginRequired, async (req, res, next) => {
  const {date, time, stylistId} = req.body
  try {
    const stylist = await Stylist.findById(stylistId)
    if (!stylist) {
      res.sendStatus(404)
      return
    }
    const business = await stylist.getBusiness()
    if (!business) {
      res.sendStatus(500)
      return
    } else if (business.userId !== req.user.id) {
      res.sendStatus(403)
      return
    }

    const slotData = {date, time, stylistId}
    const slot = await Slot.create(slotData)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
})
