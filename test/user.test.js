const request = require('supertest')
const app = require('../app')

describe('login test', () => {
    it('login success', (done) => {
        request(app)
        .post('/login/admin')
        .send({email: 'admin@mail.com', password: '1234'})
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            expect(body).toHaveProperty('user.username', 'admin')
            expect(body).toHaveProperty('user.id', expect.any(Number))
            expect(body).toHaveProperty('user.email', 'admin@mail.com')
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