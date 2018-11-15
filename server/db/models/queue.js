const Sequelize = require('sequelize')
const db = require('../db')

const Queue = db.define('queue', {
  // required fields at creation
  queueLength: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // date of queue activity
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  // number on the business dashboard that the employee can edit
  defaultWaitTime: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  // at which time of day will last person in queue get service?
  timeAtWhichLastQueueGetsSeated: {
    type: Sequelize.DATE
  },
  // business can toggle this
  isBusinessFull: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Queue
