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

    /product

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
        "url": "/product",
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

    /product/:id

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
        "url": "/product/:id",
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

    /product/:id

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
        "url": "/product/:id",
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

    /product/:id

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
        "url": "/product/:id",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**Get Carts ( Client Side )**
----
  * **URL**

    /cart

  * **Method:**
    
    `GET`

  * **Headers:**

    Required:

    token=[string]
  
  * **Success Response:**  

    * **Code:** 200 OK <br />
      **Content:** 
      ```json
      {
        "products": [
            {
                "id": 68,
                "Qty": 1,
                "Product": {
                    "id": 147,
                    "name": "Adidas Predator",
                    "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//95/MTA-1439339/adidas_adidas-neo-easy-vulc-vs-canvas-sepatu-pria---black_full05.jpg",
                    "price": 500000,
                    "stock": 5,
                    "createdAt": "2020-11-15T05:48:03.259Z",
                    "updatedAt": "2020-11-19T03:13:03.311Z"
                }
            }
        ],
        "totalPrice": 500000
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
        "url": "/cart",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**Add Cart ( Client Side )**
----
  * **URL**

    /cart/:id

  * **Method:**
    
    `POST`

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
          "UserId": 127,
          "ProductId": 157,
          "Qty": 1,
          "updatedAt": "2020-11-19T15:21:35.631Z",
          "createdAt": "2020-11-19T15:21:35.631Z"
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
        "message": "Product not found"
      }
      ```
      OR

    * **Code:** 400 BAD REQUEST <br />
      **Content:**
      ```json
      {
        "message": "Product out of stock"
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
        "url": "/cart/:id",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**Increment Quantity Cart ( Client Side )**
----
  * **URL**

    /:id/quantity/inc

  * **Method:**
    
    `PATCH`

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
        [
          1,
          [
            {
              "UserId": 127,
              "ProductId": 147,
              "Qty": 3,
              "createdAt": "2020-11-19T15:13:31.394Z",
              "updatedAt": "2020-11-19T15:49:43.938Z"
            }
          ]
        ] 
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

    * **Code:** 400 BAD REQUEST <br />
      **Content:**
      ```json
      {
        "message": "You are not authorized"
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
        "method": "PATCH",
        "url": "/cart/:id/quantity/inc",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**Decrement Quantity Cart ( Client Side )**
----
  * **URL**

    /:id/quantity/dec

  * **Method:**
    
    `PATCH`

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
        [
          1,
          [
            {
              "UserId": 127,
              "ProductId": 147,
              "Qty": 2,
              "createdAt": "2020-11-19T15:13:31.394Z",
              "updatedAt": "2020-11-19T15:49:43.938Z"
            }
          ]
        ] 
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

    * **Code:** 400 BAD REQUEST <br />
      **Content:**
      ```json
      {
        "message": "You are not authorized"
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
        "method": "PATCH",
        "url": "/cart/:id/quantity/dec",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**Delete Cart ( Client Side )**
----
  * **URL**

    /cart/:id

  * **Method:**
    
    `DELETE`

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
        "message": "Cart deleted"
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

    * **Code:** 400 BAD REQUEST <br />
      **Content:**
      ```json
      {
        "message": "You are not authorized"
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
        "url": "/cart/:id",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**Checkout Cart ( Client Side )**
----
  * **URL**

    /cart/checkouts

  * **Method:**
    
    `PATCH`

  * **Headers:**

    Required:

    token=[string]

  * **Success Response:**  

    * **Code:** 200 OK <br />
      **Content:** 
      ```json
      {
          "message": "Checkout success"
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

    * **Code:** 400 BAD REQUEST <br />
      **Content:**
      ```json
      {
        "message": "You are not authorized"
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
        "method": "PATCH",
        "url": "/cart/checkouts",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```

**View History Transaction ( Client Side )**
----
  * **URL**

    /history

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
            "id": 12,
            "UserId": 127,
            "product": "Adidas Predator",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//95/MTA-1439339/adidas_adidas-neo-easy-vulc-vs-canvas-sepatu-pria---black_full05.jpg",
            "price": 1000000,
            "qty": 2,
            "createdAt": "2020-11-19T16:07:30.116Z",
            "updatedAt": "2020-11-19T16:07:30.116Z"
        }
      ]
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
        "url": "/history",
        "headers": {token}
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    ```



