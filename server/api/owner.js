const router = require('express').Router()
const {User, Queue, Business, Reservation} = require('../db/models')
const {loginRequired} = require('../utils')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/activeQueue', loginRequired, (req, res, next) => {
  const date = new Date;
  try {
    res.sendStatus(200)
  } catch (err) {
    next (err)
  }
})

// returns all businesses associated with logged in user
// each business eager loads 1 queue (the one for the current day)
// the queue returns all associated reservations
router.get('/businesses', loginRequired, async (req, res, next) => {
  const today = new Date // creates new date object at current time
  today.setHours(0,0,0,0); // sets time of date object to beginning of the day
  console.log('userId: ', req.user.id)
  try {
    const userId = req.user.id;
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
