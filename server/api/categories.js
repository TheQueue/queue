const router = require('express').Router()
const {Business, Category, User} = require('../db/models')

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

module.exports = router
