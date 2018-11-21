'use strict'
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const yelp = require('yelp-fusion')

const client = yelp.client(process.env.YELP_KEY)

const router = require('express').Router()
const {Business, Category, User, Queue} = require('../db/models')

router.get('/', async (req, res, next) => {
  const today = new Date() // creates new date object at current time
  today.setHours(0, 0, 0, 0) // sets time of date object to beginning of the day

  try {
    if (req.query.category) {
      const allBusinesses = await Business.findAll()
      await Promise.all(
        allBusinesses.map(business =>
          // for each business,
          // look for an associated queue for today
          Queue.findOne({
            where: {
              businessId: business.id,
              date: {
                [Op.gte]: today
              }
            }
          }).then(queue => {
            // if no queue found, create one
            if (queue === null) {
              return Queue.create({
                businessId: business.id,
                date: today
              })
            } else {
              // if queue found, return it
              return queue
            }
          })
        )
      )
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
          },
          {
            model: User
          },
          {
            model: Queue,
            where: {
              date: {
                [Op.gte]: today
              }
            }
          }
        ]
      }
      const businesses = await Business.findAll(option)
      res.json(businesses)
    } else {
      const businesses = await Business.findAll()
      await Promise.all(
        businesses.map(business =>
          // for each business,
          // look for an associated queue for today
          Queue.findOne({
            where: {
              businessId: business.id,
              date: {
                [Op.gte]: today
              }
            }
          }).then(queue => {
            // if no queue found, create one
            if (queue === null) {
              return Queue.create({
                businessId: business.id,
                date: today
              })
            } else {
              // if queue found, return it
              return queue
            }
          })
        )
      )
      const businessesWithQueues = await Business.findAll({
        include: [
          {
            model: Queue,
            where: {
              date: {
                [Op.gte]: today
              }
            }
          }
        ]
      })
      res.json(businessesWithQueues)
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
      const queue = await Queue.findOne({
        where: {
          date: {
            [Op.gte]: today
          }
        }
      })
      if (queue === null) {
        await Queue.create({
          businessId: business.id,
          date: today
        })
      }
      const options = {
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Queue,
            where: {
              date: {
                [Op.gte]: today
              }
            }
          }
        ]
      }
      const businessWithQueue = await Business.findOne(options)
      client
        .search({
          term: business.name,
          location: 'chicago'
        })
        .then(response => {
          //console.log(response.jsonBody.businesses[0].is_closed)
          closed = response.jsonBody.businesses[0].is_closed
          res.send({business: businessWithQueue, closed})
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
