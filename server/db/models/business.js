const Sequelize = require('sequelize')
const db = require('../db')

const Business = db.define('business', {
  // required fields at creation
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // GPS position/map coords maybe floats/doubles?
  coordinates: {
    type: Sequelize.ARRAY(Sequelize.DOUBLE),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // users can create non-yelp businesses
  yelpId: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  qrCode: {
    type: Sequelize.TEXT,
    allowNull: true
  },

  // tags?
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
  },
  // can users find it via search
  isVisible: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
})

module.exports = Business

/**
 * instanceMethods
 */


/**
 * classMethods
 */

/**
 * hooks
 */
