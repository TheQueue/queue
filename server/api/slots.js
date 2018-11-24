const router = require('express').Router()
const {Slot} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const slots = await Slot.findAll()

    res.json(slots)
  } catch (err) {
    next(err)
  }
})

module.exports = router
