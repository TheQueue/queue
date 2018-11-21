const Sequelize = require('sequelize')
const db = require('../db')

const Reservation = db.define('reservation', {
  status: {
    type: Sequelize.ENUM([
      'Active',
      'Serviced',
      'Cancelled',
    ]),
    defaultValue: 'Active'
  },
  // required fields at creation
  startDateAndTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDateAndTime: {
    type: Sequelize.DATE,
    allowNull: false
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
