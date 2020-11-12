const request = require('supertest')
const express = require('express')
const app = require('../app')
const { sequelize } = require('../models')
const { createToken } = require('../helpers/jwt')
const { Product } = require('../models')
const { User } = require('../models')
const { response } = require('express')

let localStorage = {}
let testId = 0

beforeAll( done => {
	let payload = {
		email: 'admin@mail.com',
		role: 'admin'
	}
	let user = {
			email: 'user@mail.com',
			role: 'user'
	}
	localStorage.token = createToken(payload)
	localStorage.user_token = createToken(user)
	const admin = {
		email: 'admin@mail.com',
		password: '1234',
		role: 'admin'
	}
	User.create(admin)
	User.create({
		email: 'user@mail.com',
		password: '1234',
		role: 'user'
	})
	const create = {
		name: 'Among Us Impostor',
		image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
		price: 1500000,
		stock: 10
	}
	Product.create(create)
	.then(response => {
		testId = response.dataValues.id
		done()
	})
})

afterAll( done => {
	sequelize.queryInterface.bulkDelete('Products', null, {})
		.then( _ => {
			done()
		})
		.catch(err => {
			done()
		})
	sequelize.queryInterface.bulkDelete('Users', null, {})
		.then(_ => {
			done()
		})
		.catch(err => {
			done()
		})
})

describe('POST CREATE END POINT /products', () => {
	it('Success create product', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: 'Among Us Impostor',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: 1500000,
			stock: 10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(201)
			expect(body).toHaveProperty('id', expect.any(Number))
			expect(body).toHaveProperty('name', 'Among Us Impostor')
			expect(body).toHaveProperty('image_url', 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png')
			expect(body).toHaveProperty('price', 1500000)
			expect(body).toHaveProperty('stock', 10)
			done()
		})
		.catch(err => {
			done(err)
		}) 
	})
	it('Create Product without token', done => {
		request(app)
		.post('/products')
		.send({
			name: 'Among Us Impostor',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: 1500000,
			stock: 10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(401)
			expect(body).toHaveProperty('msg', 'Authentication Failed.')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create Product with User Token', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.user_token)
		.send({
			name: 'Among Us Impostor',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: 1500000,
			stock: 10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(401)
			expect(body).toHaveProperty('msg', 'Authentication Failed.')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create product with empty product name', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: '',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: 1500000,
			stock: 10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Name cannot be blank')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create product with empty URL', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: 'Impostor',
			image_url: '',
			price: 1500000,
			stock: 10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'URL cannot be blank,Should be an URL')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create product with wrong URL type', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: 'Impostor',
			image_url: 'urlurl',
			price: 1500000,
			stock: 10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Should be an URL')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create product with empty price', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: 'Impostor',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: '',
			stock: 10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Price cannot be blank,Price should be number')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create product with minus price', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: 'Impostor',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: -100,
			stock: 10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Price cannot be minus')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create product with string price', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: 'Impostor',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: 'price',
			stock: 10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Price should be number')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create product with empty stock', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: 'Impostor',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: 10000,
			stock: ''
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Stock cannot be blank,Stock should be number')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create product with minus stock', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: 'Impostor',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: 10000,
			stock: -10
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Stock cannot be minus')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Create product with string stock', done => {
		request(app)
		.post('/products')
		.set('token', localStorage.token)
		.send({
			name: 'Impostor',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png',
			price: 10000,
			stock: 'Stock'
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Stock should be number')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
})

describe('POST UPDATE END POINT /products/:id', () => {
	it('Success Update Product', done => {
		request(app)
		.put(`/products/${+testId}`)
		.set('token', localStorage.token)
		.send({
			name: 'Among Us: Mini Crewmate Pocket Tee (Adult, Black)',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/pocketcrew_black_2048x2048.png',
			price: 200000,
			stock: 50
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(200)
			expect(body).toHaveProperty('msg', 'Product has been updated.')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Update Product with User token', done => {
		request(app)
		.put(`/products/${+testId}`)
		.set('token', localStorage.user_token)
		.send({
			name: 'Among Us: Mini Crewmate Pocket Tee (Adult, Black)',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/pocketcrew_black_2048x2048.png',
			price: 200000,
			stock: 50
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(401)
			expect(body).toHaveProperty('msg', 'Authentication Failed.')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Update Product with empty name', done => {
		request(app)
		.put(`/products/${+testId}`)
		.set('token', localStorage.token)
		.send({
			name: '',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/pocketcrew_black_2048x2048.png',
			price: 200000,
			stock: 50
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Name cannot be blank')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Update Product with empty URL', done => {
		request(app)
		.put(`/products/${+testId}`)
		.set('token', localStorage.token)
		.send({
			name: 'Among Us: Mini Crewmate Pocket Tee (Adult, Black)',
			image_url: '',
			price: 200000,
			stock: 50
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'URL cannot be blank,Should be an URL')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Update Product with empty price', done => {
		request(app)
		.put(`/products/${+testId}`)
		.set('token', localStorage.token)
		.send({
			name: 'Among Us: Mini Crewmate Pocket Tee (Adult, Black)',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/pocketcrew_black_2048x2048.png',
			price: '',
			stock: 50
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Price cannot be blank,Price should be number')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Update Product with minus price', done => {
		request(app)
		.put(`/products/${+testId}`)
		.set('token', localStorage.token)
		.send({
			name: 'Among Us: Mini Crewmate Pocket Tee (Adult, Black)',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/pocketcrew_black_2048x2048.png',
			price: -6000,
			stock: 50
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Price cannot be minus')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Update Product with empty stock', done => {
		request(app)
		.put(`/products/${+testId}`)
		.set('token', localStorage.token)
		.send({
			name: 'Among Us: Mini Crewmate Pocket Tee (Adult, Black)',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/pocketcrew_black_2048x2048.png',
			price: 60000,
			stock: ''
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Stock cannot be blank,Stock should be number')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Update Product with minus stock', done => {
		request(app)
		.put(`/products/${+testId}`)
		.set('token', localStorage.token)
		.send({
			name: 'Among Us: Mini Crewmate Pocket Tee (Adult, Black)',
			image_url: 'https://cdn.shopify.com/s/files/1/0348/4293/5355/products/pocketcrew_black_2048x2048.png',
			price: 60000,
			stock: -888
		})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Stock cannot be minus')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
})

describe('POST DELETE END POINT /products', () => {
	it('Test delete product success', done => {
		request(app)
		.delete(`/products/${testId}`)
		.set('token', localStorage.token)
		.then(response => {
			const { body, status } = response
			expect(status).toBe(200)
			expect(body).toHaveProperty('msg', 'Product deleted.')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Test delete product with no token', done => {
		request(app)
		.delete(`/products/${testId}`)
		.then(response => {
			const { body, status } = response
			expect(status).toBe(401)
			expect(body).toHaveProperty('msg', 'Authentication Failed.')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
	it('Test delete product with User token', done => {
		request(app)
		.delete(`/products/${testId}`)
		.set('token', localStorage.user_token)
		.then(response => {
			const { body, status } = response
			expect(status).toBe(401)
			expect(body).toHaveProperty('msg', 'Authentication Failed.')
			done()
		})
		.catch(err => {
			done(err)
		})
	})
})

describe('GET ALL PRODUCTS END POINT /products', () => {
	it('Get all product', done => {
		request(app)
		.get('/products')
		.set('token', localStorage.user_token)
		.then(response => {
			const { body, status } = response
			expect(status).toBe(200)
			expect(body).toEqual(expect.any(Array))
			done()
		})
		.catch(err => {
			done(err)
		})
	})
})