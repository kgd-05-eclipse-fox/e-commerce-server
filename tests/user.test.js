const request = require('supertest')
const express = require('express')
const app = require('../app')
const { sequelize } = require('../models')

afterAll((done) => {
	sequelize.queryInterface.bulkDelete('Users')
	.then(response => {
		done()
	})
	.catch(err => {
		done(err)
	})
})

describe('POST END POINT POST /register', () => {
	it('test register success', (done) => {
		request(app)
		.post('/register')
		.send({email: 'admin@mail.com', password: '1234', role: 'admin'})
		.then(response => {
			let { body, status } = response
			expect(status).toBe(201)
			expect(body).toHaveProperty('id', expect.any(Number))
			expect(body).toHaveProperty('email', 'admin@mail.com')
			done()
		})
	})
	it('test email already exist', (done) => {
		request(app)
		.post('/register')
		.send({email: 'admin@mail.com', password: '1234', role: 'admin'})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Email already registered')
			done()
		})
	})
	it('test email when undefined', (done) => {
		request(app)
		.post('/register')
		.send({email: '', password: '1234', role: 'admin'})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Email cannot be blank,Inputed email is even not an Email')
			done()
		})
	})
	it('Test validate if type of email', (done) => {
		request(app)
		.post('/register')
		.send({email: 'adminmail.com', password: '1234', role: 'admin'})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Inputed email is even not an Email')
			done()
		})
	})
	it('Test if password is undefined', done => {
		request(app)
		.post('/register')
		.send({email: 'admin@mail.com', password: '', role: 'admin'})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Password cannot be blank,Password should be at least 4 characters')
			done()
		})
	})
	it('Test if password less than 4 characters', done => {
		request(app)
		.post('/register')
		.send({email: 'admin@mail.com', password: '123', role: 'admin'})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(400)
			expect(body).toHaveProperty('msg', 'Password should be at least 4 characters')
			done()
		})
	})
})

describe('Post end point POST /login', () => {
	it('Test admin login', done => {
		request(app)
		.post('/login')
		.send({email: 'admin@mail.com', password: '1234'})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(200)
			expect(body).toHaveProperty('token')
			done()
		})
	})
	it('Test when admin password wrong', done => {
		request(app)
		.post('/login')
		.send({email: 'admin@mail.com', password: '12345'})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(401)
			expect(body).toHaveProperty('error', 'Wrong Email or Password')
			done()
		})
	})
	it('Test when admin email is wrong', done => {
		request(app)
		.post('/login')
		.send({email: 'adm@mail.com', password: '1234'})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(401)
			expect(body).toHaveProperty('error', 'Wrong Email or Password')
			done()
		})
	})
	it('Test when email and password is doesnt inputted', done => {
		request(app)
		.post('/login')
		.send({email: '', password: ''})
		.then(response => {
			const { body, status } = response
			expect(status).toBe(401)
			expect(body).toHaveProperty('error', 'Please fill up all the fields')
			done()
		})
	})
})