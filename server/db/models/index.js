const Business = require('./business')
const Category = require('./category')
const Favorite = require('./favorite')
const Queue = require('./queue')
const ReportedWaitTime = require('./reportedWaitTime')
const Reservation = require('./reservation')
const Token = require('./token')
const User = require('./user')



/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// reservation - user
Reservation.belongsTo(User)
User.hasMany(Reservation)

// reservation - queue
Reservation.belongsTo(Queue)
Queue.hasMany(Reservation)

// queue - business
Queue.belongsTo(Business)
Business.hasMany(Queue)

// business - category
Business.belongsTo(Category)
Category.hasMany(Business)

// business - user
Business.belongsTo(User)
User.hasMany(Business) // as owner??? alias might be needed

// Favorites - User - Business
// ???? Check this later?????
Favorite.belongsTo(Business)
Favorite.belongsTo(User)
Business.hasMany(Favorite)
User.hasMany(Favorite)

// reported Wait time - user
ReportedWaitTime.belongsTo(User)
User.hasMany(ReportedWaitTime)
//reported wait time - queue ????
ReportedWaitTime.belongsTo(Queue)
Queue.hasMany(ReportedWaitTime)

// user - token
Token.belongsTo(User)
User.hasMany(Token)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Business, Reservation, Queue, Category, Favorite, ReportedWaitTime, Token
}
