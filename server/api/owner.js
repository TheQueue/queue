const router = require('express').Router()
const {User, Queue, Business, Reservation} = require('../db/models')
const {loginRequired} = require('../utils')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/activeQueue', loginRequired, (req, res, next) => {
  const date = new Date()
  try {
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// returns all businesses associated with logged in user
// each business eager loads 1 queue (the one for the current day)
// the queue returns all associated reservations
router.get('/businesses', loginRequired, async (req, res, next) => {
  const today = new Date() // creates new date object at current time
  today.setHours(0, 0, 0, 0) // sets time of date object to beginning of the day
  console.log('userId: ', req.user.id)
  try {
    const userId = req.user.id
    // finds business by matching userId of business to id of logged in user
    // const response = await Business.findAndCountAll({where: {userId: userId}})
    // console.log('count: ', response.count)
    const businesses = await Business.findAll({
      where: {
        userId: userId
      },
      // eager load include associated queue
      include: [
        {
          model: Queue,
          where: {
            date: {
              // only if the date of the queue is >= the beginning of today
              [Op.gte]: today
            }
          },
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
// ex: GET /api/owner/reservations?queueId=5
router.get('/reservations', loginRequired, async (req, res, next) => {
  const queueId = req.query.queueId
  try {
    const queue = await Queue.findById(queueId) // look up queue
    const business = await queue.getBusiness() // look up business
    if (req.user.id !== business.userId) {
      res.sendStatus(403) // send 403 is user is unauthorized
    } else {
      // else return all reservations that have the matching queueId
      const reservations = await Reservation.findAll({
        where: {
          queueId: queueId
        }
      })
      res.json(reservations)
    }
  } catch (err) {
    console.error(err)
  }
})

// this route will affect a reservation and a queue
// user story: business owner approves a pending reservation
// increment queue position on queue by 1
// take new queue length and set it as queue Position on reservation
// change reservation status on that reservation to active
// set the estimated time of service
// ex: PUT request to api/owner/reservations/1?action=approve, with req.body of new status
router.put('/reservations/:reservationId', loginRequired, async (req, res, next) => {
  const reservationId = req.params.reservationId
  const action = req.query.action
  try {
    // check if user has authorization to edit
    const reservation = await Reservation.findById(reservationId)
    const queue = await reservation.getQueue()
    const business = await queue.getBusiness()

    if (req.user.id !== business.userId) {
      res.sendStatus(403) // send 403 is user is unauthorized
    } else if (action === 'approve') {
      const {waitTime} = req.body
      const nowPlusWaitTime = new Date();
      nowPlusWaitTime.setMinutes(nowPlusWaitTime.getMinutes() + waitTime)
      const newQueueLength = queue.queueLength + 1;
      await queue.update({
        queueLength: newQueueLength, // add 1 to queue length in queue
        timeAtWhichLastQueueGetsSeated: nowPlusWaitTime // set latest approved wait time on queue
        // might change this ^^ later
      })
      await reservation.update({
        status: 'Active',
        queuePosition: newQueueLength,
        estimatedTimeOfService: nowPlusWaitTime
      })
      const updatedQueue = await Queue.findById(queue.id, {
        include: [{
          model: Reservation,
          required: false
        }]
      })
      res.json(updatedQueue)
    } else if (action === 'serve') {
      // update specified reservation
      const servedQueuePos = reservation.queuePos
      await reservation.update({
        status: 'Serviced',
        queuePosition: null,
        estimatedTimeOfService: new Date() // stores time when they were served
      })

      // grab reservations behind the serviced one
      const reservations = await Reservation.findAll({
        where: {
          queueId: queue.id,
          queuePosition: {
            [Op.gt]: servedQueuePos
          }
        }
      });

      // decrement the queuePos for each one
      await Promise.all(reservations.map(reserv => {
        const queuePos = reserv.queuePos
        return reserv.update({
          queuePos: queuePos - 1
        })
      }))

      // update the queue
      const remainingReservations = await Reservation.count({
        where: {
          queueId: queue.id
        }
      })
      const newQueueLength = queue.queueLength - 1;
      if (newQueueLength) {
        await queue.update({
          queueLength: newQueueLength, // subtract 1 from queue length in queue
        })
      } else {
        await queue.update({
          queueLength: newQueueLength,
          estimatedTimeOfService: null
        })
      }

      // send queue with nested reservation
      const updatedQueue = await Queue.findById(queue.id, {
        include: [{
          model: Reservation,
          required: false
        }]
      })
      res.json(updatedQueue)
    } else {
      res.sendStatus(200)
    }
  } catch (err) {
    console.error(err)
  }
})
