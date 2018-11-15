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
  const business = await Business.findAll({include: [Category, User]}, option)

  res.send(business)
})

module.exports = router
