require('dotenv').config()
const request = require('supertest')
const app = require('../app.js')
const { User } = require('../models/')

beforeAll( done => {
    const example = {
        email: 'user@user.com',
        password: 'user'
    }
    User.create(example)
        .then(data => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

afterAll( done => {
    User.destroy({ where: { role: 'customer' }})
        .then( _ => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

// * Admin Login
describe('Test POST /cms-admin for Admin Login', () => {
    it('Success Admin Login', done => {
        request(app)
            .post('/cms-admin')
            .send({ email: 'admin@mail.com', password: '1234' })
            .then(response => {
                const { body, status } = response
                expect(body).toHaveProperty('access_token')
                expect(status).toBe(200)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Wrong Admin Password', done => { // Email ada, password salah
        request(app)
            .post('/cms-admin')
            .send({ email: 'admin@mail.com', password: 'admin' })
            .then(response => {
                const { body, status } = response
                expect(body).toHaveProperty('message', 'Wrong email or password')
                expect(status).toBe(400)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Wrong Admin Email', done => { // Email tidak ada di db
        request(app)
            .post('/cms-admin')
            .send({ email: 'adm0n@mail.com', password: 'admon' })
            .then(response => {
                const { body, status } = response
                expect(body).not.toHaveProperty('access_token')
                expect(body).toHaveProperty('message', 'Wrong email or password')
                expect(status).toBe(400)
                expect(status).not.toBe(200)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Login Admin with empty field', done => { // Tidak memasukan email dan atau password
        request(app)
            .post('/cms-admin')
            .send({ email: '', password: '' })
            .then(response => {
                const { body } = response
                expect(body).toHaveProperty('message', 'Please complete all form')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// * User Register
describe('Test POST /register for User Register', () => {
    it('Success User Register', done => {
        request(app)
            .post('/register')
            .send({
                email: 'anotheruser@user.com',
                password: 'user'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('email', 'anotheruser@user.com')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Register with Used User Email', done => {
        request(app)
            .post('/register')
            .send({
                email: 'user@user.com',
                password: 'user'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Email is already used'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Register with Empty User Email', done => {
        request(app)
            .post('/register')
            .send({
                email: '',
                password: 'user'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.arrayContaining(['Email cannot be empty']))
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Register with Invalid User Input Email', done => {
        request(app)
            .post('/register')
            .send({
                email: 'guestatmail.com',
                password: 'userpassword'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Input should be an email'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Register with Empty User Password', done => {
        request(app)
            .post('/register')
            .send({
                email: 'guest@mail.com',
                password: ''
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.arrayContaining(['Password cannot be empty']))
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Register User Password with below 4 length', done => {
        request(app)
            .post('/register')
            .send({
                email: 'guest@mail.com',
                password: 'usr'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Passwords must be between 4 and 20 characters long'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Register User Password with more than 20 length', done => {
        request(app)
            .post('/register')
            .send({
                email: 'guest@mail.com',
                password: 'thisisalongpasswordeverinthetestxixixi'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', ['Passwords must be between 4 and 20 characters long'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

// * User Login
describe('Test POST /login for User Login', () => {
    it('Login User with empty field', done => {
        request(app)
            .post('/login')
            .send({
                email: '',
                password: ''
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Please complete all form')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Success User Login', done => {
        request(app)
            .post('/login')
            .send({
                email: 'user@user.com',
                password: 'user'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', 'user@user.com')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Wrong User Email', done => {
        request(app)
            .post('/login')
            .send({
                email: 'random@user.com',
                password: 'dontknow'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Wrong email or password')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Wrong User Password', done => {
        request(app)
            .post('/login')
            .send({
                email: 'user@user.com',
                password: 'dontknow'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Wrong email or password')
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})