'use strict'

const yelp = require('yelp-fusion')

const client = yelp.client(process.env.YELP_KEY)

const router = require('express').Router()
const {Business, Category, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  const option = {
    where: {},
    include: [Category, User]
  }

  if (req.query.category) {
    const category = await Category.findOne({
      where: {
        categoryType: req.query.category
      }
    })
    //console.log(category)
    option.where.categoryId = category.id
  }
  console.log(option)
  const businesses = await Business.findAll(option)

  res.send(businesses)
})

router.get('/:id', async (req, res, next) => {
  try {
    let closed = true
    const business = await Business.findById(req.params.id)
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
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
