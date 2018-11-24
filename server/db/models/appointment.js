const Sequelize = require('sequelize')
const db = require('../db')

const Appointment = db.define('appointment', {
  // required fields at creation
 id:{
   type: Sequelize.INTEGER,
   primaryKey: true,
   autoIncrement: true

 },
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
