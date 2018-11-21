'use strict'

const yelp = require('yelp-fusion')

const client = yelp.client(process.env.YELP_KEY)

const router = require('express').Router()
const {Business, Category} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.get('/', async (req, res, next) => {
  const today = new Date() // creates new date object at current time
  today.setHours(0, 0, 0, 0) // sets time of date object to beginning of the day

  try {
    if (req.query.category) {
      //const allBusinesses = await Business.findAll()

      const category = await Category.findOne({
        where: {
          categoryType: req.query.category
        }
      })
      const option = {
        where: {categoryId: category.id},
        include: [
          {
            model: Category
          }
        ]
      }
      const businesses = await Business.findAll(option)
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
          //console.log(response.jsonBody.businesses[0].is_closed)
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

module.exports = router
