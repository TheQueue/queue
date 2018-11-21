const Business = require('./business')
const Category = require('./category')
const Image = require('./image')
const Stylist = require('./stylist')
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

//Business-reservation
Reservation.belongsTo(Business)
Business.hasMany(Reservation)

// business - category
Business.belongsTo(Category)
Category.hasMany(Business)


// Business-Category many to many
Business.belongsToMany(Category,{ through: 'CategoryBusiness', as: 'Category'})
Category.belongsToMany(Business,{ through: 'CategoryBusiness'})

// favorites
Business.belongsToMany(User,{ through: 'FavoriteBusiness', as: 'UserFavoriteBusiness'})
User.belongsToMany(Business,{ through: 'FavoriteBusiness'})

// business - user
Business.belongsTo(User)
User.hasMany(Business) // as owner??? alias might be needed

//User-image
Image.belongsTo(User)
User.hasMany(Image)

Image.belongsTo(Stylist)
Stylist.hasMany(Image)

//Stylist-business-user
Stylist.belongsTo(User)
Stylist.belongsTo(Business)
Business.hasMany(Stylist)
User.hasMany(Stylist)

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
  User, Business, Reservation, Category, Token, Stylist, Image
}
