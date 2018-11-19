const router = require('express').Router()
const {Business, Category, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  const option = {
    where: {}
  }
  if (req.query.category) {
    const category = await Category.findOne({
      where: {
        categoryType: req.query.category
      }
    })
    if (category) {
      option.where.categoryId = category.id
    }
  }
  const businesses = await Business.findAll({include: [Category, User]}, option)

  res.send(businesses)
})

router.get('/:id', async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id)
    res.send(business)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
