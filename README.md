# e-commerce-server

https://hacktiv-store.herokuapp.com <br>
https://hacktiv-store.web.app

**Login Admin**
----
  * **URL**

    /login/admin

  * **Method:**
    
    `POST`
    
  * **Data Params**

      email=[string],

      password=[string]

  * **Success Response:**  

    * **Code:** 200 OK <br />
      **Content:** 
      ```json
      {
        "id": 4,
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzYXN1a2VAbWFpbC5jb20iLCJpYXQiOjE2MDQ3Mjc0MTZ9.5o6uFugkIcJhh8NpI3NQH2fCUAVJh5bYqe6ngjjvO6g"
      }
      ```
  * **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** 
      ```json
      {
        "message": "Wrong email / password"
      }
      ```
    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      {
        "message": "Internal Server Error"
      }
      ```
  * **Sample Call:**
    ```json
    axios({
        "method": "POST",
        "url": "/login/admin",
        "data": 
            {
                "email": "payload.email",
                "password": "payload.password"
            }
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**Register Customer**
----
  * **URL**

    /register/user

  * **Method:**
    
    `POST`
    
  * **Data Params**

      email=[string],

      password=[string]

  * **Success Response:**  

    * **Code:** 201 OK <br />
      **Content:** 
      ```json
      {
        "id": 81,
        "email": "user@mail.com"
      }
      ```
  * **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
      **Content:** 
      ```json
      {
        "message": "Password cannot be empty"
      }
      ```
    OR

    * **Code:** 400 BAD REQUEST <br />
      **Content:** 
      ```json
      {
        "message": "Email cannot be empty"
      }
      ```
    OR

    * **Code:** 400 BAD REQUEST <br />
      **Content:** 
      ```json
      {
        "message": "Email must be unique"
      }
      ```
    OR

    * **Code:** 400 BAD REQUEST <br />
      **Content:** 
      ```json
      {
        "message": "Password must be between four and ten character"
      }
      ```
    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      {
        "message": "Internal Server Error"
      }
      ```
  * **Sample Call:**
    ```json
    axios({
        "method": "POST",
        "url": "/register/user",
        "data": 
            {
                "email": "payload.email",
                "password": "payload.password"
            }
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```
**Login Customer**
----
  * **URL**

    /login/customer

  * **Method:**
    
    `POST`
    
  * **Data Params**

      email=[string],

      password=[string]

  * **Success Response:**  

    * **Code:** 200 OK <br />
      **Content:** 
      ```json
      {
        "id": 80,
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODAsImVtYWlsIjoiY3VzdG9tZXJAbWFpbC5jb20iLCJpYXQiOjE2MDU0MjI1MDd9.fRdCHn2Gt-Cbqtv7Fy1kTjBic7uLm7smqUG6oN7sZfk"
      }
      ```
  * **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** 
      ```json
      {
        "message": "Wrong email / password"
      }
      ```
    OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      {
        "message": "Internal Server Error"
      }
      ```
  * **Sample Call:**
    ```json
    axios({
        "method": "POST",
        "url": "/login/customer",
        "data": 
            {
                "email": "payload.email",
                "password": "payload.password"
            }
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })

**Fetch Products ( Admin side )**
----
  * **URL**

    /product

  * **Method:**
    
    `GET`

  * **Headers:**

    Required:

    token=[string]

  * **Success Response:**  

    * **Code:** 200 OK <br />
      **Content:** 
      ```json
      [
        {
          "id": 147,
          "name": "Adidas Neo",
          "image_url": "http://arah.in/adidas-neo",
          "price": 50000,
          "stock": 10,
          "createdAt": "2020-11-15T05:48:03.259Z",
          "updatedAt": "2020-11-15T05:48:03.259Z"
        },
        {
          "id": 150,
          "name": "Ortuseight jogosala",
          "image_url": "https://sporthousestore.co.id/wp-content/uploads/2018/12/9-2.jpg",
          "price": 300000,
          "stock": 10,
          "createdAt": "2020-11-15T06:47:20.882Z",
          "updatedAt": "2020-11-15T06:47:20.882Z"
        }
      ]
      ```
  * **Error Response:**
    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      {
        "message": "Internal Server Error"
      }
      ```
  * **Sample Call:**
    ```json
    axios({
        "method": "GET",
        "url": "/product",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**Add Product ( Admin side )**
----
  * **URL**

    /product/create

  * **Method:**
    
    `POST`

  * **Headers:**

    Required:

    token=[string]
  
  * **Data Params**

    name=[string],

    image_url=[string],

    price=[number],

    stock=[number]

  * **Success Response:**  

    * **Code:** 201 CREATED <br />
      **Content:** 
      ```json
      {
        "id": 151,
        "name": "Nike air jordan",
        "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//91/MTA-4205807/nike_nike_air_jordan_1_retro_high_obsidian_unc_sepatu_olahraga_pria_full05_ql40r2mm.jpg",
        "price": 1000000,
        "stock": 200
      }
      ```
  * **Error Response:**
    * **Code:** 400 BAD REQUEST <br />
      **Content:**
      ```json
      {
        "message": "Field cannot be empty"
      }
      ```
      OR

    * **Code:** 400 BAD REQUEST <br />
      **Content:**
      ```json
      {
        "message": "Data type is wrong"
      }
      ```
      OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**
      ```json
      {
        "message": "Please login first"
      }
      ```
      OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

  * **Sample Call:**
    ```json
    axios({
        "method": "POST",
        "url": "/product/create",
        "headers": {token},
        "data": {
            "name": "payload.name",
            "image_url": "payload.image_url",
            "price": "payload.price",
            "stock": "payload.stock"
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```
**Get Products By ID ( Admin side )**
----
  * **URL**

    /product/edit/:id

  * **Method:**
    
    `GET`

  * **Headers:**

    Required:

    token=[string]

  * **URL Params:**

    Required:

    id=[number]

  * **Success Response:**  

    * **Code:** 200 OK <br />
      **Content:** 
      ```json
      {
        "id": 147,
        "name": "Adidas Neo",
        "image_url": "http://arah.in/adidas-neo",
        "price": 50000,
        "stock": 10,
        "createdAt": "2020-11-15T05:48:03.259Z",
        "updatedAt": "2020-11-15T05:48:03.259Z"
      }
      ```
  * **Error Response:**
    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      {
        "message": "Internal Server Error"
      }
      ```
      OR

    * **Code:** 404 NOT FOUND <br />
      **Content:**
      ```json
      {
        "message": "Data not found"
      }
      ```
      OR

    * **Code:** 401 UNAUTHORIZED <br />
        **Content:**
        ```json
        {
          "message": "Please login first"
        }
        ```
  * **Sample Call:**
    ```json
    axios({
        "method": "GET",
        "url": "/product/edit/:id",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```
**Update Product By ID ( Admin side )**
----
  * **URL**

    /product/update/:id

  * **Method:**
    
    `PUT`

  * **Headers:**

    Required:

    token=[string]

  * **URL Params:**

    Required:

    id=[number]

  * **Data Params**

    name=[string],

    image_url=[string],

    price=[number],

    stock=[number]

  * **Success Response:**  

    * **Code:** 200 OK <br />
      **Content:** 
      ```json
      {
        "id": 147,
        "name": "Adidas Predator",
        "image_url": "http://arah.in/adidas-neo",
        "price": 500000,
        "stock": 10,
        "createdAt": "2020-11-15T05:48:03.259Z",
        "updatedAt": "2020-11-15T07:28:54.339Z"
      }
      ```
  * **Error Response:**
    * **Code:** 400 BAD REQUEST <br />
      **Content:**
      ```json
      {
        "message": "Field cannot be empty"
      }
      ```
      OR

    * **Code:** 400 BAD REQUEST <br />
      **Content:**
      ```json
      {
        "message": "Data type is wrong"
      }
      ```
      OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**
      ```json
      {
        "message": "Please login first"
      }
      ```
      OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      {
        "message": "Internal Server Error"
      }
      ```
      OR

    * **Code:** 404 NOT FOUND <br />
      **Content:**
      ```json
      {
        "message": "Data not found"
      }
      ```
  * **Sample Call:**
    ```json
    axios({
        "method": "PUT",
        "url": "/product/update/:id",
        "headers": {token},
        "data": {
            "name": "payload.name",
            "image_url": "payload.image_url",
            "price": "payload.price",
            "stock": "payload.stock"
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**Delete Product ( Admin Side )**
----
  * **URL**

    /product/delete/:id

  * **Method:**
    
    `DELETE`

  * **Headers:**

    Required:

    token=[string]
  
  * **URL Params**

    id=[number]

  * **Success Response:**  

    * **Code:** 200 OK <br />
      **Content:** 
      ```json
      {
        "message": "Success delete product"
      }
      ```
  * **Error Response:**
    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**
      ```json
      {
        "message": "Please login first"
      }
      ```
      OR

    * **Code:** 404 NOT FOUND <br />
      **Content:**
      ```json
      {
        "message": "Data not found"
      }
      ```
      OR
      
    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:**
      ```json
      {
        "message": "Internal Server Error"
      }
      ```
  * **Sample Call:**
    ```json
    axios({
        "method": "DELETE",
        "url": "/task/delete",
        "headers": {token},
        "data": {
            "id": "payload.id"
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```



