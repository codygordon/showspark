const express = require('express')
const { catchErrors } = require('../../../handlers')
const entryPoint = require('../../../controllers/entry-point')
const token = require('../../../controllers/token')
const users = require('../../../controllers/users')
const artists = require('../../../controllers/artists')
const venues = require('../../../controllers/venues')

const router = express.Router()

router.get('/', catchErrors(entryPoint))
router.post('/', catchErrors(entryPoint))
router.put('/', catchErrors(entryPoint))

router.get('/token', catchErrors(token))

router.post('/users', catchErrors(users.upsert))

router.post('/artists/', catchErrors(artists.saveNew))
router.put('/artists/:id', catchErrors(artists.saveExisting))
router.get('/artists/:id', catchErrors(artists.findById))

router.post('/venues/', catchErrors(venues.saveNew))
router.put('/venues/:id', catchErrors(venues.saveExisting))
router.get('/venues/:id', catchErrors(venues.findById))

router.get('/venues-proximity', catchErrors(venues.findByProximity))

module.exports = router
