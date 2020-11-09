const request  = require('supertest');
const app = require('../app');
const { sequelize } = require('../models')  
const { queryInterface } = sequelize


afterAll((done) => {
    console.log('running bulk delete after testing');
    queryInterface.bulkDelete('Users')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

beforeAll((done) => {
    console.log('running before test');
    done()
})

describe('Test Endpoint POST /register', () => {
    it ('testing register is success', (done) => {
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

    it ('testing register is email is unique', (done) => {
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

    it ('testing register if password is under six characters', (done) => {
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
    
    it ('testing register if email is empty string and password is empty string', (done) => {
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

    it ('testing admin login successful', (done) => {
        request(app)
        .post('/login/admin')
        .send({email:'admin@mail.com', password: '123456'})
        .then(response => {
            const { status, body } = response
            expect(status).toBe(200);
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it ('testing admin login if password is wrong', (done) => {
        request(app)
        .post('/login/admin')
        .send({email:'admin@mail.com', password: '123'})
        .then(response => {
            const { status, body } = response
            expect(status).toBe(401);
            expect(body).toHaveProperty('message', 'Invalid email/password')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it ("testing admin login if user doesn't found", (done) => {
        request(app)
        .post('/login/admin')
        .send({email:'kureng@mail.com', password: '123456'})
        .then(response => {
            const { status, body } = response
            expect(status).toBe(401);
            expect(body).toHaveProperty('message', 'Invalid email/password')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it('testing customer login successfull', (done) => {
        request(app)
        .post('/login/customer')
        .send({email: 'test@mail.com', password: '123456'})
        .then(response => {
            const { status, body } = response
            expect(status).toBe(200);
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it('testing customer if password is wrong', (done) => {
        request(app)
        .post('/login/customer')
        .send({email: 'test@mail.com', password: '123567'})
        .then(response => {
            const { status, body } = response
            expect(status).toBe(401);
            expect(body).toHaveProperty('message', 'Invalid email/password')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })

    it("testing admin login if user doesn't found", (done) => {
        request(app)
        .post('/login/customer')
        .send({email: 'kureng@mail.com', password: '123456'})
        .then(response => {
            const { status, body } = response
            expect(status).toBe(401);
            expect(body).toHaveProperty('message', 'Invalid email/password')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })
})

