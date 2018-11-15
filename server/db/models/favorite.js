const Sequelize = require('sequelize')
const db = require('../db')

const Favorite = db.define('favorite', {
  // required fields at creation
  dateWhenFavorited: {
    type: Sequelize.DATE,
    allowNull: false,
  }
})

module.exports = Favorite
