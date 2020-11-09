const request  = require('supertest');
const app = require('../app');
const { sequelize } = require('../models')  
const { queryInterface }= sequelize


afterAll((done) => {
    queryInterface.bulkDelete('Users')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('Test Endpoint POST /register', () => {
    it ('test register is success', (done) => {
        request(app)
        .post('/register')
        .send({email: 'test@mail.com', password: '123456', role: 'customer'})
        .then(response => {
            // res is returning value from key body
            //example: res.status(201).json({id: id, email: email})
            const {status, body} = response
            //status expected is 201 and the body is {id: id, email: email}
            expect(status).toBe(201);
            expect(body).toHaveProperty('id', expect.any(Number));
            expect(body).toHaveProperty('email', 'test@mail.com');
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    });

    it ('test register is email is unique', (done) => {
        request(app)
        .post('/register')
        .send({email: 'test@mail.com', password: '123456', role: 'customer'})
        .then(response => {
            const {status, body} = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty('message', 'Email is already exist');
            done();
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
    })

    it ('test register if password is under six characters', (done) => {
        request(app)
        .post('/register')
        .send({email: 'test@mail.com', password: '123', role: 'customer'})
        .then(response => {
            const {status, body} = response;
            expect(status).toEqual(400);
            expect(body).toHaveProperty('message', 'Password minimum is six characters');
            done()
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
    })
    
    it ('test register if email is empty string and password is empty string', (done) => {
        request(app)
        .post('/register')
        .send({email: '', password: '', role: 'customer'})
        .then(response => {
            const {status, body} = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty('message', 'Please fill the empty column');
            done()
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
    })
})

