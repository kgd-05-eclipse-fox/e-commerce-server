const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { sequelize, Banner } = require('../models')
const { queryInterface } = sequelize 

const admin = {}
const customer = {}
let banner = {}

beforeAll(done => {
  const admin_data = {
      id: 1,
      username: 'admin',
      email: 'admin@mail.com',
      role: 'admin'
  }

  admin.access_token = signToken(admin_data)

  const customer_data = {
      id: 2,
      username: 'customer',
      email: 'customer@mail.com',
      role: 'customer'
  } 

  customer.access_token = signToken(customer_data)

  Banner.create({
      image_url: 'http://arah.in/banner-test',
      status: 'inactive'
  })
  .then(data => {
      banner = data
      done()
  })
  .catch(err => {
      done(err)
  })
})

afterAll(done => {
  queryInterface.bulkDelete('Banners')
  queryInterface.bulkDelete('Users')
  done()
})

describe('add new banner test', () => {
  it('add banner success', (done) => {
    request(app)
    .post('/banners')
    .set('access_token', admin.access_token)
    .send({
      image_url: 'http://arah.in/banner-test',
      status: 'active'
    })
    .then(({ status, body }) => {
      expect(status).toEqual(201)
      expect(body).toHaveProperty('image_url', 'http://arah.in/banner-test')
      expect(body).toHaveProperty('status', 'active')

      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it ('add banner failed (no access_token)', (done) => {
    request(app)
    .post('/banners')
    .send({
      image_url: 'http://arah.in/banner-test',
      status: 'active'
    })
    .then(({ status, body }) => {
      expect(status).toEqual(401)
      expect(body).toHaveProperty('msg', 'Authentication Failed')

      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it ('add banner failed (customer access_token)', (done) => {
    request(app)
    .post('/banners')
    .set('access_token', customer.access_token)
    .send({
      image_url: 'http://arah.in/banner-test',
      status: 'active'
    })
    .then(({ status, body }) => {
      expect(status).toEqual(401)
      expect(body).toHaveProperty('msg', 'Not Authorized')

      done()
    })
    .catch(err => {
      done(err)
    })
  })
  
  it ('add banner failed (validation errors)', (done) => {
    request(app)
    .post('/banners')
    .set('access_token', admin.access_token)
    .send({
      image_url: 'not an url',
      status: null
    })
    .then(({ status, body }) => {
      expect(status).toEqual(400)
      expect(body).toHaveProperty('msg', `status can't be empty, Must be in url format`)

      done()
    })
    .catch(err => {
      done(err)
    })
  })
})

describe('update banners test', () => {
  it('update success', (done) => {
    request(app)
    .put(`/banners/${banner.id}`)
    .set('access_token', admin.access_token)
    .send({
      image_url: 'http://arah.in/banner-test-edited',
      status: 'active'
    })
    .then(({ body, status }) => {
      expect(status).toEqual(200)
      expect(body).toHaveProperty('image_url', 'http://arah.in/banner-test-edited')
      expect(body).toHaveProperty('status', 'active')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('update failed (banner not found)', (done) => {
    request(app)
    .put(`/banners/1000`)
    .set('access_token', admin.access_token)
    .then(({ body,status }) => {
      expect(status).toEqual(404)
      expect(body).toHaveProperty('msg', 'banner is not found')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('update failed (no access_token)', (done) => {
    request(app)
    .put(`/banners/${banner.id}`)
    .then(({ body, status }) => {
      expect(status).toEqual(401)
      expect(body).toHaveProperty('msg', 'Authentication Failed')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('update failed (customer access_token)', (done) => {
    request(app)
    .put(`/banners/${banner.id}`)
    .set('access_token', customer.access_token)
    .then(({ body, status }) => {
      expect(status).toEqual(401)
      expect(body).toHaveProperty('msg', 'Not Authorized')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('update failed (validation errors)', (done) => {
    request(app)
    .put(`/banners/${banner.id}`)
    .set('access_token', admin.access_token)
    .send({
      image_url: 'not an url',
      status: null
    })
    .then(({ body, status }) => {
      expect(status).toEqual(400)
      expect(body).toHaveProperty('msg', `status can't be empty, Must be in url format`)
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})

describe('delete banner test', () => {
  it('delete success', (done) => {
    request(app)
    .delete(`/banners/${banner.id}`)
    .set('access_token', admin.access_token)
    .then(({ status, body }) => {
      expect(status).toEqual(200)
      expect(body).toHaveProperty('msg', 'Banner Successfully Deleted')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it ('delete failed (not found)', (done) => {
    request(app)
    .delete(`/banners/1000`)
    .set('access_token', admin.access_token)
    .then(({ status, body }) => {
      expect(status).toEqual(404)
      expect(body).toHaveProperty('msg', 'banner is not found')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('delete product failed (customer access token)', (done) => {
    request(app)
    .delete(`/banners/${banner.id}`)
    .set('access_token', customer.access_token)
    .then(({ status, body }) => {
      expect(status).toEqual(401)
      expect(body).toHaveProperty('msg', 'Not Authorized')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('delete product failed (no access token)', (done) => {
    request(app)
    .delete(`/banners/${banner.id}`)
    .then(({ status, body }) => {
      expect(status).toEqual(401)
      expect(body).toHaveProperty('msg', 'Authentication Failed')
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})