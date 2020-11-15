# e-commerce-server

**Server URL** https://e-commerce-server-akbarhabiby.herokuapp.com/
> Deployed on Nov 14 2020

**Show All Products**
----
  Returns json data from all products.

* **URL**

  /product

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Request Headers**

   None

* **Request Body:**

   None

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:**
    ```json
    {
        "products": [
          {
            "id": 4,
            "name": "Apple iPhone 12",
            "image_url": "https://media.wired.com/photos/5fa5e735ba670daaf8e97a91/master/w_2560%2Cc_limit/GEAR-MAX-Apple-iPhone-12-Pro-Max-SOURCE-Apple.jpg",
            "price": 20000000,
            "stock": 2,
            "createdAt": "2020-11-11T12:41:02.425Z",
            "updatedAt": "2020-11-11T12:41:02.425Z"
        }
      ]
    }
    ```
 
* **Error Response:**

  `If error from server`

  * **Code:** 500 **Internal Server Error** <br />
    **Content:**
    ```json
    {
        "message": "Internal Server Error"
    }
    ```

**Create Product**
----
  Returns json data after creating new Product.

* **URL**

  /product

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Request Headers**

   * **Content:**
    ```json
    {
        "access_token": "< string >"
    }
    ```

* **Request Body:**

  * **Content:**
    ```json
    { 
        "name": "Apple iPhone 12 Pro Max",
        "image_url": "https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90",
        "price": 20000000,
        "stock": 5
    }
    ```

* **Success Response:**

  * **Code:** 201 **Created** <br />
    **Content:** 
    ```json
    {
        "name": "Apple iPhone 12 Pro Max",
        "image_url": "https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90",
        "price": 20000000,
        "stock": 5,
        "id": 13
    }
    ```
 
* **Error Response:**

  `Create Product without access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Create Product except admin access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Create with Empty Product Name`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
       "message": ["Name cannot be empty"]
    }
    ```

  `Create with Empty Product Image URL`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Image URL cannot be empty",
            "Input should be an URL"
        ]
    }
    ```

  `Create with Empty Product Price`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Price cannot be empty",
            "Price should be a number"
        ]
    }
    ```

  `Create with Empty Product Stock`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Stock cannot be empty",
            "Stock should be a number"
        ]
    }
    ```

  `Create Product Stock with value minus`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Stock cannot be minus"
        ]
    }
    ```

  `Create Product Price with value minus`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Price cannot be minus"
        ]
    }
    ```

  `Create Product Price with incorrect data type`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Price should be a number"
        ]
    }
    ```

  `If error from server`

  * **Code:** 500 **Internal Server Error** <br />
    **Content:**
    ```json
    {
        "message": "Internal Server Error"
    }
    ```


**Update Product**
----
  Returns json data after updating a Product.

* **URL**

  /product/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Request Headers**

   * **Content:**
    ```json
    {
        "access_token": "< string >"
    }
    ```

* **Request Body:**

  * **Content:**
    ```json
    { 
        "name": "Apple iPhone 12 Pro Max",
        "image_url": "https://awsimages.detik.net.id/community/media/visual/2020/10/14/iphone-12-pro-3_169.jpeg?w=700&q=90",
        "price": 23000000,
        "stock": 8
    }
    ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "message": "Product successfully updated"
    }
    ```
 
* **Error Response:**

  `Update Product without access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Update Product except admin access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Update with Empty Product Name`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
       "message": ["Name cannot be empty"]
    }
    ```

  `Update with Empty Product Image URL`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Image URL cannot be empty",
            "Input should be an URL"
        ]
    }
    ```

  `Update with Empty Product Price`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Price cannot be empty",
            "Price should be a number"
        ]
    }
    ```

  `Update with Empty Product Stock`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Stock cannot be empty",
            "Stock should be a number"
        ]
    }
    ```

  `Update Product Stock with value minus`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Stock cannot be minus"
        ]
    }
    ```

  `Update Product Price with value minus`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Price cannot be minus"
        ]
    }
    ```

  `Update Product Price with incorrect data type`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Price should be a number"
        ]
    }
    ```

  `Update Product with random id (not found)`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Product not found"
        ]
    }
    ```

  `If error from server`

  * **Code:** 500 **Internal Server Error** <br />
    **Content:**
    ```json
    {
        "message": "Internal Server Error"
    }
    ```

**Delete Product**
----
  Return a message after success deleting Product.

* **URL**

  /product/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Request Headers**

   * **Content:**
    ```json
    {
        "access_token": "< string >"
    }
    ```

* **Request Body:**

   None

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "message": "Product has been deleted"
    }
    ```
 
* **Error Response:**

  `Delete Product without access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Delete Product except admin access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Delete Product with random id (not found)`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:**
    ```json
    {
        "message": "Product not found"
    }
    ```

  `If error from server`

  * **Code:** 500 **Internal Server Error** <br />
    **Content:**
    ```json
    {
        "message": "Internal Server Error"
    }
    ```

**Admin Login**
----
  Return a message after an Admin has successfully logged in.

* **URL**

  /cms-admin

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Request Headers**

   None

* **Request Body:**

   * **Content:**
    ```json
    {
        "email": "admin@mail.com", "password": "1234"
    }
    ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "access_token": "< string >",
        "email": "admin@mail.com"
    }
    ```
 
* **Error Response:**

  `Wrong Admin Password`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Wrong email or password" 
    }
    ```

  `Wrong Admin Email`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Wrong email or password" 
    }
    ```

  `Login Admin with empty field`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Please complete all form" 
    }
    ```

  `If error from server`

  * **Code:** 500 **Internal Server Error** <br />
    **Content:**
    ```json
    {
        "message": "Internal Server Error"
    }
    ```


**User Register**
----
  Return a message after an Customer has successfully registed.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Request Headers**

   None

* **Request Body:**

   * **Content:**
    ```json
    {
        "email": "anotheruser@user.com",
        "password": "user"
    }
    ```

* **Success Response:**

  * **Code:** 201 **Created** <br />
    **Content:** 
    ```json
    {
        "email": "anotheruser@user.com"
    }
    ```
 
* **Error Response:**

  `Register with Used User Email`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Email is already used"
        ]
    }
    ```

  `Register with Empty User Email`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Email cannot be empty",
            "Input should be an email"
        ]
    }
    ```

  `Register with Invalid User Input Email`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
       "message": ["Input should be an email"]
    }
    ```

  `Register with Empty User Password`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Password cannot be empty",
            "Passwords must be between 4 and 20 characters long"
        ]
    }
    ```

  `Register with Empty User Password`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": [
            "Password cannot be empty",
            "Passwords must be between 4 and 20 characters long"
        ]
    }
    ```

  `Register User Password with below 4 length`

  * **Code:** 500 **Internal Server Error** <br />
    **Content:**
    ```json
    {
        "message": ["Passwords must be between 4 and 20 characters long"]
    }
    ```

  `Register User Password with more than 20 length`

  * **Code:** 500 **Internal Server Error** <br />
    **Content:**
    ```json
    {
        "message": ["Passwords must be between 4 and 20 characters long"]
    }
    ```

  `If error from server`

  * **Code:** 500 **Internal Server Error** <br />
    **Content:**
    ```json
    {
        "message": "Internal Server Error"
    }
    ```

**User Login**
----
  Return a message after an Customer has successfully logged in.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Request Headers**

   None

* **Request Body:**

   * **Content:**
    ```json
    {
        "email": "admin@mail.com",
        "password": "1234"
    }
    ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "id": "3",
        "email": "admin@mail.com"
    }
    ```
 
* **Error Response:**

  `Wrong User Email`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": "Wrong email or password"
    }
    ```

  `Wrong User Password`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": "Wrong email or password"
    }
    ```

  `Login User with empty field`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
        "message": "Please complete all form"
    }
    ```

  `If error from server`

  * **Code:** 500 **Internal Server Error** <br />
    **Content:**
    ```json
    {
        "message": "Internal Server Error"
    }
    ```
