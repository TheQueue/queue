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
const {Business, Stylist, Category, Service} = require('../db/models')

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
    const business = await Business.findById(req.params.id)
    if (!business) {
      res.sendStatus(404)
    } else {
      client
        .search({
          term: business.name,
          location: 'chicago'
        })
        .then(response => {
          console.log(response.jsonBody.businesses)
          closed = response.jsonBody.businesses[0].is_closed
          res.send({business, closed})
          //console.log(business)
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

//messages Twilio
router.post('/inbound', async (req, res, next) => {
  try {
    let stylistExist = false
    let stylistName = ''
    if (req.body.Body.toLowerCase() === 'rsvp') {
      clientT.messages
        .create({
          body: `Hello,thanks for you Trust. Respond with the salon name (ex: Sparrow)`,
          to: req.body.From,
          from: '+13312446019'
        })
        .then(() => {})
    } else {
      const business = Business.findOne({
        where: {
          name: {
            [Op.iLike]: `%${req.body.Body}%`
          }
        }
      })
      if (business) {
        clientT.messages
          .create({
            body: `Respond with your favorite stylist (ex: Bobby Barber)`,
            to: req.body.From,
            from: '+13312446019'
          })
          .then(() => {})
      } else {
        const stylist = await Stylist.findOne({
          where: {
            name: {
              [Op.iLike]: `%${req.body.Body}%`
            }
          }
        })
        if (stylist) {
          clientT.messages
            .create({
              body: `respond with a day and time (ex: mm/dd/yyyy hh:mm AM)`,
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
                body: `All set you're schedule with ${stylist.name} at ${
                  req.body.Body
                }`,
                to: req.body.From,
                from: '+13312446019'
              })
              .then(() => {})

            //Need appointements table to store information
          }
        }
      }
    }

    /* clientT.messages
      .create({
        body: `Hello ${req.body.FromCity} ${
          req.body.FromState
        },  thanks for you fidelite`,
        to: req.body.From,
        from: '+13312446019'
      })
      .then(() => {}) */
    console.log(req.body)
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
