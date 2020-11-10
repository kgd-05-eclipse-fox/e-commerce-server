const request = require('supertest')
const app = require('../app')

describe('login admin test', () => {
  it('login success', (done) => {
      request(app)
      .post('/login/admin')
      .send({email: 'admin@mail.com', password: '1234'})
      .then(response => {
          const { body, status } = response

          expect(status).toEqual(200)
          expect(body).toHaveProperty('access_token', expect.any(String))

          done()
      })
      .catch(err => {
          done(err)
      })
  })

  it('login failed (incorrect password)', (done) => {
      request(app)
      .post('/login/admin')
      .send({email: 'admin@mail.com', password:'admin1234'})
      .then(response => {
          const { body, status } = response

          expect(status).toEqual(401)
          expect(body).toHaveProperty('msg', 'email or password is incorrect')
          done()
      })
      .catch(err => {
          done(err)
      })
  })

  it('login failed (email not found)', (done) => {
      request(app)
      .post('/login/admin')
      .send({email: 'notfound@mail.com', password:'1234'})
      .then(response => {
          const { body, status } = response

          expect(status).toEqual(401)
          expect(body).toHaveProperty('msg', 'email or password is incorrect')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  
  it('login failed (invalid input)', (done) => {
      request(app)
      .post('/login/admin')
      .send({email: '', password:''})
      .then(response => {
          const { body, status } = response

          expect(status).toEqual(401)
          expect(body).toHaveProperty('msg', 'email or password is incorrect')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
})

describe('login customer test', () => {
  it('login success', (done) => {
    request(app)
    .post('/login/customer')
    .send({email: 'customer@mail.com', password: '1234'})
    .then(response => {
        const { body, status } = response

        expect(status).toEqual(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        expect(body).toHaveProperty('user.username', 'customer')
        expect(body).toHaveProperty('user.id', expect.any(Number))
        expect(body).toHaveProperty('user.email', 'customer@mail.com')
        done()
    })
    .catch(err => {
        done(err)
    })
})

  it('login failed (incorrect password)', (done) => {
      request(app)
      .post('/login/customer')
      .send({email: 'customer@mail.com', password:'customersss'})
      .then(response => {
          const { body, status } = response

          expect(status).toEqual(401)
          expect(body).toHaveProperty('msg', 'email or password is incorrect')
          done()
      })
      .catch(err => {
          done(err)
      })
  })

  it('login failed (email not found)', (done) => {
      request(app)
      .post('/login/customer')
      .send({email: 'notfound@mail.com', password:'1234'})
      .then(response => {
          const { body, status } = response

          expect(status).toEqual(401)
          expect(body).toHaveProperty('msg', 'email or password is incorrect')
          done()
      })
      .catch(err => {
          done(err)
      })
  })

  it('login failed (invalid input)', (done) => {
      request(app)
      .post('/login/customer')
      .send({email: '', password:''})
      .then(response => {
          const { body, status } = response

          expect(status).toEqual(401)
          expect(body).toHaveProperty('msg', 'email or password is incorrect')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
})

describe('register customer test', () => {
  it('register success', (done) => {
    request(app)
    .post('/register')
    .send({username: 'hello', email: 'test@mail.com', password: 'torian05092002' })
    .then(({body, status}) => {

      expect(status).toEqual(201)
      expect(body).toHaveProperty('access_token', expect.any(String))
      expect(body).toHaveProperty('user.username', 'hello')
      expect(body).toHaveProperty('user.id', expect.any(Number))
      expect(body).toHaveProperty('user.email', 'test@mail.com')
      expect(body).toHaveProperty('user.role', 'customer')

      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('register failed (unique email)', (done) => {
    request(app)
    .post('/register')
    .send({username: 'customer', email: 'customer@mail.com', password: 'abcdefgh'})
    .then(({ body, status }) => {

      expect(status).toEqual(400)
      expect(body).toHaveProperty('msg', `email must be unique`)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('register failed (validation errors)', (done) => {
    request(app)
    .post('/register')
    .send({username: 'a', email: '', password: 'abc'})
    .then(({ body, status }) => {

      expect(status).toEqual(400)
      expect(body).toHaveProperty('msg', `Username must be a minimal of 3 and a maximal of 15 characters, Email can't be empty, Must be a valid email format, Password must be a minimal of 6 and a maximal of 20 characters`)
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})
