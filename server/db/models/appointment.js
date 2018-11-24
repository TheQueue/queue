const Sequelize = require('sequelize')
const db = require('../db')
const {User, Slot, Business, Stylist} = require('./Index')

const Appointment = db.define('appointment', {
  // required fields at creation
 
  note: {
    type: Sequelize.STRING
  }
})

module.exports = Appointment

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
