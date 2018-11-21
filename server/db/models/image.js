const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  // required fields at creation
  fileName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Image
