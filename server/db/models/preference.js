const Sequelize = require('sequelize')
const db = require('../db')

const Preference = db.define('preference', {
  // required fields at creation
  categoryType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Preference
