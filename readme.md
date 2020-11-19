https://einkofen.web.app/

*POST REGISTER**
----
* **URL**

  /register

* **Method:**
  
  `POST` 

  **Required:**

    ```json
    body = { "email": "string", "password": "string"}
    
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json 
    {
    "id": 2,
    "email": "customer@mail.com"
    }
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json

    { "message": "Please fill the empty column" }

**POST LOGIN ADMIN**
----
* **URL**

  /login/admin

* **Method:**
  
  `POST` 

  **Required:**

    ```json
    body = { "email": "string", "password": "string"}
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json 
    {"access_token": "[string]"}
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "msg": "Invalid email/password"}

**Fetch All Products**
----
  return all available products on server

* **URL**

  /products

* **Method:**
  
  `GET` 

* **Data Params**
  **Required:**
  ```json
  "headers" : { "token": "string" }
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "product": [
        {
            "id": 1,
            "name": "T-Shirt Guns n Roses",
            "image_url": "https://cf.shopee.co.id/file/6210c58145da7b09f22f44e9531154c6",
            "price": 150000,
            "stock": 5,
            "createdAt": "2020-11-11T10:36:01.453Z",
            "updatedAt": "2020-11-11T10:36:01.453Z"
        },
        {
            "id": 2,
            "name": "T-Shirt Bon Jovi",
            "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/7/21/16841460/16841460_90464c88-6e70-48b3-b437-9aa813ab9b62_1000_988.jpg",
            "price": 100000,
            "stock": 10,
            "createdAt": "2020-11-11T10:36:59.878Z",
            "updatedAt": "2020-11-11T10:36:59.878Z"
        }
    ]
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```json
    { "msg": "Authentication failed"}

**POST PRODUCT**
----
* **URL**

  /products

* **Method:**
  
  `POST` 

* **Data**
  **Required:**
  ```json
  "headers" : { "token" : "string" }

  "body" : { "name": "string","image_url": "string", "price": "integer", "stock": "integer" } 

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json 
    {
    "id": 24,
    "name": "Nike Classic Cortez",
    "image_url": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c6081451-e5e6-44a2-a4f4-21558717782f/classic-cortez-shoe-GdrCtp.jpg",
    "price": 2500000,
    "stock": 3,
    "updatedAt": "2020-11-17T03:16:37.239Z",
    "createdAt": "2020-11-17T03:16:37.239Z"
    }
 
* **Error Response:**

 * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Please fill the empty column" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "Not Authorized" }`

  * **Code:** 500 INTERNAL SERVER ERRORS <br />
    **Content:** `{message: Internal server errors}`

**Fetch All Product By Id**
----
  return all available products on server

* **URL**

  /products/:id

* **Method:**
  
  `GET` 

* **Data Params**
    id = integer

  **Required:**
  ```json
  "headers" : { "token": "string" }
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
    "id": 7,
    "name": "Nike Airmax 270",
    "image_url": "https://cdn.vox-cdn.com/thumbor/RtG_D3ApmcjALWMmRh6YsCe4_ck=/0x0:1400x1000/1200x800/filters:focal(588x388:812x612)/cdn.vox-cdn.com/uploads/chorus_image/image/64134340/sneaker5.0.jpeg",
    "price": 5000000,
    "stock": 4,
    "createdAt": "2020-11-11T13:42:35.398Z",
    "updatedAt": "2020-11-14T04:18:00.384Z"
    }
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "Not Authorized" }`

  * **Code:** 500 INTERNAL SERVER ERRORS <br />
    **Content:** `{message: Internal server errors}`

**UPDATE PRODUCT**
----
  return the newest data that just been updated

* **URL**

  /product/:id

* **Method:**
  
  `PUT` 
  
   **Required:**
 
   `id=integer`

*  **Data Params**

   **Required:**
   ```json
   "headers" : { "token" : "string" }
   
   "body" : { "name": "string","image_url": "string", "price": "integer", "stock": "integer" } 


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { "message": "The product has been updated" }
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Please fill the empty column" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Authentication failed" }`

  * **Code:** 500 INTERNAL SERVER ERRORS <br />
    **Content:** `{message: Internal server errors}`

**DELETE PRODUCT**
----
* **URL**

  /products/:id

* **Method:**

  `DELETE` 
  
  **Required:**
 
  `id=[integer]`

  ```json
  "headers": { "token" : "string" }
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message: Product has been deleted }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERRORS <br />
    **Content:** `{ message: Internal server errors }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Product is not found" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Not Authorized" }`

**Fetch All Carts**
----
  return all available carts on server

* **URL**

  /carts

* **Method:**
  
  `GET` 

* **Data Params**
  **Required:**
  ```json
  "headers" : { "token": "string" }
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      {
        "id": 1,
        "quantity": 1,
        "Product": {
          "id": 1,
          "name": "Air Jordan Mid",
          "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/db20dcce-723e-42de-b83a-75d8da072045/air-jordan-1-mid-se-shoe-xnGlQq.jpg",
          "price": 1900000,
          "stock": 7
        }
      }
    ]
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Not Authorized" }`
  * **Code:** 500 INTERNAL SERVER ERRORS <br />
    **Content:** `{ message: Internal server errors }`

**POST CARTS**
----
* **URL**

  /carts/:id

* **Method:**
  
  `POST` 

* **Data**
  **Required:**
  ```json
  "headers" : { "token" : "string" }

**Params**
  id = integer
  
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json 
    {
      "ProductId": 1,
      "UserId": 2,
      "quantity": 1,
      "updatedAt": "2020-11-19T02:21:38.493Z",
      "createdAt": "2020-11-19T02:21:38.493Z"
    }
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "Not Authorized" }`

  * **Code:** 500 INTERNAL SERVER ERRORS <br />
    **Content:** `{message: Internal server errors}`


**UPDATE INCREMENT QUANTITY**
----
  return the newest data that just been updated

* **URL**

  /carts/:id

* **Method:**
  
  `PATCH` 
  
   **Required:**
 
   `id=integer`

*  **Data Params**

   **Required:**
   ```json
   "headers" : { "token" : "string" }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { "message": "Cart has been updated" }
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Authentication failed" }`

  * **Code:** 500 INTERNAL SERVER ERRORS <br />
    **Content:** `{message: Internal server errors}`

**UPDATE DECREMENT QUANTITY**
----
  return the newest data that just been updated

* **URL**

  /carts/:id

* **Method:**
  
  `PATCH` 
  
   **Required:**
 
   `id=integer`

*  **Data Params**

   **Required:**
   ```json
   "headers" : { "token" : "string" }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { "message": "Cart has been updated" }
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Authentication failed" }`

  * **Code:** 500 INTERNAL SERVER ERRORS <br />
    **Content:** `{message: Internal server errors}`

**DELETE CARTS**
----
* **URL**

  /carts/:id

* **Method:**

  `DELETE` 
  
  **Required:**
 
  `id=integer`

  ```json
  "headers": { "token" : "string" }
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message: "Cart has been deleted" }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Not Authorized" }`
    
  * **Code:** 500 INTERNAL SERVER ERRORS <br />
    **Content:** `{ message: Internal server errors }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Carts is not found" }`


