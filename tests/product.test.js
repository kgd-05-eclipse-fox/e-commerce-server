const request = require('supertest')
const app = require('../app')
const { Product } = require('../models')
const { generate } = require('../helpers/jwt')

let user = {
	email: 'admin@gmail.com',
	password: 'pass1234',
	role: 'admin',
}

let access_token = generate(user)

beforeAll(() => {
	Product.truncate({ restartIdentity: true })
		.then((res) => {
			console.log('reset')
		})
		.catch((err) => {
			console.log(err)
		})
})

describe('POST /', () => {
	describe('Success 201, Product created', () => {
		it(' should success and create new object of product', async () => {
			let product = {
				name: 'ps5',
				image_url: 'https://www.google.com/',
				price: 150000,
				stock: 10,
			}

			const res = await request(app)
				.post('/products')
				.send(product)
				.set('access_token', access_token)
			expect(res.status).toBe(201)
			expect(typeof res.body).toEqual('object')
			expect(res.body).not.toStrictEqual({
				name: expect.any(String),
				image_url: expect.any(String),
				price: expect.any(Number),
				stock: expect.any(Number),
			})
		})
	})
})

describe('GET /', () => {
	describe('Success 200, List all products', () => {
		it(' should success and retrieve list of object of products', async () => {
			const res = await request(app)
				.get('/products')
				.set('access_token', access_token)
			expect(res.status).toBe(200)
			expect(typeof res.body).toEqual('object')
			expect(Array.isArray(res.body)).toBe(true)
		})
	})

	describe('Error 400, Invalid access_token', () => {
		it(' should error with description invalid access_token', async () => {
			const res = await request(app).get('/products/')
			expect(res.status).toBe(400)
			expect(res.body.errors[0]).toEqual('invalid token')
		})
	})
})

describe('GET /:id', () => {
	describe('Success 200, Fetch a product', () => {
		it(' should success and fetch a single product', async () => {
			let id = 1

			const res = await request(app)
				.get(`/products/${id}`)
				.set('access_token', access_token)
			expect(res.status).toBe(200)
			expect(typeof res.body).toEqual('object')
		})
	})

	describe('Error 400, Invalid access_token', () => {
		it(' should error with description invalid access_token', async () => {
			let id = 1
			const res = await request(app).get(`/products/${id}`)
			expect(res.status).toBe(400)
			expect(res.body.errors[0]).toEqual('invalid token')
		})
	})
})

describe('PUT /', () => {
	let product = {
		name: 'Diamond',
		image_url: 'https://www.google.com/',
		price: 300000,
		stock: 50,
	}

	describe('Success 200, Product Updated', () => {
		it(' should success and retrieve updated product', async () => {
			let id = 1
			const res = await request(app)
				.put(`/products/${id}`)
				.send(product)
				.set('access_token', access_token)
			expect(res.status).toBe(200)
			expect(typeof res.body).toEqual('object')
		})
	})

	describe('Error 400, Invalid access_token', () => {
		it(' should error with description invalid access_token', async () => {
			let id = 1
			const res = await request(app).put(`/products/${id}`).send(product)
			expect(res.status).toBe(400)
			expect(res.body.errors[0]).toEqual('invalid token')
		})
	})
})

describe('DELETE /:id', () => {
	describe('Success 200, Product Deleted', () => {
		it(' should success and retrieve an object of deleted product', async () => {
			let id = 1
			const res = await request(app)
				.delete(`/products/${id}`)
				.set('access_token', access_token)
			expect(res.status).toBe(200)
			expect(typeof res.body).toEqual('object')
		})
	})

	describe('Error 400, Invalid access_token', () => {
		it(' should error with description invalid access_token', async () => {
			let id = 1
			const res = await request(app).delete(`/products/${id}`)
			expect(res.status).toBe(400)
			expect(res.body.errors[0]).toEqual('invalid token')
		})
	})
})
