const request = require('supertest')
const jwtSign = require('jsonwebtoken').sign

const testUsersData = require('./test-data/users.json')
const testArtistData = require('./test-data/artist.json')
const testVenuesData = require('./test-data/venues.json')

const User = require('../models/User')
const Artist = require('../models/Artist')
const Venue = require('../models/Venue')

const App = require('../app')

const app = new App()

let testApiToken = ''
let testUserId = ''
let testAdminUserId = ''
let testUserToken = ''
let testAdminUserToken = ''
let testArtistId = ''
const testVenueIds = []

// 0. GET a new non-user API token
describe('GET call to api/v1/token', () => {
  test('should return token', async () => {
    const res = await request(app.express)
      .get('/api/v1/token')
    expect(res.status).toEqual(200)
    expect(res.text).toBeTruthy()
    testApiToken = res.text
  })
})

// 1. Calls to entry points
describe('calls to api/v1 with api token in header', () => {
  test('GET status should return OK', async () => {
    const res = await request(app.express)
      .get('/api/v1')
      .set('Authorization', `Bearer ${testApiToken}`)
    expect(res.status).toEqual(200)
  })

  test('POST status should return OK', async () => {
    const res = await request(app.express)
      .post('/api/v1')
      .set('Authorization', `Bearer ${testApiToken}`)
    expect(res.status).toEqual(200)
  })

  test('PUT status should return OK', async () => {
    const res = await request(app.express)
      .put('/api/v1')
      .set('Authorization', `Bearer ${testApiToken}`)
    expect(res.status).toEqual(200)
  })
})

// 2. POST new test user record
describe('POST call to api/v1/users', () => {
  test('with no data in body returns server error', async () => {
    const res = await request(app.express)
      .post('/api/v1/users/')
      .set('Authorization', `Bearer ${testApiToken}`)
    expect(res.status).toEqual(500)
    expect(res.text).toContain('Error:')
  })

  test('with non-admin auth0 data in body returns user', async () => {
    const res = await request(app.express)
      .post('/api/v1/users/')
      .set('Authorization', `Bearer ${testApiToken}`)
      .set('Content-Type', 'application/json')
      .send(testUsersData[0])
    expect(res.status).toEqual(200)
    expect(res.body.auth0.user_id).toBeTruthy()
    expect(res.body.admin).toBeFalsy()
    testUserId = res.body._id
    testUserToken = jwtSign({
      sub: testUsersData[0].auth0.user_id
    }, process.env.AUTH0_CLIENT_SECRET, {
      issuer: process.env.AUTH0_ISSUER,
      expiresIn: 60 // seconds
    })
  })

  test('with admin auth0 data in body returns user', async () => {
    const res = await request(app.express)
      .post('/api/v1/users/')
      .set('Authorization', `Bearer ${testApiToken}`)
      .set('Content-Type', 'application/json')
      .send(testUsersData[1])
    expect(res.status).toEqual(200)
    expect(res.body.auth0.user_id).toBeTruthy()
    expect(res.body.admin).toBeTruthy()
    testAdminUserId = res.body._id
    testAdminUserToken = jwtSign({
      sub: testUsersData[1].auth0.user_id
    }, process.env.AUTH0_CLIENT_SECRET, {
      issuer: process.env.AUTH0_ISSUER,
      expiresIn: 60 // seconds
    })
  })
})

// 3. POST a new artist record
describe('POST call to api/v1/artists', () => {
  test('with no data in body returns server error', async () => {
    const res = await request(app.express)
      .post('/api/v1/artists/')
      .set('Authorization', `Bearer ${testUserToken}`)
    expect(res.status).toEqual(500)
    expect(res.text).toContain('Error:')
  })

  test('with valid data in body returns success', async () => {
    const res = await request(app.express)
      .post('/api/v1/artists/')
      .set('Authorization', `Bearer ${testUserToken}`)
      .set('Content-Type', 'application/json')
      .send(testArtistData)
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual(testArtistData.name)
    testArtistId = res.body._id
  })
})

// 4. GET an existing artist record
describe('GET call to api/v1/artists', () => {
  test('with no id in params returns 403', async () => {
    const res = await request(app.express)
      .get('/api/v1/artists/')
      .set('Authorization', `Bearer ${testUserToken}`)
    expect(res.status).toEqual(403)
  })

  test('with id in params and non-user token in headers returns error', async () => {
    const res = await request(app.express)
      .get(`/api/v1/artists/${testArtistId}`)
      .set('Authorization', `Bearer ${testApiToken}`)
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('error: invalid user')
  })

  test('with invalid id in params and user token in headers returns error', async () => {
    const res = await request(app.express)
      .get('/api/v1/artists/INVALID_ID')
      .set('Authorization', `Bearer ${testUserToken}`)
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('mongooseerror: cast to objectid failed')
  })

  test('with valid but non-matching id in params and user token in headers returns error', async () => {
    const res = await request(app.express)
      .get('/api/v1/artists/59454ca828a0270e4c67c871')
      .set('Authorization', `Bearer ${testUserToken}`)
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('error: invalid artist id')
  })

  test('with token and id in params returns success', async () => {
    const res = await request(app.express)
      .get(`/api/v1/artists/${testArtistId}`)
      .set('Authorization', `Bearer ${testUserToken}`)
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual(testArtistData.name)
  })
})

// 5. PUT an existing artist record
describe('PUT call to api/v1/artists', () => {
  test('with no id in params returns 403', async () => {
    const res = await request(app.express)
      .put('/api/v1/artists/')
      .set('Authorization', `Bearer ${testUserToken}`)
    expect(res.status).toEqual(403)
  })

  test('with no user token in headers returns 401', async () => {
    const res = await request(app.express)
      .put('/api/v1/artists/')
    expect(res.status).toEqual(401)
  })

  test('with data in body, invalid id in params, and user token in headers returns error', async () => {
    const res = await request(app.express)
      .put('/api/v1/artists/INVALID_ID')
      .set('Authorization', `Bearer ${testUserToken}`)
      .set('Content-Type', 'application/json')
      .send({ ...testArtistData, name: 'new name' })
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('mongooseerror: cast to objectid failed')
  })

  test('with data in body, valid but non-matching id in params, and user token in headers returns error', async () => {
    const res = await request(app.express)
      .put('/api/v1/artists/59454ca828a0270e4c67c871')
      .set('Authorization', `Bearer ${testUserToken}`)
      .set('Content-Type', 'application/json')
      .send({ ...testArtistData, name: 'new name' })
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('error: invalid artist id')
  })

  test('with user token in headers, id in params, and no data in body returns server error', async () => {
    const res = await request(app.express)
      .put(`/api/v1/artists/${testArtistId}`)
      .set('Authorization', `Bearer ${testUserToken}`)
    expect(res.status).toEqual(500)
    expect(res.text).toContain('Error:')
  })

  test('with user token in headers, id in params, and valid data in body returns success', async () => {
    const res = await request(app.express)
      .put(`/api/v1/artists/${testArtistId}`)
      .set('Authorization', `Bearer ${testUserToken}`)
      .set('Content-Type', 'application/json')
      .send({ ...testArtistData, name: 'new name' })
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('new name')
  })
})

// 6. POST new venue records
describe('POST call to api/v1/venues', () => {
  test('with no data in body returns server error', async () => {
    const res = await request(app.express)
      .post('/api/v1/venues/')
      .set('Authorization', `Bearer ${testAdminUserToken}`)
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('error: valid data required in body')
  })

  test('with non-admin user token in headers and data in body returns server error', async () => {
    const res = await request(app.express)
      .post('/api/v1/venues/')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(testVenuesData[0])
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('error: invalid user')
  })

  // test('with admin user token in headers and data in body containing invalid address returns geocoding error', async () => {
  //   const res = await request(app.express)
  //     .post('/api/v1/venues/')
  //     .set('Authorization', `Bearer ${testAdminUserToken}`)
  //     .set('Content-Type', 'application/json')
  //     .send({ ...testVenuesData[0], address: 'hsdfihf783', city: 'none', state: '998', zip: 'nasdgpi' })
  //   expect(res.status).toEqual(500)
  //   expect(res.text.toLowerCase()).toContain('error: invalid user')
  // })

  test('with admin user token in headers and data in body returns success (1)', async () => {
    const res = await request(app.express)
      .post('/api/v1/venues/')
      .set('Authorization', `Bearer ${testAdminUserToken}`)
      .set('Content-Type', 'application/json')
      .send(testVenuesData[0])
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual(testVenuesData[0].name)
    testVenueIds.push(res.body._id)
  })

  test('with admin user token in headers and data in body returns success (2)', async () => {
    const res = await request(app.express)
      .post('/api/v1/venues/')
      .set('Authorization', `Bearer ${testAdminUserToken}`)
      .set('Content-Type', 'application/json')
      .send(testVenuesData[1])
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual(testVenuesData[1].name)
    testVenueIds.push(res.body._id)
  })
})

// 7. PUT an existing venue record
describe('PUT call to api/v1/venues', () => {
  test('with no id in params returns 403', async () => {
    const res = await request(app.express)
      .put('/api/v1/venues/')
      .set('Authorization', `Bearer ${testAdminUserToken}`)
    expect(res.status).toEqual(403)
  })

  test('with non-admin user token in headers returns server error', async () => {
    const res = await request(app.express)
      .put(`/api/v1/venues/${testVenueIds[0]}`)
      .set('Authorization', `Bearer ${testUserToken}`)
    expect(res.status).toEqual(500)
    expect(res.text).toContain('Error:')
  })

  test('with admin user token in headers, id in params, and no data in body returns server error', async () => {
    const res = await request(app.express)
      .put(`/api/v1/venues/${testVenueIds[0]}`)
      .set('Authorization', `Bearer ${testAdminUserToken}`)
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('error: valid data required')
  })

  test('with data in body, invalid id in params, and admin user token in headers returns error', async () => {
    const res = await request(app.express)
      .put('/api/v1/venues/INVALID_ID')
      .set('Authorization', `Bearer ${testAdminUserToken}`)
      .set('Content-Type', 'application/json')
      .send({ ...testVenuesData[0], name: 'new name' })
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('mongooseerror: cast to objectid failed')
  })

  test('with data in body, valid but non-matching id in params, and admin user token in headers returns error', async () => {
    const res = await request(app.express)
      .put('/api/v1/venues/59454ca828a0270e4c67c871')
      .set('Authorization', `Bearer ${testAdminUserToken}`)
      .set('Content-Type', 'application/json')
      .send({ ...testVenuesData[0], name: 'new name' })
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('error: invalid venue id')
  })

  test('with admin user token in headers, id in params, and valid data in body returns success', async () => {
    const res = await request(app.express)
      .put(`/api/v1/venues/${testVenueIds[0]}`)
      .set('Authorization', `Bearer ${testAdminUserToken}`)
      .set('Content-Type', 'application/json')
      .send({ ...testVenuesData[0], name: 'new name' })
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('new name')
  })
})

// 8. GET an existing venue record
describe('GET call to api/v1/venues', () => {
  test('with no id in params returns 403', async () => {
    const res = await request(app.express)
      .put('/api/v1/venues/')
      .set('Authorization', `Bearer ${testApiToken}`)
    expect(res.status).toEqual(403)
  })

  test('with data in body, invalid id in params, and admin user token in headers returns error', async () => {
    const res = await request(app.express)
      .get('/api/v1/venues/INVALID_ID')
      .set('Authorization', `Bearer ${testAdminUserToken}`)
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('mongooseerror: cast to objectid failed')
  })

  test('with data in body, valid but non-matching id in params, and admin user token in headers returns error', async () => {
    const res = await request(app.express)
      .get('/api/v1/venues/59454ca828a0270e4c67c871')
      .set('Authorization', `Bearer ${testAdminUserToken}`)
    expect(res.status).toEqual(500)
    expect(res.text.toLowerCase()).toContain('error: invalid venue id')
  })

  test('with id in params returns success', async () => {
    const res = await request(app.express)
      .get(`/api/v1/venues/${testVenueIds[1]}`)
      .set('Authorization', `Bearer ${testApiToken}`)
      .set('Content-Type', 'application/json')
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual(testVenuesData[1].name)
  })
})

// 9. GET venue records by proximity
describe('GET call to api/v1/venues-proximity', () => {
  test('with invalid query params returns server error', async () => {
    const res = await request(app.express)
      .get('/api/v1/venues-proximity/')
      .set('Authorization', `Bearer ${testApiToken}`)
    expect(res.status).toEqual(500)
    expect(res.text).toContain('Error:')
  })


  test('with valid latitude, longitude, and proximity queries returns success', async () => {
    const res = await request(app.express)
      .get('/api/v1/venues-proximity/')
      .set('Authorization', `Bearer ${testApiToken}`)
      .set('Content-Type', 'application/json')
      .query({ latitude: 40.690598, longitude: -73.945246 })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toEqual(testVenuesData[1].name)
  })
})

describe('remove test documents', () => {
  test('from user collection', async () => {
    const removed = await User.findByIdAndRemove(testUserId)
    const removedAdmin = await User.findByIdAndRemove(testAdminUserId)
    const found = await User.findById(testUserId)
    const foundAdmin = await User.findById(testAdminUserId)
    expect(removed._id.toString()).toEqual(testUserId)
    expect(removedAdmin._id.toString()).toEqual(testAdminUserId)
    expect(found).toBeNull()
    expect(foundAdmin).toBeNull()
  })

  test('from artist collection', async () => {
    const removed = await Artist.findByIdAndRemove(testArtistId)
    const found = await Artist.findById(testArtistId)
    expect(removed._id.toString()).toEqual(testArtistId)
    expect(found).toBeNull()
  })

  test('from venue collection', async () => {
    const removed = await Venue.findByIdAndRemove(testVenueIds[0])
    const removed2 = await Venue.findByIdAndRemove(testVenueIds[1])
    const found = await Venue.findById(testVenueIds[0])
    const found2 = await Venue.findById(testVenueIds[1])
    expect(removed._id.toString()).toEqual(testVenueIds[0])
    expect(removed2._id.toString()).toEqual(testVenueIds[1])
    expect(found).toBeNull()
    expect(found2).toBeNull()
  })
})
