const Sequelize = require('sequelize')
const db = require('../db')

const Slot = db.define('slot', {
  time: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  }
})

module.exports = Slot

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
