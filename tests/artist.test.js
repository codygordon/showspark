const request = require('supertest')
const App = require('../app')
const testData = require('./test-data/artist.json')
const Artist = require('../models/Artist')

const app = new App()

let testId = ''

// 1. post new artist record
describe('POST call to api/v1/artists', () => {
  test('with no data in body returns server error', async () => {
    const res = await request(app.express)
      .post('/api/v1/artists/')
      .set('Authorization', `Bearer ${app.testToken}`)
    expect(res.status).toEqual(500)
    expect(res.text).toContain('Error:')
  })

  test('with valid data in body returns success', async () => {
    const res = await request(app.express)
      .post('/api/v1/artists/')
      .set('Authorization', `Bearer ${app.testToken}`)
      .set('Content-Type', 'application/json')
      .send(testData)
    expect(res.status).toEqual(200)
    expect(res.body.title).toEqual(testData)
    testId = res.body._id
  })
})

// 2. GET an existing artist record
describe('GET call to api/v1/artists', () => {
  test('with no id in params returns 403', async () => {
    const res = await request(app.express)
      .put('/api/v1/artists/')
      .set('Authorization', `Bearer ${app.testToken}`)
    expect(res.status).toEqual(403)
  })

  test('with id in params returns success', async () => {
    const res = await request(app.express)
      .get(`/api/v1/artists/${testId}`)
      .set('Authorization', `Bearer ${app.testToken}`)
      .set('Content-Type', 'application/json')
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual(testData.name)
  })
})

// 3. PUT an existing artist record
describe('PUT call to api/v1/artists', () => {
  test('with no id in params returns 403', async () => {
    const res = await request(app.express)
      .put('/api/v1/artists/')
      .set('Authorization', `Bearer ${app.testToken}`)
    expect(res.status).toEqual(403)
  })

  test('with id in params and no data in body returns server error', async () => {
    const res = await request(app.express)
      .put(`/api/v1/artists/${testId}`)
      .set('Authorization', `Bearer ${app.testToken}`)
    expect(res.status).toEqual(500)
    expect(res.text).toContain('Error:')
  })

  test('with id in params and valid data in body returns success', async () => {
    const res = await request(app.express)
      .put(`/api/v1/artists/${testId}`)
      .set('Authorization', `Bearer ${app.testToken}`)
      .set('Content-Type', 'application/json')
      .send({ ...testData, name: 'new name' })
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('new name')
  })
})

afterAll(() => {
  describe('remove test data', () => {
    test('from Artist schema', async () => {
      const removed = await Artist.findByIdAndRemove(testId)
      const found = await Artist.findById(testId)
      expect(removed._id.toString()).toEqual(testId)
      expect(found).toBeNull()
    })
  })
})
