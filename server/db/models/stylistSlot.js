const Sequelize = require('sequelize')
const db = require('../db')

const StylistSlot = db.define('stylistSlot', {
  // required fields at creation
  status: {
    type: Sequelize.ENUM([
      'Open',
      'Booked'
    ]),
    defaultValue: 'Open'
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
})

module.exports = StylistSlot

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
