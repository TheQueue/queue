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
  const business = await Business.findAll(option)

  res.send(business)
})

module.exports = router
