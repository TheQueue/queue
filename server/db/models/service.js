const Sequelize = require('sequelize')
const db = require('../db')

const Service = db.define('service', {
  // required fields at creation
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Service

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
