'use strict'

const db = require('../server/db')
const {
  User,
  Business,
  Category,
  Reservation,
  Stylist,
  Slot,
  Appointment
} = require('../server/db/models')
const seedCategory = require('./seedCategory.json')
const seedUser = require('./seedUser.json')
const seedBusiness = require('./seedBusiness.json')
const seedReservation = require('./seedReservation.json')
const seedStylist = require('./seedStylist.json')
const seedSlot = require('./seedSlot.json')
const seedAppointment = require('./seedAppointment')


async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    // get the current date
    const now = new Date()
    const nowPlusOneHr = new Date(now)
    nowPlusOneHr.setHours(now.getHours() + 1)

    // categories
    const categories = await Promise.all(
      seedCategory.map(category => {
        return Category.create(category)
      })
    )
    // slots
    console.log(`seeded ${categories.length} categories`)
    const slots = await Promise.all(
      seedSlot.map(slot =>{
        return Slot.create(slot)
      })
    )
    console.log(`seeded ${slots.length} slots`)
    // users
    const users = await Promise.all(
      seedUser.map(user => {
        return User.create(user)
      })
    )
    console.log(`seeded ${users.length} users`)

    // businesses
    // create entry then set associations using categoryId key
    const businesses = await Promise.all(
      seedBusiness.map(business =>
        Business.create(business).then(createdBusiness =>
          createdBusiness.addCategory(business.categoryId)
        )
      )
    )
    console.log(`seeded ${businesses.length} businesses`)

    // stylists
    const stylists = await Stylist.bulkCreate(seedStylist)
    console.log(`seeded ${stylists.length} stylists`)

    // reservations
    const reservations = await Promise.all(
      seedReservation.map(reservation => {
        reservation.startDateAndTime = now
        reservation.endDateAndTime = nowPlusOneHr
        return Reservation.create(reservation)
      })
    )

    console.log(`seeded ${reservations.length} reservations`)

    // Appointment
    const appointments = await Promise.all(
      seedAppointment.map(appointment => {
        return Appointment.create(appointment)
      })
    )
    console.log(`seeded ${appointments.length} Appointment`)


    // console.log(`seeded ${categoryBusiness.length} cat-business association`)

    console.log(`seeded successfully`)
  } catch (err) {
    console.error(err)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the err`or` handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
