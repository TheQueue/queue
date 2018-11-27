'use strict'
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const yelp = require('yelp-fusion')

const client = yelp.client(process.env.YELP_KEY)

const router = require('express').Router()
const {Business, Category, Stylist, Slot} = require('../db/models')

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
          const {price, image_url, } = response.jsonBody.businesses[0]
          res.send({business, closed, price, image_url})
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

module.exports = router
