const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

afterAll((done)=>{
    queryInterface.bulkDelete("Users")
    .then(res=>{
        console.log('===Test Telah Selesai===')
        done()
    })
    .catch(err=>{
        console.log('===Error Akhir Test===')
        done(err)
    })
})

beforeAll((done)=>{
    console.log('===Test dijalankan===')
    done()
})


describe('Test EndPoint User', ()=>{
    //test case 1 => regis customer berhasil
    it('test register costomer success', (done) =>{
        request(app)
        .post('/register')
        .send({email: 'makan@mail.com', password: '123456'})
        .then(res=> {
            const {body, status} = res
            console.log('>>>>', body)
            console.log('>>>>', status)

            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('email', 'makan@mail.com')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })
    
    // test case 2 => Empty Email regis customer gagal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    it('test case Empty Email costumer', (done)=>{
        request(app)
        .post('/register')
        .send({email: '', password: '123456', role: 'customer'})
        .then(res=>{
            const {body, status} = res

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Email Tidak boleh kosong')
            done()
        })
        .catch(err=>{
            console.log(err)
            done(err)
        })
    })

    // test case 3 => Empty Password regis customer gagal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    it('test case Empty Password costumer', (done)=>{
        request(app)
        .post('/register')
        .send({email: 'makan@mail.com', password: '', role: 'customer'})
        .then(res=>{
            const {body, status} = res

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Email atau Password tidak valid')
            done()
        })
        .catch(err=>{
            console.log(err)
            done(err)
        })
    })

    //==========login admin==============

    //test case 1 => login admin berhasil
    it('test admin login success', (done)=>{
        request(app)
        .post('/login/admin')
        .send({email: 'admin@mail.com', password: '1234'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('email', 'admin@mail.com')
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 2 => login admin gagal email salah
    it('test admin invalid email login', (done)=>{
        request(app)
        .post('/login/admin')
        .send({email: 'aa@mail.com', password: '1234'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'invalid email/password')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 3 => login admin gagal password salah
    it('test admin invalid password login', (done)=>{
        request(app)
        .post('/login/admin')
        .send({email: 'admin@mail.com', password: '1'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'invalid email/password')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 4 => login admin gagal email kosong
    it('test admin invalid email Empty', (done)=>{
        request(app)
        .post('/login/admin')
        .send({email: '', password: '1234'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', 'Email Tidak boleh kosong')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 5 => login admin gagal password kosong
    it('test admin invalid password Empty', (done)=>{
        request(app)
        .post('/login/admin')
        .send({email: 'admin@mail.com', password: ''})
        .then(res =>{
            const {body, status} = res

            
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', 'Password Tidak boleh kosong')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 6 => login admin gagal role salah (customer)
    it('test admin invalid role', (done)=>{
        request(app)
        .post('/login/admin')
        .send({email: 'customer@mail.com', password: '1234'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Sorry you are not Admin')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //==========login Customer==============

    //test case 1 => login Customer berhasil
    it('test Customer login success', (done)=>{
        request(app)
        .post('/login/customer')
        .send({email: 'customer@mail.com', password: '1234'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('email', 'customer@mail.com')
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 2 => login customer gagal email salah
    it('test customer invalid email login', (done)=>{
        request(app)
        .post('/login/customer')
        .send({email: 'aa@mail.com', password: '1234'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'invalid email/password')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 3 => login customer gagal password salah
    it('test customer invalid password login', (done)=>{
        request(app)
        .post('/login/customer')
        .send({email: 'customer@mail.com', password: '1'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'invalid email/password')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 4 => login customer gagal email kosong
    it('test customer invalid email Empty', (done)=>{
        request(app)
        .post('/login/customer')
        .send({email: '', password: '1234'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', 'Email Tidak boleh kosong')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 5 => login customer gagal password kosong
    it('test customer invalid password Empty', (done)=>{
        request(app)
        .post('/login/customer')
        .send({email: 'customer@mail.com', password: ''})
        .then(res =>{
            const {body, status} = res

            
            expect(status).toEqual(400)
            expect(body).toHaveProperty('msg', 'Password Tidak boleh kosong')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 6 => login customer gagal role salah (admin)
    it('test customer invalid role', (done)=>{
        request(app)
        .post('/login/customer')
        .send({email: 'admin@mail.com', password: '1234'})
        .then(res =>{
            const {body, status} = res

            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'Sorry you are not Customer')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })
})
