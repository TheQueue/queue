const Business = require('./business')
const Category = require('./category')
const Service = require('./service')
const Image = require('./image')
const Stylist = require('./stylist')
const Reservation = require('./reservation')
const Token = require('./token')
const User = require('./user')
const Preference = require('./preference')
const Slot = require('./slot')
const Appointment = require('./appointment')

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

//Service and business
Service.belongsTo(Business)
Business.hasMany(Service)

//stylist-reservation
Reservation.belongsTo(Stylist)
Stylist.hasMany(Reservation)

// Business-Category many to many
Business.belongsToMany(Category, {through: 'CategoryBusiness', as: 'Category'})
Category.belongsToMany(Business, {through: 'CategoryBusiness', as: 'Business'})

// favorites
Business.belongsToMany(User, {through: 'FavoriteBusiness'})
User.belongsToMany(Business, {
  through: 'FavoriteBusiness',
  as: 'UserFavoriteBusiness'
})

//preference-categories

Preference.belongsToMany(Category, {
  through: 'PreferenceCategories',
  as: 'Category'
})
Category.belongsToMany(Preference, {through: 'PreferenceCategories'})

//user-business-stylist to appointment

User.belongsToMany(Slot, {
  through: {
    model: Appointment,
    unique: false
  },
  constraints: false
})

Slot.belongsToMany(User, {
  through: {
    model: Appointment,
    unique: false
  }
})

Slot.belongsToMany(Stylist, {
  through: {
    model: Appointment,
    unique: false
  }
})

Stylist.belongsToMany(Slot, {
  through: {
    model: Appointment,
    unique: false
  },
  constraints: false
})

//Appointment-stylist
Appointment.belongsTo(Stylist)
Stylist.hasMany(Appointment)

//Appointment-slot
Appointment.belongsTo(Slot)
Slot.hasMany(Appointment)

//stylist and slot relationship on another table (for onwer to add and filter and map for user to choose)



Slot.belongsToMany(Stylist, {
  through:
    "SlotStylist"
})

Stylist.belongsToMany(Slot, {
  through:
    "SlotStylist"
})


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

// preference - user
Preference.belongsTo(User)
User.hasOne(Preference)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Business,
  Reservation,
  Category,
  Service,
  Slot,
  Token,
  Stylist,
  Image,
  Appointment
}
