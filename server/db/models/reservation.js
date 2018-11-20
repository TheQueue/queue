const Sequelize = require('sequelize')
const db = require('../db')

const Reservation = db.define('reservation', {
  status: {
    type: Sequelize.ENUM([
      'Pending',
      'Active',
      'Serviced',
      'Cancelled',
      'Holding'
    ]),
    defaultValue: 'Pending'
  },
  // required fields at creation
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  dateBooked: {
    type: Sequelize.DATE,
    allowNull: false
  },
  partySize: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },

  // optional fields at creation
  note: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  queuePosition: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  estimatedTimeOfService: {
    type: Sequelize.DATE,
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
