const request = require('supertest')
const app = require('../app')
const { getToken } = require('../helpers/jwt')
const {sequelize, Product} = require('../models')
const {queryInterface} = sequelize

let tokenAdmin
let tokenCustomer

beforeAll((done) => {
    const payloadAdmin = {
        id: 1,
        email: "admin@mail.com",
        role: 'admin'
    }
    tokenAdmin = getToken(payloadAdmin)

    const payloadCustomer = {
        id: 2,
        email: "customer@mail.com",
        role: "customer"
    }
    tokenCustomer = getToken(payloadCustomer)
    done()
})


afterAll((done) => {
    queryInterface.bulkDelete("Products")
    .then( data => {
        console.log("Berhasil hapus data")
        done()
    })
    .catch(err => {
        console.log(err)
        done(err)
    })
})

describe('Test endpoint create product', () => {
    it('create product success', (done) => {
        request(app)
        .post('/product/create')
        .set('access_token', tokenAdmin)
        .send({name: 'Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Shoes')
            expect(body).toHaveProperty('image_url', 'http://arah.in/shoes-ortus')
            expect(body).toHaveProperty('price', 300000)
            expect(body).toHaveProperty('stock', 20)
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('create product but dont have token', (done) => {
        request(app)
        .post('/product/create')
        .send({name: 'Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'Please login first')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('create product but role is not an admin', (done) => {
        request(app)
        .post('/product/create')
        .set('access_token', tokenCustomer)
        .send({name: 'Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'You dont have permissions')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('create product but the field require is empty', (done) => {
        request(app)
        .post('/product/create')
        .set('access_token', tokenAdmin)
        .send({name: '', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Field cannot be empty')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })


    it('create product but stock is minus', (done) => {
        request(app)
        .post('/product/create')
        .set('access_token', tokenAdmin)
        .send({name: 'Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: -10})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Stock must be greater than 0')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('create product but price is minus', (done) => {
        request(app)
        .post('/product/create')
        .set('access_token', tokenAdmin)
        .send({name: 'Shoes', image_url: 'http://arah.in/shoes-ortus', price: -300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Price must be greater than 0')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('create product but wrong data type', (done) => {
        request(app)
        .post('/product/create')
        .set('access_token', tokenAdmin)
        .send({name: 'Shoes', image_url: 'http://arah.in/shoes-ortus', price: '300000', stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Data type is wrong')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

})

describe('Test endpoint update product', () => {
    let productId
    beforeAll((done) => {
        let payloadProduct = {
            name: 'Adidas Neo',
            image_url: 'http://arah.in/adidas-neo',
            price: 250000,
            stock: 10
        }
        Product.create(payloadProduct)
        .then( data => {
            productId = data.id
            done()
        })
        .catch( err => {
            console.log(err)
            done(err)
        })
    })
    it('update product success', (done) => {
        request(app)
        .put(`/product/update/${productId}`)
        .set('access_token', tokenAdmin)
        .send({name: 'Adidas Predator', image_url: 'http://arah.in/adidas-neo', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Adidas Predator')
            expect(body).toHaveProperty('image_url', 'http://arah.in/adidas-neo')
            expect(body).toHaveProperty('price', 300000)
            expect(body).toHaveProperty('stock', 20)
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('update product but dont have token', (done) => {
        request(app)
        .put(`/product/update/${productId}`)
        .send({name: 'Adidas Predator', image_url: 'http://arah.in/adidas-neo', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'Please login first')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('update product but role is not an admin', (done) => {
        request(app)
        .put(`/product/update/${productId}`)
        .set('access_token', tokenCustomer)
        .send({name: 'Adidas Predator', image_url: 'http://arah.in/adidas-neo', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'You dont have permissions')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('update product but stock is minus', (done) => {
        request(app)
        .put(`/product/update/${productId}`)
        .set('access_token', tokenAdmin)
        .send({name: 'Shoes', image_url: 'http://arah.in/adidas-neo', price: 300000, stock: -10})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Stock must be greater than 0')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('update product but wrong data type', (done) => {
        request(app)
        .put(`/product/update/${productId}`)
        .set('access_token', tokenAdmin)
        .send({name: 'Shoes', image_url: 'http://arah.in/adidas-neo', price: 300000, stock: '20'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Data type is wrong')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('update product but price is minus', (done) => {
        request(app)
        .put(`/product/update/${productId}`)
        .set('access_token', tokenAdmin)
        .send({name: 'Shoes', image_url: 'http://arah.in/adidas-neo', price: -300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Price must be greater than 0')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
})

describe('Test endpoint delete product', () => {
    let productId
    beforeAll((done) => {
        let payloadProduct = {
            name: 'Nike Air Jordan',
            image_url: 'http://arah.in/nike-air',
            price: 300000,
            stock: 10
        }
        Product.create(payloadProduct)
        .then( data => {
            productId = data.id
            done()
        })
        .catch( err => {
            console.log(err)
            done(err)
        })
    })
    it('delete product success', (done) => {
        request(app)
        .delete(`/product/delete/${productId}`)
        .set('access_token', tokenAdmin)
        .send({name: 'Nike Air Jordan', image_url: 'http://arah.in/nike-air', price: 300000, stock: 10})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('message', 'Success delete product')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('delete product but dont have token', (done) => {
        request(app)
        .delete('/product/delete')
        .send({name: 'Nike Air Jordan', image_url: 'http://arah.in/nike-air', price: 300000, stock: 10})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'Please login first')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('delete product but role is not an admin', (done) => {
        request(app)
        .delete('/product/delete')
        .set('access_token', tokenCustomer)
        .send({name: 'Nike Air Jordan', image_url: 'http://arah.in/nike-air', price: 300000, stock: 10})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'You dont have permissions')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
})