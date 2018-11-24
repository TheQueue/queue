const Sequelize = require('sequelize')
const db = require('../db')

const Reservation = db.define('reservation', {
  status: {
    type: Sequelize.ENUM(['Active', 'Serviced', 'Cancelled']),
    defaultValue: 'Active'
  },
  // required fields at creation
  day: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // optional fields at creation
  note: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Reservation

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
