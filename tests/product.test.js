require('dotenv').config()
const request = require('supertest')
const app = require('../app.js')
const { jwtSign } = require('../helpers/jwt')

const { sequelize } = require('../models/')
const { queryInterface } = sequelize


let localStorage = {}
let testId = 0

beforeAll( done => {
    let payload = {
        email: 'admin@mail.com',
        role: 'admin'
    }
    let random = {
        email: 'user@user.com',
        role: 'user'
    }
    localStorage.access_token = jwtSign(payload)
    localStorage.random_access_token = jwtSign(random)
    done()
})

afterAll( done => {
    queryInterface.bulkDelete('Products', null, {})
        .then( _ => {
            done()
        })
        .catch(err => {
            done()
        })
})

// * Create Product
describe('Test POST /product OR Create', () => {
    it('Success Create Product', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 20000000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', 'Apple iPhone 12 Pro Max')
                expect(body).toHaveProperty('image_url', 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90')
                expect(body).toHaveProperty('price', 20000000)
                expect(body).toHaveProperty('stock', 5)
                testId = body.id
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create Product without access token', done => {
        request(app)
            .post('/product')
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 20000000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create Product except admin access token', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.random_access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 20000000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create with Empty Product Name', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.access_token)
            .send({ 
                name: '',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 20000000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Name cannot be empty'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create with Empty Product Image URL', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: '',
                price: 20000000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.arrayContaining(['Image URL cannot be empty']))
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create with Invalid Product Image URL', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'iphonepng',
                price: 20000000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Input should be an URL'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create with Empty Product Price', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: '',
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.arrayContaining(['Price cannot be empty']))
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create with Empty Product Stock', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 20000000,
                stock: ''
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.arrayContaining(['Stock cannot be empty']))
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create Product Stock with value minus', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 20000000,
                stock: -5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Stock cannot be minus'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create Product Price with value minus', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: -200000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Price cannot be minus'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Create Product Price with incorrect data type', done => {
        request(app)
            .post('/product')
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 'twenty million rupiah',
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Price should be a number'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// * Find All Product
describe('Test GET /product OR Show All Products', () => {
    it('Show All Products', done => {
        request(app)
            .get('/product')
            .set('access_token', localStorage.access_token)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('products', expect.any(Array))
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// * Update Product
describe('Test PUT /product/:id OR Update', () => {
    it('Success Update Product', done => {
        request(app)
            .put('/product/' + testId)
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Mini',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 15000000,
                stock: 10
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Product successfully updated')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Update Product without access token', done => {
        request(app)
            .put('/product/' + testId)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 20000000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Update Product except admin access token', done => {
        request(app)
            .put('/product/' + testId)
            .set('access_token', localStorage.random_access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 20000000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Update Product Stock with value minus', done => {
        request(app)
            .put('/product/' + testId)
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 20000000,
                stock: -5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Stock cannot be minus'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Update price with value minus', done => {
        request(app)
            .put('/product/' + testId)
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: -200000,
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Price cannot be minus'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Update price with incorrect data type', done => {
        request(app)
            .put('/product/' + testId)
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Pro Max',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 'twenty million rupiah',
                stock: 5
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Price should be a number'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Update Product with random id (not found)', done => {
        request(app)
            .put('/product/' + 2002)
            .set('access_token', localStorage.access_token)
            .send({ 
                name: 'Apple iPhone 12 Mini',
                image_url: 'https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90',
                price: 15000000,
                stock: 10
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Product not found')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// * Delete Product
describe('Test DELETE /product/:id OR Delete', () => {
    it('Delete Product without access token', done => {
        request(app)
            .delete('/product/' + testId)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Delete Product except admin access token', done => {
        request(app)
            .delete('/product/' + testId)
            .set('access_token', localStorage.random_access_token)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Unauthorized')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Delete Product with random id (not found)', done => {
        request(app)
            .delete('/product/' + 2002)
            .set('access_token', localStorage.access_token)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Product not found')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Success Delete', done => {
        request(app)
            .delete('/product/' + testId)
            .set('access_token', localStorage.access_token)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Product has been deleted')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})