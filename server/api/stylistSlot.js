const router = require('express').Router()
const {Appointment, Stylist, Business, Slot, StylistSlot} = require('../db/models')

//fetch all stylistslot that is open
router.get('/:stylistId', async (req, res, next) => {
  try {
    const stylistId = req.params.stylistId

    const stylistSlot = await StylistSlot.findAll({
      where:{
          stylistId: stylistId,
          status:"Open"
      },include:[{
          model: Slot
      }],
      order:[[{model: Slot}, 'time', 'ASC']]
    })

    res.json(stylistSlot)
  } catch (err) {
    next(err)
  }
})


// router.post('/add', async (req, res, next) => {
//   try {
//     const {stylistId, slotId, note} = req.body
//     const userId = req.user.id
//     const newAppointment = {userId, stylistId, slotId, note}
//     const appointment = await Appointment.create(newAppointment)
//     const appointmentWithInclude = await Appointment.findAll({
//       where: {
//         id: appointment.id
//       },
//       include: [
//         {
//           model: Stylist,
//           required: false,
//           include: [
//             {
//               model: Business,
//               required: false
//             }
//           ]
//         },
//         {
//           model: Slot,
//           required: false
//         }
//       ]
//     })
//     res.json(appointmentWithInclude)
//   } catch (err) {
//     next(err)
//   }
// })

router.put('/', async (req, res, next) => {
  try {
    const {stylistId, status, slotId} = req.body
    const oldSS = await StylistSlot.findOne({where: {stylistId: stylistId,
    slotId: slotId}})
    if (!oldSS) {
      res.sendStatus(404)
    } else {
      const newSS = {status}
      const stylistSlot = await oldSS.update(newSS)
      res.json(stylistSlot)
    }
  } catch (err) {
    next(err)
  }
})
module.exports = router
