const request = require('supertest')
const app = require('../app')
const { getToken } = require('../helpers/jwt')

let tokenAdmin
let tokenCustomer

beforeAll((done) => {
    const payloadAdmin = {
        id: 1,
        email: "admin@mail.com"
    }
    tokenAdmin = getToken(payloadAdmin)

    const payloadCustomer = {
        id: 9,
        email: "farhan@mail.com"
    }
    tokenCustomer = getToken(payloadCustomer)
})


describe('Test endpoint product', () => {
    it('create product success', (done) => {
        request(app)
        .post('/product/create')
        .set('access_token', tokenAdmin)
        .send({name: 'Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('image_url', expect.any(String))
            expect(body).toHaveProperty('price', expect.any(Number))
            expect(body).toHaveProperty('stock', expect.any(Number))
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
            expect(body).toHaveProperty('message', 'You must be login to create product')
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
            expect(body).toHaveProperty('message', 'You dont have permissions to create product')
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

    it('update product success', (done) => {
        request(app)
        .post('/product/update')
        .set('access_token', tokenAdmin)
        .send({name: 'Futsal Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('image_url', expect.any(String))
            expect(body).toHaveProperty('price', expect.any(Number))
            expect(body).toHaveProperty('stock', expect.any(Number))
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('update product but dont have token', (done) => {
        request(app)
        .post('/product/update')
        .send({name: 'Futsal Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'You must be login to update the product')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('update product but role is not an admin', (done) => {
        request(app)
        .post('/product/update')
        .set('access_token', tokenCustomer)
        .send({name: 'Futsal Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'You dont have permissions to update product')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('update product but stock is minus', (done) => {
        request(app)
        .post('/product/update')
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

    it('update product but wrong data type', (done) => {
        request(app)
        .post('/product/update')
        .set('access_token', tokenAdmin)
        .send({name: 'Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: '20'})
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
        .post('/product/update')
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

    it('delete product success', (done) => {
        request(app)
        .post('/product/delete')
        .set('access_token', tokenAdmin)
        .send({name: 'Futsal Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
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
        .post('/product/delete')
        .send({name: 'Futsal Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'You must be login to delete the product')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('delete product but role is not an admin', (done) => {
        request(app)
        .post('/product/delete')
        .set('access_token', tokenCustomer)
        .send({name: 'Futsal Shoes', image_url: 'http://arah.in/shoes-ortus', price: 300000, stock: 20})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'You dont have permissions to delete product')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
})