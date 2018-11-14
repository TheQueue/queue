const Sequelize = require('sequelize')
const db = require('../db')

// this model is not good
const ReportedWaitTime = db.define('reportedWaitTime', {
  // required fields at creation
  waitTime: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dateReported: {
    type: Sequelize.DATE,
  }
})

module.export = ReportedWaitTime
