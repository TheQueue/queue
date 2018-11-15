'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

const businesses = [
  {
    yelpId: 'qjnpkS8yZO8xcyEIy5OU9A',
    name: 'Girl & the Goat',
    imageUrl:
      'https://s3-media1.fl.yelpcdn.com/bphoto/ya6gjD4BPlxe7AKMj_5WsA/o.jpg',
    coordinates: [41.8841049992939, -87.6479440725005],
    address: '809 W Randolph St, Chicago IL, 60607',
    phoneNumber: '+13124926262',
    categoryId: 1
  },
  {
    yelpId: 'cKZNbMvoqJaUe7n6lf6i7w',
    name: 'Wildberry Pancakes and Cafe',
    imageUrl:
      'https://s3-media2.fl.yelpcdn.com/bphoto/9ZnC8R_MgeIKWV-5IedwNg/o.jpg',
    coordinates: [41.884668, -87.62288],
    address: '130 E Randolph St,Chicago, IL 60601',
    phoneNumber: '+13129389777',
    categoryId: 1
  },
  {
    yelpId: 'xoi7Cw7FoknAx5p880RtWQ',
    name: 'Au Cheval',
    imageUrl:
      'https://s3-media4.fl.yelpcdn.com/bphoto/a0yhvSJX_6i28iwS9egDFg/o.jpg',
    coordinates: [41.88466, -87.647668],
    address: '800 W Randolph St, Chicago, IL 60607',
    phoneNumber: '+13129294580',
    categoryId: 1
  },
  {
    yelpId: 'boE4Ahsssqic7o5wQLI04w',
    name: 'The Purple Pig',
    imageUrl:
      'https://s3-media4.fl.yelpcdn.com/bphoto/M6pJaV5NImbmjQhor_2mAg/o.jpg',
    coordinates: [41.89101954311, -87.6245617816512],
    address: '500 N Michigan Ave, Chicago, IL 60611',
    phoneNumber: '+13124641744',
    categoryId: 1
  },
  {
    yelpId: 'LPwAwxEjetjdNh7Uadro3g',
    name: 'Smoque BBQ',
    imageUrl:
      'https://s3-media4.fl.yelpcdn.com/bphoto/T-oNCsrLiZc2lwrI3r9phQ/o.jpg',
    coordinates: [41.95021, -87.72795],
    address: '3800 N Pulaski Rd, Ste 2,Chicago, IL 60641',
    phoneNumber: '+17735457427',
    categoryId: 1
  },
  {
    yelpId: '8vFJH_paXsMocmEO_KAa3w',
    name: "Lou Malnati's Pizzeria",
    imageUrl:
      'https://s3-media1.fl.yelpcdn.com/bphoto/cv0OrGAkBn4qdFOm3zuFjQ/o.jpg',
    coordinates: [41.890357, -87.633704],
    address: '439 N Wells St, Chicago, IL 60654',
    phoneNumber: '+13128289800',
    categoryId: 1
  },
  {
    yelpId: 'apyIymDFbUK7u-Y3V5kmkA',
    name: "Bavette's Bar & Boeuf",
    imageUrl:
      'https://s3-media4.fl.yelpcdn.com/bphoto/umjQHAZBktNxz0LsqUyFxQ/o.jpg',
    coordinates: [41.8892796234574, -87.6348227262497],
    address: '218 W Kinzie St, Chicago, IL 60654',
    phoneNumber: '+13126248154',
    categoryId: 1
  },
  {
    yelpId: '-sdMTRmgExufOk6STZFi9w',
    name: 'Little Goat Diner',
    imageUrl:
      'https://s3-media3.fl.yelpcdn.com/bphoto/FEdL5JcbVf5NFEB3s5S8Mg/o.jpg',
    coordinates: [41.8846460590586, -87.6484126982138],
    address: '820 W Randolph St,Chicago, IL 60607',
    phoneNumber: '+13128883455',
    categoryId: 1
  },
  {
    yelpId: 'rp17Dfjdh7JR4GGZwj6nqg',
    name: "Portillo's Hot Dogs",
    imageUrl:
      'https://s3-media2.fl.yelpcdn.com/bphoto/-9jRmNrw7QgjcUn_EXVsEA/o.jpg',
    coordinates: [41.8934295, -87.6314147],
    address: '100 W Ontario, Chicago, IL 60654',
    phoneNumber: '+13125878910',
    categoryId: 1
  },
  {
    yelpId: 'y8jVBaHh8ntYkVqDXpsi1Q',
    name: 'Cafe Ba-Ba-Reeba!',
    imageUrl:
      'https://s3-media2.fl.yelpcdn.com/bphoto/jMNRpAcS1sPTAcSSTfCDrg/o.jpg',
    coordinates: [41.918984, -87.648687],
    address: '2024 N Halsted St, Chicago, IL 60614',
    phoneNumber: '+17739355000',
    categoryId: 1
  }
]

const categories = [
  {
    categoryType: 'restaurant'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
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
