// const sum = require('../helpers/sum');
const request = require('supertest')
const app = require('../app')

describe('Test endpoint user', () => {
    it('test login success', (done) => {
        request(app)
        .post('/users/login')
        .send({email: 'admin@mail.com', password: '1234'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('Wrong password', (done) => {
        request(app)
        .post('/users/login')
        .send({email: 'admin@mail.com', password: '123123'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Wrong email / password')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('Email does not exist', (done) => {
        request(app)
        .post('/users/login')
        .send({email: 'admin@gmail.com', password: '1234'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Wrong email / password')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('Email and password is empty', (done) => {
        request(app)
        .post('/users/login')
        .send({email: '', password: ''})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Wrong email / password')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it.only('test register user success', (done) => {
        request(app)
        .post('/users/register')
        .send({email: 'farhan@mail.com', password: '123456'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('email', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })


    it('register user with the same email', (done) => {
        request(app)
        .post('/users/register')
        .send({email: 'farhan@mail.com', password: '1234'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'email must be unique')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('register user with password less than 4 character', (done) => {
        request(app)
        .post('/users/register')
        .send({email: 'naruto@mail.com', password: '123'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('message', 'Password must be between four and ten character')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
})