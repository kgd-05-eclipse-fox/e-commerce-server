// const sum = require('../helpers/sum');
const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

afterAll((done) => {
    queryInterface.bulkDelete("Users")
    .then( data => {
        console.log("Berhasil hapus data")
        done()
    })
    .catch(err => {
        console.log(err)
        done(err)
    })
})

describe('Test endpoint Login admin', () => {
    it('test login admin success', (done) => {
        request(app)
        .post('/login/admin')
        .send({email: 'admin@mail.com', password: '123456'})
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

    it('Login admin with wrong password', (done) => {
        request(app)
        .post('/login/admin')
        .send({email: 'admin@mail.com', password: '123123'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Wrong email / password')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Login admin with email does not exist', (done) => {
        request(app)
        .post('/login/admin')
        .send({email: 'admin@gmail.com', password: '1234'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Wrong email / password')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    it('Login admin with email and password is empty', (done) => {
        request(app)
        .post('/login/admin')
        .send({email: '', password: ''})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Wrong email / password')
            done()
        })
        .catch(err => {
            done(err)
        })
    })

})

describe('Test endpoint Register Customer', () => {
    beforeAll((done) => {
        let payloadCustomer = {
            email: 'naruto@mail.com',
            password: '123456'
        }
        User.create(payloadCustomer)
        .then( data => {
            done() //hasil revisi asynchronus
        })
        .catch(err => {
            done(err)
        })
    })
    it('test register user success', (done) => {
        request(app)
        .post('/register/user')
        .send({email: 'farhan@mail.com', password: '123456'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('email', 'farhan@mail.com')
            done()
        })
        .catch(err => {
            done(err)
        })
    })


    it('register user with the same email', (done) => {
        request(app)
        .post('/register/user')
        .send({email: 'naruto@mail.com', password: '123456'})
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
        .post('/register/user')
        .send({email: 'sasuke@mail.com', password: '123'})
        .then(response => {
            const{body, status} = response
            expect(status).toEqual(400)
            expect(body).toHaveProperty('message', 'Password must be between four and ten character')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
})

describe('Test endpoint Login Customer', () => {
    beforeAll((done) => {
        let payloadCustomer = {
            email: 'customer@mail.com',
            password: '1234'
        }
        User.create(payloadCustomer)
        .then( data => {
            done() //hasil revisi
        })
        .catch(err => {
            done(err)
        })
    })
    it('test login customer success', (done) => {
        request(app)
        .post('/login/customer')
        .send({email: 'customer@mail.com', password: '1234'})
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

    it('Login customer with wrong password', (done) => {
        request(app)
        .post('/login/customer')
        .send({email: 'customer@mail.com', password: '123123'})
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

    it('Login customer with email does not exist', (done) => {
        request(app)
        .post('/login/customer')
        .send({email: 'customer@gmail.com', password: '1234'})
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

    it('Login customer with email and password is empty', (done) => {
        request(app)
        .post('/login/customer')
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
})