'use strict'
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const yelp = require('yelp-fusion')
const twilio = require('twilio')
//const Stylist= require('../db/models')
const client = yelp.client(process.env.YELP_KEY)
//const Service= require('')
const accountSid = process.env.SID
const authToken = process.env.APKEY
const clientT = new twilio(accountSid, authToken)
const router = require('express').Router()
const {
  Business,
  Stylist,
  Category,
  Service,
  Slot,
  StylistSlot,
  Appointment
} = require('../db/models')
const axios = require('axios')

// E.G. api/business?category=Barbershop
router.get('/', async (req, res, next) => {
  try {
    if (req.query.category) {
      const category = await Category.findOne({
        where: {
          categoryType: req.query.category
        }
      })
      // retrieves business with that category
      const businesses = await category.getBusiness()
      res.json(businesses)
    } else {
      const businesses = await Business.findAll()
      res.json(businesses)
    }
  } catch (err) {
    console.error(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const today = new Date() // creates new date object at current time
  today.setHours(0, 0, 0, 0) // sets time of date object to beginning of the day
  try {
    let closed = true
    const business = await Business.findById(req.params.id, {
      include: [
        {
          model: Stylist,
          required: false,
          include: [
            {
              model: Slot,
              required: false
            }
          ]
        }
      ]
    })
    if (!business) {
      res.sendStatus(404)
    } else {
      client
        .search({
          term: business.name,
          location: 'chicago'
        })
        .then(response => {
          closed = response.jsonBody.businesses[0].is_closed
          const {price, image_url} = response.jsonBody.businesses[0]
          res.send({business, closed, price, image_url})
        })
        .catch(e => {
          console.log(e)
        })
    }
  } catch (err) {
    console.log(err)
  }
})

router.get('/search/:keyword', async (req, res, next) => {
  try {
    const keyword = req.params.keyword
    const businesses = await Business.findAll({
      where: {
        name: {
          [Op.iLike]: `%${keyword}%`
        }
      }
    })
    res.json(businesses)
  } catch (err) {
    next(err)
  }
})

let slotId = 0
let bId = 0
let stySlotId = 0
let stylistId = 0
let businessT
let stylistT
let availSlot = []
//messages Twilio
router.post('/inbound', async (req, res, next) => {
  try {
    if (req.body.Body.toLowerCase() === 'rsvp') {
      clientT.messages
        .create({
          body: `Hello,thanks for you Trust. Respond with the salon name (ex: Sparrow)`,
          to: req.body.From,
          from: '+13312446019'
        })
        .then(() => {})
    } else {
      businessT = await Business.findOne({
        where: {
          name: {
            [Op.iLike]: `%${req.body.Body}%`
          }
        }
      })
      console.log('business in twilio ', businessT)
      if (businessT) {
        bId = businessT.id
        clientT.messages
          .create({
            body: `Respond with your favorite stylist (ex: Bobby Barber)`,
            to: req.body.From,
            from: '+13312446019'
          })
          .then(() => {})
      } else {
        stylistT = await Stylist.findOne({
          where: {
            name: {
              [Op.iLike]: `%${req.body.Body}%`
            }
          }
        })
        console.log('stylist in twilio ', stylistT)
        if (stylistT) {
          stylistId = stylistT.id
          availSlot = await StylistSlot.findAll({
            where: {
              stylistId: stylistT.id,
              status: 'Open'
            },
            include: [
              {
                model: Slot
              }
            ],
            order: [[{model: Slot}, 'time', 'ASC']]
          })
          stySlotId = availSlot.id
          slotId = availSlot.slotId
          const times = availSlot.map(
            obj => `${obj.slot.time} ${obj.slot.date}`
          )

          clientT.messages
            .create({
              body: `${stylistT.name} is available on: ${times.join(
                '\n'
              )}\n respond with a day and time (ex: mm/dd/yyyy hh:mm AM)`,
              to: req.body.From,
              from: '+13312446019'
            })
            .then(() => {})
        } else {
          if (
            req.body.Body.match(
              /(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}/
            )
          ) {
            clientT.messages
              .create({
                body: `All set you're schedule at ${req.body.Body}`,
                to: req.body.From,
                from: '+13312446019'
              })
              .then(() => {})
            //get Dat month year
            const reqArr = req.body.Body.split(' ')
            const dayTimeY = reqArr[0].split('/')
            let day = Number(dayTimeY[1]) + 1
            if (day < 10) {
              day = `0${day}`
            }
            const mth = dayTimeY[0]
            const yr = dayTimeY[2]

            const timeChoose = availSlot.filter(obj => {
              console.log('Date ', obj.slot.date)
              console.log(obj.slot.date.toISOString().slice(0, 10))
              console.log(yr + '-' + mth + '-' + day)
              return (
                obj.stylistId === stylistId &&
                obj.slot.time === reqArr[1] &&
                obj.slot.date.toISOString().slice(0, 10) ===
                  yr + '-' + mth + '-' + day
              )
            })[0]

            console.log('Time Id ', timeChoose.slotId)

            //Need appointements table to store information
            //update StylistSlot to booked
            const update = await StylistSlot.update(
              {status: 'Booked'},
              {
                where: {
                  slotId: timeChoose.slotId,
                  stylistId: timeChoose.stylistId
                }
              }
            )

            //create app
            await Appointment.create({
              slotId: timeChoose.slotId,
              stylistId: timeChoose.stylistId,
              note: req.body.From
            })
          }
        }
      }
    }

    console.log(slotId, bId, stySlotId, stylistId)
    res.send('')
  } catch (err) {
    next(err)
  }
})

router.post('/chatbot', async (req, res, next) => {
  try {
    //contains, includes, match
    if (
      req.body.data.toLowerCase().includes('price') ||
      req.body.data.toLowerCase().includes('how much')
    ) {
      const arrayMes = req.body.data.split(' ')
      for (let i = 0; i < arrayMes.length; i++) {
        const service = await Service.findOne({
          where: {
            businessId: req.body.id,
            name: {
              [Op.iLike]: `%${arrayMes[i]}%`
            }
          }
        })
        if (service) {
          res.send(`$$${service.price}`)
          return
        }
      }
    } else if (
      req.body.data.toLowerCase().includes('how long') ||
      req.body.data.toLowerCase().includes('duration')
    ) {
      const arrayMes = req.body.data.split(' ')
      for (let i = 0; i < arrayMes.length; i++) {
        const service = await Service.findOne({
          where: {
            businessId: req.body.id,
            name: {
              [Op.iLike]: `%${arrayMes[i]}%`
            }
          }
        })
        console.log('Duration', service)
        if (service) {
          res.send(`${service.duration}mn`)
          return
        }
      }
    } else {
      const business = await Business.findById(req.body.id)

      res.send(
        `Please contact us at ${business.phoneNumber} for more informations `
      )
    }
    console.log('yep!')

    //res.send('')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
