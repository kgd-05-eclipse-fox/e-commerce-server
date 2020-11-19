# e-commerce-server documentation

### Among Us Store Themed E-Commerce CMS
```
server: https://a-mong-us.herokuapp.com
admin client: https://among-us-store.web.app
User client https://store-among-us.web.app

---admin login info---
email: admin@mail.com
password: 1234
```

#### List of available endpoints:
  `Login and register routes`

  * POST /login
  * POST /register
---
  `/products Routes`
  
  * GET /products
  * POST /products
  * PUT /products
  * DELETE /products/:id
---
  `/banners Routes`

  * GET /banners
  * POST /banners
  * PUT /banners
  * DELETE /banners/:id
  
---
  `/carts Routes`
  
  * GET /carts
  * POST /carts
  * PATCH /carts
  * GET /carts/history
  * GET /carts/:id
  * DELETE /carts/:id
  * PATCH /carts/:id

---
## Login
`For admin and users login`

* **URL**
  
  /login

* **METHOD**
  
  `POST`

* **DATA PARAMS**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

* **SUCCESS RESPONSE**
  
  * **Code:** 200
    
    **CONTENT**
    ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2MDUzMTY4NTR9.SZZ4ecs-WtQ8aUtAAdvYBOpIO0BvwAeq_vnuA9oK8EA"
    }
    ```

* **ERROR RESPONSE**
  
  * **Code:**  401
      
    **CONTENT**
    ```json
    {
    "error": "Wrong Email or Password"
    }
    ```

    OR

    ```json
    {
    "error": "Please fill up all the fields"
    }
    ```

* **SAMPLE CALL**
  ```js
  axios.post('/login', payload)
  ```

---
## Register
`For users register only`

* **URL**
  
  /register

* **METHOD**
  
  `POST`

* **DATA PARAMS**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

* **SUCCESS RESPONSE**
  
  * **Code:** 201
    
    **CONTENT**
    ```json
    {
      "id": 2,
      "email": "test@ting.com",
      "role": "user"
    }
    ```

* **ERROR RESPONSE**
  
  * **Code:**  401
      
    **CONTENT**
    ```json
    {
    "msg": "Email cannot be blank,Inputed email is even not an Email,Password cannot be blank,Password should be at least 4 characters"
    }
    ```

    OR

    ```json
    {
    "error": "Internal Server Error"
    }
    ```

* **SAMPLE CALL**
  ```js
  axios.post('/register', payload)
  ```

----

## Create Product
`Create product for admin only`

* **URL**
  
  /products

* **METHOD**
  
  `POST`


* **DATA PARAMS**

  * **HEADERS**

    `token: string`

  * **BODY**
    ```json
      {
        "name": "string",
        "image_url": "string",
        "price": "integer",
        "stock": "integer"
      }
      ```

* **SUCCESS RESPONSE**
  
  * **Code:** 201
    
    **CONTENT**
    ```json
    {
        "id": 29,
        "name": "Among Us: Crewmate Tee (Black, Adults)",
        "image_url": "https://cdn.shopify.com/s/files/1/0348/4293/5355/products/crewmate-jetblack_2048x2048.png",
        "price": 10000,
        "stock": 111,
        "updatedAt": "2020-11-14T01:39:02.567Z",
        "createdAt": "2020-11-14T01:39:02.567Z"
    }
    ```

* **ERROR RESPONSE**
  
  * **Code:**  401
      
    **CONTENT**
    ```json
    {
      "msg": "Unauthorized!"
    }
    ```

    OR

    ```json
    {
      "error": "Internal Server Error"
    }
    ```

* **SAMPLE CALL**
  ```js
  axios.post('/products', payload, { headers: { token }})
  ```

----
## Read Products
`Read products`

* **URL**
  
  /products

* **METHOD**
  
  `GET`

* **DATA PARAMS**
  
    * **HEADERS**

      `token: string`

* **SUCCESS RESPONSE**
  
  * **Code:** 200
    
    **CONTENT**
    ```json
    [
      {
          "id": 1,
          "name": "Among Us: Crewmate Tee (Black, Adults)",
          "image_url": "https://cdn.shopify.com/s/files/1/0348/4293/5355/products/crewmate-jetblack_2048x2048.png",
          "price": 99999,
          "stock": 9999,
          "createdAt": "2020-11-11T20:46:08.573Z",
          "updatedAt": "2020-11-13T23:01:25.899Z"
      },
      {
          "id": "...",
          "name": "...",
          "image_url": "...",
          "price": "...",
          "stock": "...",
          "createdAt": "...",
          "updatedAt": "..."
      }
    ]
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.get('/products', { headers: { token }})
  ```

----
## Update Products
`Update products for admin`

* **URL**
  
  /products/:id

* **METHOD**
  
  `PUT`

* **DATA PARAMS**

  * **HEADERS**

    `token: string`

  * **BODY**
    ```json
      {
        "name": "string",
        "image_url": "string",
        "price": "integer",
        "stock": "integer"
      }
      ```

* **SUCCESS RESPONSE**
  
  * **Code:** 201
    
    **CONTENT**
    ```json
    {
      "msg": "Product has been updated."
    }
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.put('/products/:id', { headers: { token }})
  ```

----
## Delete Products
`Delete products for admin`

* **URL**
  
  /products/:id

* **METHOD**
  
  `DELETE`

* **DATA PARAMS**

  * **HEADERS**

    `token: string`


* **SUCCESS RESPONSE**
  
  * **Code:** 200
    
    **CONTENT**
    ```json
    {
      "msg": "Product deleted."
    }
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.delete('/products/:id', { headers: { token }})
  ```

----
## Create Product
`Create product for admin only`

* **URL**
  
  /banners

* **METHOD**
  
  `POST`


* **DATA PARAMS**

  * **HEADERS**

    `token: string`

  * **BODY**
    ```json
      {
        "title": "string",
        "image_url": "string",
        "status": "boolean"
      }
      ```

* **SUCCESS RESPONSE**
  
  * **Code:** 201
    
    **CONTENT**
    ```json
    {
        "id": 29,
        "title": "Among Us: Crewmate Tee (Black, Adults)",
        "image_url": "https://cdn.shopify.com/s/files/1/0348/4293/5355/products/crewmate-jetblack_2048x2048.png",
        "status": true,
        "updatedAt": "2020-11-14T01:39:02.567Z",
        "createdAt": "2020-11-14T01:39:02.567Z"
    }
    ```

* **ERROR RESPONSE**
  
  * **Code:**  401
      
    **CONTENT**
    ```json
    {
      "msg": "Unauthorized!"
    }
    ```

    OR

    ```json
    {
      "error": "Internal Server Error"
    }
    ```

* **SAMPLE CALL**
  ```js
  axios.post('/banners', payload, { headers: { token }})
  ```

----
## Read Banners
`Read Banners`

* **URL**
  
  /banners

* **METHOD**
  
  `GET`

* **DATA PARAMS**
  
    * **HEADERS**

      `token: string`

* **SUCCESS RESPONSE**
  
  * **Code:** 200
    
    **CONTENT**
    ```json
    [
      {
          "id": 1,
          "title": "Among Us Banner",
          "image_url": "https://res09.bignox.com/appcenter/id/2020/08/banner_AmongUs.jpg",
          "status": true,
          "createdAt": "2020-11-13T21:55:20.987Z",
          "updatedAt": "2020-11-13T23:31:08.442Z"
      },
      {
          "id": "..",
          "title": "...",
          "image_url": "...",
          "status": "...",
          "createdAt": "...",
          "updatedAt": "..."
      }
    ]
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.get('/banners', { headers: { token }})
  ```

----
## Update Banners
`Update banners for admin`

* **URL**
  
  /banners/:id

* **METHOD**
  
  `PUT`

* **DATA PARAMS**

  * **HEADERS**

    `token: string`

  * **BODY**
    ```json
      {
        "title": "string",
        "image_url": "string",
        "status": "boolean",
      }
      ```

* **SUCCESS RESPONSE**
  
  * **Code:** 201
    
    **CONTENT**
    ```json
    {
      "msg": "Banner has been updated."
    }
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.put('/banners/:id', { headers: { token }})
  ```

----

## Delete Banner
`Delete Banner for admin`

* **URL**
  
  /products/:id

* **METHOD**
  
  `DELETE`

* **DATA PARAMS**

  * **HEADERS**

    `token: string`


* **SUCCESS RESPONSE**
  
  * **Code:** 200
    
    **CONTENT**
    ```json
    {
      "msg": "Banner deleted."
    }
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


  **SAMPLE CALL**
    ```js
    axios.delete('/banners/:id', { headers: { token }})
    ```

----
## Read Carts
`Read carts`

* **URL**
  
  /carts

* **METHOD**
  
  `GET`

* **DATA PARAMS**
  
    * **HEADERS**

      `token: string`

* **SUCCESS RESPONSE**
  
  * **Code:** 200
    
    **CONTENT**
    ```json
    [
        {
            "id": 138,
            "ProductId": 7,
            "qty": 1,
            "Product": {
                "id": 7,
                "name": "Among Us: Crewmate Tee (Pink, Adults)",
                "image_url": "https://cdn.shopify.com/s/files/1/0348/4293/5355/products/crewmate-candypink_2048x2048.png",
                "price": 100000,
                "stock": 49,
                "createdAt": "2020-11-17T05:03:53.382Z",
                "updatedAt": "2020-11-19T02:02:34.179Z"
            }
        },
        {
            "id": "...",
            "ProductId": "...",
            "qty": "...",
            "Product": {
                "id": "...",
                "name": "...)",
                "image_url": "...",
                "price": "...",
                "stock": "...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
    ]
    ```
  
* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.get('/carts', { headers: { token }})
  ```

----
## Create Cart
`Find or Create Cart`

* **URL**
  
  /carts

* **METHOD**
  
  `POST`


* **DATA PARAMS**

  * **HEADERS**

    `token: string`

  * **BODY**
    ```json
      {
        "ProductId": "integer"
      }
      ```

* **SUCCESS RESPONSE**
  
  * **Code:** 201
    
    **CONTENT**
    ```json
    [
      {
          "id": 138,
          "ProductId": 7,
          "UserId": 2,
          "qty": 1
      },
      false
    ]
    ```
  note: `This rest API is using find or create, and just returning data as mention above.`
* **ERROR RESPONSE**
  
  * **Code:**  401
      
    **CONTENT**
    ```json
    {
      "msg": "Unauthorized!"
    }
    ```

    OR

    ```json
    {
      "error": "Internal Server Error"
    }
    ```

* **SAMPLE CALL**
  ```js
  axios.post('/carts', payload, { headers: { token }})
  ```

----
## Update Cart Qty
`Update Cart Qty`

* **URL**
  
  /carts/:id

* **METHOD**
  
  `PATCH`

* **DATA PARAMS**

  * **HEADERS**

    `token: string`

  * **BODY**
    ```json
      {
        "qty": "integer"
      }
      ```

* **SUCCESS RESPONSE**
  
  * **Code:** 201
    
    **CONTENT**
    ```json
    [
      {
          "UserId": 2,
          "ProductId": 7,
          "qty": 7,
          "checked_out": false,
          "createdAt": "2020-11-19T05:30:26.198Z",
          "updatedAt": "2020-11-19T05:46:23.617Z"
      }
    ]
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.put('/cart/:id', {qty}, { headers: { token }})
  ```

----
## Checkout Cart
`Update checked_out status`

* **URL**
  
  /carts

* **METHOD**
  
  `PATCH`

* **DATA PARAMS**

  * **HEADERS**

    `token: string`


* **SUCCESS RESPONSE**
  
  * **Code:** 200
    
    **CONTENT**
    ```json
    [
        {
            "UserId": 2,
            "ProductId": 7,
            "qty": 7,
            "checked_out": false,
            "createdAt": "2020-11-19T05:30:26.198Z",
            "updatedAt": "2020-11-19T05:46:23.617Z",
            "Product": {
                "id": 7,
                "name": "Among Us: Crewmate Tee (Pink, Adults)",
                "image_url": "https://cdn.shopify.com/s/files/1/0348/4293/5355/products/crewmate-candypink_2048x2048.png",
                "price": 100000,
                "stock": 49,
                "createdAt": "2020-11-17T05:03:53.382Z",
                "updatedAt": "2020-11-19T02:02:34.179Z"
            }
        }
    ]
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.patch('/cart', {}, { headers: { token }})
  ```

----
## Fetch History
`Read Cart by checked_out status is true`

* **URL**
  
  /carts/history

* **METHOD**
  
  `GET`

* **DATA PARAMS**
  
    * **HEADERS**

      `token: string`

* **SUCCESS RESPONSE**
  
  * **Code:** 200
    
    **CONTENT**
    ```json
    [
        {
            "id": 59,
            "UserId": 2,
            "ProductId": 3,
            "qty": 1,
            "updatedAt": "2020-11-18T13:37:17.984Z",
            "Product": {
                "id": 3,
                "name": "Among Us: Mini Crewmate Pocket Tee (Adult, Black)",
                "image_url": "https://cdn.shopify.com/s/files/1/0348/4293/5355/products/pocketcrew_black_2048x2048.png",
                "price": 100000,
                "stock": 12,
                "createdAt": "2020-11-17T05:03:53.382Z",
                "updatedAt": "2020-11-19T04:09:03.209Z"
            }
        },
        {
            "id": 60,
            "UserId": 2,
            "ProductId": 4,
            "qty": 1,
            "updatedAt": "2020-11-18T13:37:17.984Z",
            "Product": {
                "id": 4,
                "name": "Among Us: Impostor Incognito Tee",
                "image_url": "https://cdn.shopify.com/s/files/1/0348/4293/5355/products/shirt_impostor_Web_3b4ca106-ce19-403d-adf1-de9ff795707d_2048x2048.png",
                "price": 100000,
                "stock": 39,
                "createdAt": "2020-11-17T05:03:53.382Z",
                "updatedAt": "2020-11-19T04:09:03.209Z"
            }
        }
    ]
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.get('/carts/history', { headers: { token }})
  ```

----
## Delete Cart
`Delete Cart`

* **URL**
  
  /carts/:id

* **METHOD**
  
  `DELETE`

* **DATA PARAMS**

  * **HEADERS**

    `token: string`


* **SUCCESS RESPONSE**
  
  * **Code:** 200
    
    **CONTENT**
    ```json
    {
      "msg": "Cart deleted."
    }
    ```

* **ERROR RESPONSE**
  
  * **Code:**  500
      
    **CONTENT**
    ```json
    {
      "error": "Internal Server Error"
    }
    ```


* **SAMPLE CALL**
  ```js
  axios.delete('/carts/:id', { headers: { token }})
  ```

----