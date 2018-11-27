
const Sequelize = require('sequelize')
const db = require('../db')

const Stylist = db.define('stylist', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate:{
      isEmail: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  profile: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Stylist

