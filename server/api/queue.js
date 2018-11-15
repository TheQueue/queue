const router = require('express').Router()
const {Queue, Reservation, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  // fetch queues by the associated businessId
  const now = new Date
  const businessId = req.query.businessId
  try {
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
