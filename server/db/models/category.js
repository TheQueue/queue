const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  // required fields at creation
  categoryType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.export = Category
