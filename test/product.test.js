const { response } = require('express')
const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize 

const admin = {}
const costumer = {}

beforeAll(done => {
    const admin_data = {
        id: 1,
        username: 'admin',
        email: 'admin@mail.com',
        role: 'admin'
    }

    admin.access_token = signToken(admin_data)
    admin.user = admin_data

    const costumer_data = {
        id: 2,
        username: 'costumer',
        email: 'costumer@mail.com',
        role: 'costumer'
    } 

    costumer.access_token = signToken(costumer_data)
    costumer.user = costumer_data

    done()
})

afterAll(done => {
    queryInterface.bulkDelete('Products')
    done()
})

describe('add new product test', () => {
    it('add product success', (done) => {
        request(app)
        .post('/products')
        .set('access_token', admin.access_token)
        .send({
            name: 'Canon 5D',
            price: 4e5,
            image_url: 'http://arah.in/test-add-rev',
            stock: 5
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(201)
            expect(body).toHaveProperty('name', 'Canon 5D')
            expect(body).toHaveProperty('price', 4e5)
            expect(body).toHaveProperty('image_url', 'http://arah.in/test-add-rev')
            expect(body).toHaveProperty('stock', 5)

            done()
        })
        .catch(err => {
            done(err)
        })
    })
    
    it('add product failed (no access_token)', (done) => {
        request(app)
        .post('/products')
        .send({
            name: 'Canon 5D',
            price: 4e5,
            image_url: 'http://arah.in/test-add-rev',
            stock: 5
        })
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Authentication Failed')

            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('add product failed (costumer access_token)', (done) => {
        request(app)
        .post('/products')
        .set('access_token', costumer.access_token)
        .send({
            name: 'Canon 5D',
            price: 4e5,
            image_url: 'http://arah.in/test-add-rev',
            stock: 5
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Not Authorized')

            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('add product failed (validation failure)', (done) => {
        request(app)
        .post('/products')
        .set('access_token', admin.access_token)
        .send({
            name: '',
            price: 'dasdad',
            image_url: 'something',
            stock: -110
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', `Stock can't be a minus, Name can't be empty, Must be an url format, Price must be a number`)

            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

describe('update product test', () => {
    it('update product success', (done) => {
        request(app)
        .put('/products/33')
        .set('access_token', admin.access_token)
        .send({
            name: 'Canon 5D edited',
            price: 5e5,
            image_url: 'http://arah.in/test-add-rev',
            stock: 3
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(200)
            expect(body).toHaveProperty('name', 'Canon 5D edited')
            expect(body).toHaveProperty('price', 5e5)
            expect(body).toHaveProperty('image_url', 'http://arah.in/test-add-rev')
            expect(body).toHaveProperty('stock', 3)

            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('update product failed (product not found)', (done) => {
        request(app)
        .put('/products/1000')
        .set('access_token', admin.access_token)
        .send({
            name: 'Canon 5D edited',
            price: 5e5,
            image_url: 'http://arah.in/test-add-rev',
            stock: 3
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(404)
            expect(body).toHaveProperty('msg', 'Product is not found')

            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('update product failed (no access_token)', (done) => {
        request(app)
        .put('/products/24')
        .send({
            name: 'Canon 5D edited',
            price: 5e5,
            image_url: 'http://arah.in/test-add-rev',
            stock: 3
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Authentication Failed')

            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('update product failed (costumer access token)', (done) => {
        request(app)
        .put('/products/30')
        .set('access_token', costumer.access_token)
        .send({
            name: 'Canon 5D',
            price: 4e5,
            image_url: 'http://arah.in/test-add-rev',
            stock: 5
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Not Authorized')

            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('update product failed (validatin errors)', (done) => {
        request(app)
        .put('/products/33')
        .set('access_token', admin.access_token)
        .send({
            name: '',
            price: 'dasdad',
            image_url: 'something',
            stock: -110
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', `Stock can't be a minus, Name can't be empty, Must be an url format, Price must be a number`)

            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

describe('delete product test', () => {
    it('delete product success', (done) => {
        request(app)
        .delete('/products/33')
        .set('access_token', admin.access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('msg', 'Product Successfully Deleted')

            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('delete product failed (no access token)', (done) => {
        request(app)
        .delete('/products/24')
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Authentication Failed')

            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('delete product failed (costumer access token)', (done) => {
        request(app)
        .delete('/products/31')
        .set('access_token', costumer.access_token)
        .then(response => {
            const { status, body } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Not Authorized')

            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('delete product failed (product not found)', (done) => {
        request(app)
        .delete('/products/1000')
        .set('access_token', admin.access_token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(404)
            expect(body).toHaveProperty('msg', 'Product is not found')

            done()
        })
        .catch(err => {
            done(err)
        })
    })
})
