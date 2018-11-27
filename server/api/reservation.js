const router = require('express').Router()
const {User, Queue, Business, Reservation} = require('../db/models')
const {loginRequired} = require('../utils')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

//this get is to show USER current reservation that is active/pending
router.get('/current', loginRequired, async (req, res, next) => {
  const userId = req.user.id
  try {
    const reservation = await Reservation.findAll({
      where: {
        userId: userId,
        status: {
          [Op.or]: ['Active', 'Pending']
        }
      },
      include: [
        {
          model: Queue,
          include: [{model: Business}]
        }
      ]
    })
    res.json(reservation)
  } catch (err) {
    next(err)
  }
})

//this is for business onwer to check for specific reservation
router.get('/:reservationId', loginRequired, async (req, res, next) => {
  try {
    const queue = req.query.queueId
    const business = Queue.getBusiness()


    if (req.user.id === business.userId) {
      const findOneReservation = await Reservation.findById(
        req.params.reservationId
      )
      res.json(findOneReservation)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})
//this get is to pull all the reservation for certain queue
router.get('/:queueId', loginRequired, async (req, res, next) => {
  try {
    const business = Queue.getBusiness()
    if (req.user.id === business.userId) {
      const allQueueReservation = await Reservation.findAll({
        where: {
          queueId: req.params.queueId
        }
      })
      res.json(allQueueReservation)
    }
  } catch (err) {
    next(err)
  }
})

//does not need to login (just to create reservation. the prefill informtaion can be set at front end as input defult value)
router.post('/', loginRequired, async (req, res, next) => {
  const {name, partySize, phoneNumber, note, email, queueId} = req.body
  const newReservation = {name, partySize, phoneNumber, note, email, queueId}
  try {
    const reservation = await Reservation.create(newReservation)
    res.json(reservation)
  } catch (err) {
    next(err)
  }
})

//this put is to update info by user itself
router.put('/:reservationId', loginRequired, async (req, res, next) => {
  const {name, partySize, phoneNumber, note, email} = req.body
  const newReservation = {name, partySize, phoneNumber, note, email}
  try {
    const reservation = await Reservation.findById(req.params.reservationId)
    if (req.user.id === reservation.userId) {
      const updateReservation = await Reservation.update(newReservation)
      res.json(updateReservation)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:reservationId', loginRequired, async (req, res, next) => {
  try {
    // REVIEW: should confirm the reservation id matches the user id
    await Reservation.destroy({
      where: {
        id: req.params.reservationId
      }
    })
  } catch (err) {
    next(err)
  }
})
