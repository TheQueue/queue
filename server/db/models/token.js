const Sequelize = require('sequelize')
const db = require('../db')

// this model is not good
const Token = db.define('token', {
  // required fields at creation
  token: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  expirationDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isSms: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  isEmail: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Token
