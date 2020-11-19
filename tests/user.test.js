const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;

afterAll(done => {
  queryInterface.bulkDelete("Users")
    .then(() => {
      done();
    })
    .catch(err => {
      done();
    })
})

describe('Test Endpoint POST /adminRegister', () => {
  // Success Register
  it('Test register success', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: 'bima',
        last_name: 'krishna',
        gender: 'male',
        email: 'bima@mail.com',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toEqual(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("first_name", "bima");
        expect(body).toHaveProperty("last_name", "krishna");
        expect(body).toHaveProperty("gender", "male");
        expect(body).toHaveProperty("email", "bima@mail.com");
        expect(body).toHaveProperty("role", "1234");
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Invalid Register

  // Cannot register with any registered email
  it('Test register registered email', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: 'bima',
        last_name: 'krishna',
        gender: 'male',
        email: 'bima@mail.com',
        password: '1234',
      })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Email has already registered");
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot register email with a non-email format
  it('Test register cannot register a non-email format in email input', done => {
    request(app)
    .post('/adminRegister')
    .send({
      first_name: 'bima',
      last_name: 'krishna',
      gender: 'male',
      email: 'bima',
      password: '1234',
    })
    .then(response => {
      const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Email must be using email format");
        done();
    })
    .catch(err => {
      done(err);
    })
  })

  // Each key must not be empty

  // first_name property must not be empty
  it('Test cannot register with empty first_name property', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: '',
        last_name: 'krishna',
        gender: 'male',
        email: 'bima@mail.com',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "First name required");
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // last_name property must not be empty
  it('Test cannot register with empty last_name property', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: 'bima',
        last_name: '',
        gender: 'male',
        email: 'bima@mail.com',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Last name required");
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // gender property must not be empty
  it('Test cannot register with empty gender property', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: 'bima',
        last_name: 'krishna',
        gender: '',
        email: 'bima@mail.com',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Gender required");
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // email property must not be empty
  it('Test cannot register with empty email property', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: 'bima',
        last_name: 'krishna',
        gender: 'male',
        email: '',
        password: '1234'
      })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Email required, Email must be using email format");
        // Email input broke 2 kind of validation rules which is the input require email with an email format
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // password property must not be empty
  it('Test cannot register with empty password property', done => {
    request(app)
      .post('/adminRegister')
      .send({
        first_name: 'bima',
        last_name: 'krishna',
        gender: 'male',
        email: 'bima@mail.com',
        password: ''
      })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Password required");
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})

describe('Test Endpoint POST /adminLogin', () => {
  // Success Login
  it('Test login success', done => {
    request(app)
      .post('/adminLogin')
      .send({ email: 'bima@mail.com', password: '1234' })
      .then(response => {
        let { body, status } = response;

        expect(status).toEqual(200);
        expect(body).toHaveProperty("token", expect.anything());
        
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Invalid Login
  it('Test login invalid', done => {
    request(app)
      .post('/adminLogin')
      .send({ email: '', password: '' })
      .then(response => {
        let { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toHaveProperty("message", "Email/password incorrect");
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})