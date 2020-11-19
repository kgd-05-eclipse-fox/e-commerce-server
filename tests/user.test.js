const request = require('supertest')
const { queryInterface } = require('../models').sequelize
const app = require('../app.js')

let userData = {
	email: 'admin@gmail.com',
	password: 'pass1234',
	role: 'admin',
}

describe('User Router', () => {
	afterAll((done) => {
		queryInterface
			.bulkDelete('Users')
			.then(() => done())
			.catch(done)
	})

	describe('register a user', () => {
		describe('success process', () => {
			test('status code 201 with keys id and email ', (done) => {
				request(app)
					.post('/register')
					.send(userData)
					.then((response) => {
						expect(response.status).toBe(201)
						expect(response.body).toHaveProperty('access_token', expect.any(String))
						done()
					})
					.catch((err) => {
						done(err)
					});
			})
		})

		describe('error process', () => {
			test('status code 400 because of invalid email format', (done) => {
				const invalidEmail = { ...userData, email: 'gmail.com' }
				request(app)
					.post('/register')
					.send(invalidEmail)
					.then((response) => {
						let errors = ['Invalid Email Format!']
						expect(response.status).toBe(400)
						expect(response.body).toHaveProperty('errors',expect.any(Array))
						expect(response.body).toHaveProperty('errors', errors)
						done()
					})
					.catch((err) => {
						done(err)						
					});
			})

			test('status code 400 because of email unique validation', (done) => {
				request(app)
					.post('/register')
					.send(userData)
					.then((response) => {
						expect(response.status).toBe(400)
						expect(response.body).toHaveProperty('errors', expect.any(Array))
						expect(response.body.errors).toContain('Email already registered')
						done()
					})
					.catch((err) => {
						done(err)
					});
			})

			test('status code 400 because of empty email validation', (done) => {
				const emptyEmail = { ...userData, email: '' }
				request(app)
					.post('/register')
					.send(emptyEmail)
					.then((response) => {
						expect(response.status).toBe(400)
						expect(response.body).toHaveProperty('errors', expect.any(Array))
						expect(response.body.errors).toContain('Please enter valid email address')
						done()
					})
					.catch((err) => {
						done(err)
					});
			})

			test('status code 400 because of null email validation', (done) => {
				const nullEmail = { ...userData, email: null }
				request(app)
					.post('/register')
					.send(nullEmail)
					.then((response) => {
						expect(response.status).toBe(400)
						expect(response.body).toHaveProperty('errors', expect.any(Array))
						expect(response.body.errors).toContain('Please enter valid email address')
						done()
					}).catch((err) => {
						done(err)
					});
			})

			test('status code 400 because of empty password validation', (done) => {
				const emptyPassword = { ...userData, password: '' }
				request(app)
					.post('/register')
					.send(emptyPassword)
					.end((err, response) => {
						if (err) done(err)
						else {
							expect(response.status).toBe(400)
							expect(response.body).toHaveProperty(
								'errors',
								expect.any(Array)
							)
							expect(response.body.errors).toContain(
								'Email already registered'
							)

							return done()
						}
					})
			})
			test('status code 400 because of null password validation', (done) => {
				const nullPassword = { ...userData }
				delete nullPassword.password
				request(app)
					.post('/register')
					.send(nullPassword)
					.end((err, response) => {
						if (err) done(err)
						else {
							expect(response.status).toBe(400)
							expect(response.body).toHaveProperty(
								'errors',
								expect.any(Array)
							)
							expect(response.body.errors).toContain(
								'Email already registered'
							)

							return done()
						}
					})
			})
			test('status code 400 because of password min 6 char max 15 char validation', (done) => {
				const falsePassword = { email: 'error@mail.com', password: 'false' }
				request(app)
					.post('/register')
					.send(falsePassword)
					.end((err, response) => {
						if (err) done(err)
						else {
							expect(response.status).toBe(400)
							expect(response.body).toHaveProperty(
								'errors',
								expect.any(Array)
							)
							expect(response.body.errors).toContain(
								'Password length must be between 6 - 15 characters'
							)
							return done()
						}
					})
			})
		})
	})

	describe('login user', () => {
		describe('success response', () => {
			test('return 200 with key access token', (done) => {
				request(app)
					.post('/login')
					.send(userData)
					.end((err, response) => {
						if (err) done(err)
						else {
							expect(response.status).toBe(200)
							expect(response.body).toHaveProperty(
								'access_token',
								expect.any(String)
							)

							return done()
						}
					})
			})
		})
		describe('error response', () => {
			test('status 401 because wrong password', (done) => {
				let wrongPassword = { ...userData, password: 'failed' }
				request(app)
					.post('/login')
					.send(wrongPassword)
					.end((err, response) => {
						if (err) done(err)
						else {
							expect(response.status).toBe(400)
							expect(response.body).toHaveProperty(
								'errors',
								expect.any(Array)
							)
							expect(response.body.errors).toContain(
								'invalid email or password'
							)

							return done()
						}
					})
			})
			test('status 401 because wrong email', (done) => {
				let wrondEmail = { ...userData, email: 'new@mail.com' }
				request(app)
					.post('/login')
					.send(wrondEmail)
					.end((err, response) => {
						if (err) done(err)
						else {
							expect(response.status).toBe(400)
							expect(response.body).toHaveProperty(
								'errors',
								expect.any(Array)
							)
							expect(response.body.errors).toContain(
								'invalid email or password'
							)
							return done()
						}
					})
			})
		})
	})
})
