'use strict'

const db = require('../server/db')
const {
  User,
  Business,
  Category,
  Reservation,
  Queue
} = require('../server/db/models')
const seedCategory = require('./seedCategory.json')
const seedUser = require('./seedUser.json')
const seedBusiness = require('./seedBusiness.json')
const seedReservation = require('./seedReservation.json')
const seedQueue = require('./seedQueue.json')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // get the current date
  const now = new Date()

  // categories
  const categories = await Promise.all(
    seedCategory.map(category => {
      return Category.create(category)
    })
  )
  console.log(`seeded ${categories.length} categories`)

  // users
  const users = await Promise.all(seedUser.map(user => {
    return User.create(user)
  }))
  console.log(`seeded ${users.length} users`)

  // businesses
  const businesses = await Promise.all(
    seedBusiness.map(business => {
      return Business.create(business)
    })
  )
  console.log(`seeded ${businesses.length} businesses`)

  // queue
  const queues = await Promise.all(
    seedQueue.map(queue => {
      queue.date = now
      return Queue.create(queue)
    })
  )
  console.log(`seeded ${queues.length} queues`)

  // reservations
  const reservations = await Promise.all(
    seedReservation.map(reservation => {
      reservation.dateBooked = now
      return Reservation.create(reservation)
    })
  )
  console.log(`seeded ${reservations.length} reservations`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
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
