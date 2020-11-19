const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { User, Category } = require('../models/index');
const Jwt = require('../helpers/jwt');
let adminToken;
let customerToken;
let bait;

afterAll(done => {
  queryInterface.bulkDelete('Products')
    .then(() => {
      done();
    })
    .catch(err => {
      done();
    })
})

beforeAll(done => {
  User.create({
    first_name: 'mawar.',
    last_name: 'admin',
    gender: 'female',
    email: 'mawar.admin@gmail.com',
    password: '1234',
    role: 'admin'
  })
    .then(admin => {
      adminToken = Jwt.sign({
        id: admin.id, first_name: admin.first_name, last_name: admin.last_name, gender: admin.gender, email: admin.email, role: admin.role
      })
      return User.create({
        first_name: 'bunga.',
        last_name: 'admin',
        gender: 'female',
        email: 'bunga.admin@mail.com',
        password: '1234',
        role: 'customer'
      })
    })
    .then(customer => {
      customerToken = Jwt.sign({
        id: customer.id, first_name: customer.first_name, last_name: customer.last_name, gender: customer.gender, email: customer.email, role: customer.role 
      })
      done();
    })
    .catch(err => {
      done(err);
    })
})

describe('Test Endpoint POST /products', () => {
  // Success add product
  it('Test add one new product success', done => {
    request(app)
      .post('/products')
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: 3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", "IPhone 11");
        expect(body).toHaveProperty("image_url", "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg");
        expect(body).toHaveProperty("price", 15000000);
        expect(body).toHaveProperty("stock", 3);
        expect(body).toHaveProperty("CategoryId", 1);
        bait = +body.id;
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot add product as a customer
  it('Test cannot add product as a customer', done => {
    request(app)
      .post('/products')
      .set('token', customerToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: 3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toHaveProperty("message", "You are out of authority");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot add product with name property has an empty value
  it('Test cannot add product with name property has an empty value', done => {
    request(app)
      .post('/products')
      .set('token', adminToken)
      .send({ name: "", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: 3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Product name required");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot add product with image_url property has an empty value
  it('Test cannot add product with image_url property has an empty value', done => {
    request(app)
      .post('/products')
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "", price: 15000000, stock: 3 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Image URL required");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot add product with price property has an empty value
  it('Test cannot add product with price property has an empty value', done => {
    request(app)
      .post('/products')
      .set('token', adminToken)
      .send({ name: "Sepatu Air Jordan 1", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: '', stock: 3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Price required");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot add product with stock property has an empty value
  it('Test cannot add product with stock property has an empty value', done => {
    request(app)
      .post('/products')
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: '', CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Stock required");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot add product with CategoryId property has an empty value
  it('Test cannot add product with CategoryId property has an empty value', done => {
    request(app)
      .post('/products')
      .set('token', adminToken)
      .send({ name: "15000000", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: 3, CategoryId: '' })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Please choose product category");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot add product with price lower than 0
  it('Test cannot add product with price lower than 0', done => {
    request(app)
      .post('/products')
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: -15000000, stock: 3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Price must not be lower than 0");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot add product with stock lower than 0
  it('Test cannot add product with price lower than 0', done => {
    request(app)
      .post('/products')
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: -3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Stock must not be lower than 0");

        done();
      })
      .catch(err => {
        done(err);
      })
  })
})

describe('Test Endpoint GET /products', () => {
  // Success get all products
  it('Test get all products success', done => {
    request(app)
      .get('/products')
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(200);
        expect(body[0]).toHaveProperty("name", expect.anything());
        expect(body[0]).toHaveProperty("image_url", expect.anything());
        expect(body[0]).toHaveProperty("price", expect.any(Number));
        expect(body[0]).toHaveProperty("stock", expect.any(Number));
        expect(body[0]).toHaveProperty("CategoryId", expect.any(Number));
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})

describe('Test Endpoint PUT /products/:id', () => {
  // Success edit product
  it('Test edit product success', done => {
    request(app)
      .put(`/products/${bait}`)
      .set('token', adminToken)
      .send({ name: "IPhone 12", image_url: "https://cdn.vox-cdn.com/thumbor/WYAvnhez7oEaHGRND7A3QncZYlk=/0x0:2050x1367/1200x0/filters:focal(0x0:2050x1367):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22023082/vpavic_4279_20201107_0180.0.jpg", price: 20000000, stock: 5, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(200);
        expect(body[0]).toHaveProperty("id", expect.any(Number));
        expect(body[0]).toHaveProperty("name", "IPhone 12");
        expect(body[0]).toHaveProperty("image_url", "https://cdn.vox-cdn.com/thumbor/WYAvnhez7oEaHGRND7A3QncZYlk=/0x0:2050x1367/1200x0/filters:focal(0x0:2050x1367):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22023082/vpavic_4279_20201107_0180.0.jpg");
        expect(body[0]).toHaveProperty("price", 20000000);
        expect(body[0]).toHaveProperty("stock", 5);
        expect(body[0]).toHaveProperty("CategoryId", 1);
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot edit product as a customer
  it('Test cannot edit product as a customer', done => {
    request(app)
      .put(`/products/${bait}`)
      .set('token', customerToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: 3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toHaveProperty("message", "You are out of authority");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot edit product with name property has an empty value
  it('Test cannot edit product with name property has an empty value', done => {
    request(app)
      .put(`/products/${bait}`)
      .set('token', adminToken)
      .send({ name: "", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: 3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Product name required");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot edit product with image_url property has an empty value
  it('Test cannot edit product with image_url property has an empty value', done => {
    request(app)
      .put(`/products/${bait}`)
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "", price: 15000000, stock: 3 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Image URL required");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot edit product with price property has an empty value
  it('Test cannot edit product with price property has an empty value', done => {
    request(app)
      .put(`/products/${bait}`)
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: '', stock: 3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Price required");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot edit product with stock property has an empty value
  it('Test cannot edit product with stock property has an empty value', done => {
    request(app)
      .put(`/products/${bait}`)
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: '', CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Stock required");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot add product with CategoryId property has an empty value
  it('Test cannot add product with CategoryId property has an empty value', done => {
    request(app)
      .put(`/products/${bait}`)
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: 3, CategoryId: '' })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Please choose product category");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot edit product with price lower than 0
  it('Test cannot edit product with price lower than 0', done => {
    request(app)
      .put(`/products/${bait}`)
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: -15000000, stock: 3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Price must not be lower than 0");

        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot edit product with stock lower than 0
  it('Test cannot edit product with price lower than 0', done => {
    request(app)
      .put(`/products/${bait}`)
      .set('token', adminToken)
      .send({ name: "IPhone 11", image_url: "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_11/Apple_iPhone_11_L_1.jpg", price: 15000000, stock: -3, CategoryId: 1 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(400);
        expect(body).toHaveProperty("message", "Stock must not be lower than 0");

        done();
      })
      .catch(err => {
        done(err);
      })
  })
})

describe('Test Endpoint DELETE /products/:id', () => {
  // Success delete product
  it('Test delete product success', done => {
    request(app)
      .delete(`/products/${bait}`)
      .set('token', adminToken)
      .then(response => {
        const { body, status } = response;
        
        expect(status).toEqual(200);
        expect(body).toHaveProperty("message", "A product has been successfully deleted");
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  // Cannot edit product as a customer
  it('Test delete product success', done => {
    console.log(customerToken);
    request(app)
      .delete(`/products/${bait}`)
      .set('token', customerToken)
      .then(response => {
        const { body, status } = response;
        
        expect(status).toEqual(401);
        expect(body).toHaveProperty("message", "You are out of authority");
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})