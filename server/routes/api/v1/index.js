const router = require('express').Router()
const { catchErrors } = require('../../../handlers')
const entryPoint = require('../../../controllers/entry-point')
const token = require('../../../controllers/token')
const fbToken = require('../../../controllers/fb-token')
const users = require('../../../controllers/users')
const artists = require('../../../controllers/artists')
const venues = require('../../../controllers/venues')

router.get('/', entryPoint)
router.post('/', entryPoint)
router.put('/', entryPoint)

router.get('/token', token)

router.get('/fb-token', catchErrors(fbToken))

router.post('/users', catchErrors(users.upsert))

router.post('/artists/', catchErrors(artists.saveNew))
router.put('/artists/:id', catchErrors(artists.saveExisting))
router.get('/artists/:id', catchErrors(artists.findById))

router.post('/venues/', catchErrors(venues.saveNew))
router.put('/venues/:id', catchErrors(venues.saveExisting))
router.get('/venues/:id', catchErrors(venues.findById))

router.get('/venues-proximity', catchErrors(venues.findByProximity))

module.exports = router
