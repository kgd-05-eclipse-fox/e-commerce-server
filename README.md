# e-commerce-server

**Server URL** https://e-commerce-server-akbarhabiby.herokuapp.com/
> Deployed on Nov 14 2020

## List of Available Endpoints

**User Routes**. Admin can only **Login**, **Register** via _Seeding on Sequelize_

| Method | Route      | Description           |
| ------ | -----------| --------------------- |
| POST   | /cms-admin | Admin **Login**       |
| POST   | /login     | Customer **Login**    |
| POST   | /register  | Customer **Register** |

**Product Routes**

| Method | Route            | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | /product         | **Get** All Products     |
| POST   | /product         | **Create** New Product   |
| PUT    | /product/:id     | **Edit** Product by Id   |
| DELETE | /product/:id     | **Delete** Product by Id |

**Cart Routes**

| Method | Route           | Description                                                                |
| ------ | --------------- | -------------------------------------------------------------------------- |
| GET    | /cart           | **Get** current Customer Cart                                              |
| POST   | /cart/:id       | **Create** Product or Update Product Quantity into current Customer Cart   |
| PUT    | /cart/checkout  | **Checkout** current Customer Cart                                         |
| PATCH  | /cart/:id       | **Increment** _or_ **Decrement** Product Quantity in current Customer Cart |
| DELETE | /cart/:id       | **Delete** current Customer Cart                                           |

**History Route**

| Method | Route      | Description                                  |
| ------ | ---------- | -------------------------------------------- |
| GET    | /history   | **Get** current Customer Transaction History |

---

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

   None

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

**Show Cart**
----
  Returns json data from all of my carts.

* **URL**

  /cart

* **Method:**

  `GET`
  
*  **URL Params**

   None

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
        "myCarts": [
            {
                "id": 4,
                "UserId": 3,
                "ProductId": 5,
                "qty": 2,
                "Product": {
                    "id": 5,
                    "name": "Permen Cha Cha",
                    "image_url": "https://cf.shopee.co.id/file/99a8e75400a0a73667d3813203137edb",
                    "price": 1500,
                    "stock": 996,
                    "createdAt": "2020-11-14T14:35:10.775Z",
                    "updatedAt": "2020-11-19T06:00:39.503Z"
                }
            }
        ],
        "totalPrice": 3000
    }
    ```

* **Error Response:**

  `Get Cart without access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
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

**Add Product to Cart**
----
  Returns json data after Inserting or Adding Product Qty to Cart.

* **URL**

  /cart/:id

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

   None

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "message": "Cart successfully added"
    }
    ```

    OR

    ```json
    {
        "message": "Successfuly Added Cart Quantity"
    }
    ```
    After Added Cart Quantity

* **Error Response:**

  `Insert a Product without access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Inserting an Out of stock product to Cart`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
       "message": "Out of stock" 
    }
    ```

   `Updating a product exceeds the available stock`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
       "message": "Exceeds the available stock" 
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

**Updating Quantity of a Product in Cart**
----
  Return a message after an Cart Quantity has successfully updated.

* **URL**

  /cart/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

* **Request Headers**

   * **Content:**
    ```json
    {
        "access_token": "< string >"
    }
    ```

* **Request Body:**

   ```json
   {
        "increment": true
   }
   ```
   To Increment Qty of product in cart

   OR

   ```json
   {
        "increment": false
   }
   ```
   To Decrement Qty of product in cart

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "message": "Successfuly Updated Cart Quantity"
    }
    ```

* **Error Response:**

  `Updating a Product without access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Updating a Product except the Cart ownership`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Updating a product exceeds the available stock`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
       "message": "Exceeds the available stock" 
    }
    ```

   `Updating a product Less than available stock`

  * **Code:** 400 **Bad Request** <br />
    **Content:** 
    ```json
    {
       "message": "Less than available stock" 
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

**Checkout a Cart**
----
  Return a message after successfully checkout-ing the Cart.

* **URL**

  /cart/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   None

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
        "carts": [
            {
                "id": 4,
                "UserId": 3,
                "ProductId": 5,
                "qty": 2,
                "Product": {
                    "id": 5,
                    "name": "Permen Cha Cha",
                    "image_url": "https://cf.shopee.co.id/file/99a8e75400a0a73667d3813203137edb",
                    "price": 1500,
                    "stock": 996,
                    "createdAt": "2020-11-14T14:35:10.775Z",
                    "updatedAt": "2020-11-19T06:00:39.503Z"
                }
            }
        ]
   }
   ```

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
        "message": "Successfully Checkout All Products"
    }
    ```

* **Error Response:**

  `Checkout without access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
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

**Delete Cart**
----
  Return a message after success deleting a product in Cart.

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
        "message": "Successfuly Deleted Cart"
    }
    ```
 
* **Error Response:**

  `Delete Cart without access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Delete Cart except the Cart ownership`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
    }
    ```

  `Delete Cart with random id (not found)`

  * **Code:** 404 **NOT FOUND** <br />
    **Content:**
    ```json
    {
        "message": "Cart not found"
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

**Show Transaction History**
----
  Returns json data from all of transaction history.

* **URL**

  /history

* **Method:**

  `GET`
  
*  **URL Params**

   None

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
        "myHistory": [
            {
                "id": 2,
                "UserId": 3,
                "name": "Apple iPhone 12 Pro Max",
                "image_url": "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-max-gold-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021660000",
                "total_price": 27000000,
                "qty": 1,
                "createdAt": "2020-11-19T06:04:25.169Z",
                "updatedAt": "2020-11-19T06:04:25.169Z"
            },
            {
                "id": 1,
                "UserId": 3,
                "name": "Permen Cha Cha",
                "image_url": "https://cf.shopee.co.id/file/99a8e75400a0a73667d3813203137edb",
                "total_price": 4500,
                "qty": 3,
                "createdAt": "2020-11-19T06:00:39.510Z",
                "updatedAt": "2020-11-19T06:00:39.510Z"
            }
        ]
    }
    ```

* **Error Response:**

  `Get Transaction History without access token`

  * **Code:** 401 **Unauthorized** <br />
    **Content:** 
    ```json
    {
       "message": "Unauthorized" 
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