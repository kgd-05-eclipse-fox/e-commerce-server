const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize 

const auth = {}

beforeAll(done => {
    const payload = {
        id: 1,
        username: 'admin',
        email: 'admin@mail.com',
        role: 'admin'
    }
    auth.access_token = signToken(payload)
    auth.user = payload
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
        .set('access_token', auth.access_token)
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
            console.log(err)
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
            console.log(err)
            done(err)
        })
    })

    it('add product failed (costumer access_token)', (done) => {
        
    })
})
