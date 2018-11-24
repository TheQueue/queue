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

router.post('/add', async(req, res, next) =>{
  try{
    const {time, date} = req.body
    const newSlot = {time, date}
    const slot = await Slot.create(newSlot)
  res.json(slot)

  }catch(err) {
    next(err)
  }

})
module.exports = router
