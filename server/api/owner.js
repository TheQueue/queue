const router = require('express').Router()
const {User, Stylist, Business, Reservation} = require('../db/models')
const {loginRequired} = require('../utils')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

// returns all businesses associated with logged in user
// each business eager loads 1 queue (the one for the current day)
// the queue returns all associated reservations
router.get('/businesses', loginRequired, async (req, res, next) => {
  console.log('userId: ', req.user.id)
  try {
    const userId = req.user.id
    const businesses = await Business.findAll({
      where: {
        userId: userId
      },
      include: [
        {
          model: Stylist,
          required: false, // necessary if we want to return businesses without queues
          include: [
            {
              model: Reservation,
              required: false // necessary if we want to return queues without reservations
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
router.get('/reservations', loginRequired, async (req, res, next) => {
  const stylistId = req.query.stylistId
  try {
    const stylist = await Stylist.findById(stylistId) // look up queue
    const business = await stylist.getBusiness() // look up business
    if (req.user.id !== business.userId) {
      res.sendStatus(403) // send 403 is user is unauthorized
    } else {
      // else return all reservations that have the matching queueId
      const reservations = await Reservation.findAll({
        where: {
          stylistId: stylistId
        }
      })
      res.json(reservations)
    }
  } catch (err) {
    console.error(err)
  }
})

router.put('/reservations/:reservationId', loginRequired, async (req, res, next) => {
  const reservationId = req.params.reservationId
  const action = req.query.action
  try {
    // check if user has authorization to edit
    const reservation = await Reservation.findById(reservationId)
    // const stylist = await reservation.getStylist()
    const business = await reservation.getBusiness()
    if (req.user.id !== business.userId) {
      res.sendStatus(403) // send 403 is user is unauthorized
    } else if (action === 'cancel') {
      // update specified reservation
      await reservation.update({
        status: 'Cancelled',
      })
      res.json(reservation)
    } else {
      res.sendStatus(500)
    }
  } catch (err) {
    console.error(err)
  }
})
