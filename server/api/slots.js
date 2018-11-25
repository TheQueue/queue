const router = require('express').Router()
const {Slot} = require('../db/models')
const {loginRequired} = require('../utils')

router.get('/', loginRequired, async (req, res, next) => {
  try {
    const slots = await Slot.findAll()

    res.json(slots)
  } catch (err) {
    next(err)
  }
})

router.post('/add', loginRequired, async(req, res, next) =>{
  try{
    const {time, date} = req.body
    const newSlot = {time, date}
    const slot = await Slot.create(newSlot)
  res.json(slot)

  }catch(err) {
    next(err)
  }
})


//use this api route for owner to update stylists
router.put('/addStylist', loginRequired, async(req, res, next) =>{
  const {slotId, stylistId} = req.body
  try {
    const oldSlot = await Slot.findById(slotId);
    if (oldSlot === null) {
      res.sendStatus(404);
      return
    } else {
      const slotInfo = {stylistId}
      const updateSlot = await oldSlot.update(slotInfo)
      res.json(updateSlot)
    }
  } catch (err) {
    console.error(err)
  }
})
module.exports = router
