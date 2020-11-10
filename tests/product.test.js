const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const jwtApp = require('../helper/jwt.js')

let dataTest = {}

afterAll((done) =>{
    queryInterface.bulkDelete("Products")
    .then(res=>{
        console.log('===Test Telah Selesai===')
        done()
    })
    .catch(err=>{
        console.log('===Error Akhir Test===')
        done(err)
    })
})

beforeAll((done) =>{
    let admin = {
        email: 'admin@mail.com',
        role: 'admin'
    }
    let customer = {
        email: 'customer@mail.com',
        role: 'customer'
    }
    dataTest.admin_access_token = jwtApp.createToken(admin)
    dataTest.customer_access_token = jwtApp.createToken(customer)
    done()
})

describe('Test EndPoint Product', ()=>{
    //test case 1 => success create product
    it('Success Create Product', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: 1000000,
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            expect(status).toEqual(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', 'Anime One Piece Nami BB Ver PVC Action Figure ')
            expect(body).toHaveProperty('image_url', 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg')
            expect(body).toHaveProperty('price', 1000000)
            expect(body).toHaveProperty('stock', 10)
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })
})
