const request = require('supertest')
const app = require('../app')
const {signToken} = require('../helpers/jwt')
const { sequelize, Product } = require('../models')
const { queryInterface } = sequelize

afterAll(done => {
    console.log('running bulk delete products table after testing');
    queryInterface.bulkDelete('Products')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

let access_token_admin;
let access_token_customer;
let idProduct = 0

//fetch product
describe('Test Endpoint GET /products', () => {
    beforeAll(done => {
        let product = {
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: 190000,
            stock: 10
        }   
        Product.create(product)
        .then(_ => {
            console.log('product created');
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    
    it ('testing fetch data product is successful', (done) => {
        request(app)
        .get('/products')
        .then(response => {
            const { status, body } = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('product', expect.any(Array))
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

//create product
describe('Test Endpoint POST /products', () => {
   beforeAll(() => {
       const admin = {
           email: 'admin@mail.com',
           password: '123456',
           role: 'admin'
       }
       access_token_admin = signToken(admin)
   })

    it ('testing post product is successfull', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send({
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: 190000,
            stock: 10
        })
        .then(response => {
            const { body, status } = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'T-shirt Bon Jovi')
            expect(body).toHaveProperty('image_url', 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1')
            expect(body).toHaveProperty('price', 190000)
            expect(body).toHaveProperty('stock', 10)
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it ('testing post product if the name is empty string', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send({
            name: '',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: 190000,
            stock: 10
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Please fill the empty column')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it ('testing post product if the url_image is empty string', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send({
            name: 'T-shirt Bon Jovi',
            image_url: '',
            price: 190000,
            stock: 10
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Please fill the empty column')
            done()
        })
        .catch(err => {
            done(err)
        })
    })
    
    it ('testing post product if the price is empty string', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send({
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: '',
            stock: 10
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Please fill the empty column')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it ('testing post product if the price is not integer', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send({
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: 1.5,
            stock: 10
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Price is must be in integer')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it ('testing post product if the price is not absolut number', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send({
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: -5,
            stock: 10
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Price is must be an absolut number')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it ('testing post product if the stock is empty string', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send({
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: 190000,
            stock: ''
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Please fill the empty column')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it ('testing post product if the stock is not integer', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send({
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: 190000,
            stock: 0.5
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Stock is must be in integer')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it ('testing post product if the stock is not absolut number', (done) => {
        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send({
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: 190000,
            stock: -4
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Stock is must be an absolut number')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

})

//edit product
describe('Test Endpoint PUT /products', () => {

    beforeAll(done => {
        const admin = {
            email: 'admin@mail.com',
            password: '123456',
            role: 'admin'
        }
        access_token_admin = signToken(admin)

        let product = {
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: 190000,
            stock: 10
        }   
        Product.create(product)
        .then(({id}) => {
            idProduct = id
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it ('testing put product is successfull', (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .send({
            name: 'T-Shirt Guns & Roses',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/614fWCfUvTL._AC_UL1001_.jpg',
            price: 150000,
            stock: 4
        })
        .then(response => {
            const { body, status } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'The product has been updated')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it ('testing put product if the name is empty string', (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .send({
            name: '',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/614fWCfUvTL._AC_UL1001_.jpg',
            price: 150000,
            stock: 4
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Please fill the empty column')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it ('testing put product if the url_image is empty string', (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .send({
            name: 'T-Shirt Guns & Roses',
            image_url: '',
            price: 150000,
            stock: 4
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Please fill the empty column')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })
    
    it ('testing put product if the price is empty string', (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .send({
            name: 'T-Shirt Guns & Roses',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/614fWCfUvTL._AC_UL1001_.jpg',
            price: '',
            stock: 4
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Please fill the empty column')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it ('testing put product if the price is not integer', (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .send({
            name: 'T-Shirt Guns & Roses',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/614fWCfUvTL._AC_UL1001_.jpg',
            price: 10.5,
            stock: 4
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Price is must be in integer')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it ('testing put product if the price is not absolut number', (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .send({
            name: 'T-Shirt Guns & Roses',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/614fWCfUvTL._AC_UL1001_.jpg',
            price: -150000,
            stock: 4
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Price is must be an absolut number')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it ('testing put product if the stock is empty string', (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .send({
            name: 'T-Shirt Guns & Roses',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/614fWCfUvTL._AC_UL1001_.jpg',
            price: 150000,
            stock: ''
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Please fill the empty column')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it ('testing put product if the stock is not integer', (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .send({
            name: 'T-Shirt Guns & Roses',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/614fWCfUvTL._AC_UL1001_.jpg',
            price: 150000,
            stock: 17.5
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Stock is must be in integer')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it ('testing put product if the stock is not absolut number', (done) => {
        request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .send({
            name: 'T-Shirt Guns & Roses',
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/614fWCfUvTL._AC_UL1001_.jpg',
            price: 150000,
            stock: -10
        })
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Stock is must be an absolut number')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })
})

//delete product
describe('Test Endpoint DELETE /products', () => {

    beforeAll(done => {
        const admin = {
            email: 'admin@mail.com',
            password: '123456',
            role: 'admin'
        }
        access_token_admin = signToken(admin)

        let product = {
            name: 'T-shirt Bon Jovi',
            image_url: 'https://cf.shopee.co.id/file/9daead4b913b3d7a84c23a636d6dbfa1',
            price: 190000,
            stock: 10
        }   
        Product.create(product)
        .then(({id}) => {
            idProduct = id
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it ('testing delete product is successfull', (done) => {
        request(app)
        .delete(`/products/${idProduct}`)
        .set('access_token', access_token_admin)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'The product has been deleted')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })
})