const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const jwtApp = require('../helper/jwt.js')
const {Product} = require('../models')

let dataTest = {}
let newDataProduct = {}


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
    let dataProduct = {
        name: 'Nami One Piece Action FIgure BWFC',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/3/7/441611/441611_33f67cb3-71fc-49bc-b35f-a3f78232ad18_800_800',
        price: 100000000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    Product.create(dataProduct)
    .then( res=>{
        newDataProduct.id = res.dataValues.id
        newDataProduct.name = res.dataValues.name
        newDataProduct.image_url = res.dataValues.image_url
        newDataProduct.price = res.dataValues.price
        newDataProduct.stock = res.dataValues.stock
        console.log(newDataProduct.id, 'id new <<<<<<<<<<<<<<<<<,')
    })
    .catch( err =>{
        console.log(err)
        done(err)
    })

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

    // test case 2 => vailed create product (empty access_token)
    it('vailed Create product couse empty access_token', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', '')
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: 1000000,
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'invalid Token')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    // test case 3 => vailed create product (wrong access_token)
    it('vailed Create product couse wrong access_token', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', dataTest.customer_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: 1000000,
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'invalid Token')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    // test case 4 => vailed create product (empty name)
    it('vailed Create product couse empty name', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: '',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: 1000000,
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'the product name cannot be blank')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    // test case 5 => vailed create product (minus stock minus)
    it('vailed Create product couse minus stock minus', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: 1000000,
            stock: -10
        })
        .then(res =>{
            const {body, status} = res
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'product stock must not be below 0')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    // test case 6 => vailed create product (minus product minus)
    it('vailed Create product couse minus product minus', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: -1000000,
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'product prices must not be below 0')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    // test case 7 => vailed create product (wrong type data)
    it('vailed Create product couse wrong type data (price)', (done)=>{
        request(app)
        .post('/product')
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: '1000000',
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'product prices must not be integer')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    // ======== Update product ========
    //test case 1 => success update product
    it('Success update Product', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: 1000000,
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            console.log(body)
            expect(status).toEqual(200)
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

    //test case 2 => update product wrong access_token
    it('update Product wrong access_token', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', dataTest.customer_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: 1000000,
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            console.log(body)
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'you are not admin')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 3 => update product stock minus
    it('update Product stock minus', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: 1000000,
            stock: -10
        })
        .then(res =>{
            const {body, status} = res
            console.log(body)
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'product stock must not be below 0')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 4 => update product worong type data
    it('update Product worong type data', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: '1000000',
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            console.log(body)
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'product prices must not be integer')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 5 => update price minus
    it('update price minus', (done)=>{
        request(app)
        .put(`/product/${newDataProduct.id}`)
        .set('access_token', dataTest.admin_access_token)
        .send({
            name: 'Anime One Piece Nami BB Ver PVC Action Figure ',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/16/241728/241728_59d08b24-5a73-4407-a094-4c84e6b4ab34.jpg',
            price: -1000000,
            stock: 10
        })
        .then(res =>{
            const {body, status} = res
            console.log(body)
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'product prices must not be below 0')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    // ====== Delete Product =====
    // test case 1 => success delete product
    it('Success delete Product', (done)=>{
        request(app)
        .delete(`/product/${newDataProduct.id}`)
        .set('access_token', dataTest.admin_access_token)
        .then(res =>{
            const {body, status} = res
            console.log(body)
            expect(status).toEqual(200)
            expect(body).toHaveProperty('msg', 'Product has Deleted')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })

    //test case 2 => Delete wift wrong access_token
    it('Delete wift wrong access_token', (done)=>{
        request(app)
        .delete(`/product/${newDataProduct.id}`)
        .set('access_token', dataTest.customer_access_token)
        .then(res =>{
            const {body, status} = res
            console.log(body)
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg', 'you are not admin')
            done()
        })
        .catch(err =>{
            console.log(err)
            done(err)
        })
    })
})
