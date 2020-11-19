# Ecommerce App

## **Login Admin**

Login Admin on server.

- **URL**

  /loginAdmin

- **Method:**

  `POST`

- **Request Headers**

  None

- **URL Params**

  None

- **Data Params**

  **Required:**

  `admin@mail.com`
  `1234`

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "access_token": "<your access token>"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

---

## **Add Product**

Add Product.

- **URL**

  /products

- **Method:**

  `POST`

- **Request Headers**

  ```
  {
   "access_token": "<your access token>"
  }
  ```

- **_Request Body_**
[
    {
        "name": "IPhone 11",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/7/4/1114938/1114938_d563b657-e602-4945-80e0-097225d28042_640_640.jpg",
        "price": 15000000,
        "CategoryId": 1
    }
]



- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```
    [
    {
        "name": "IPhone 11",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/7/4/1114938/1114938_d563b657-e602-4945-80e0-097225d28042_640_640.jpg",
        "price": 15000000,
        "CategoryId": 1
    }
]
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

---

- **GET Products**

> see all the Products

- **URL**

  /products

- **Method:**

  `GET`

- **_Request Header_**

```
{
      "access_token": "<your access token>"
}

```

- **_Request Body_**

```
NONE
```

- **_Response (200)_**

```
[
    {
        "name": "IPhone 11",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/7/4/1114938/1114938_d563b657-e602-4945-80e0-097225d28042_640_640.jpg",
        "price": 15000000,
        "CategoryId": 1
    },
    {
        "name": "IPhone 12",
        "image_url": "https://images.macrumors.com/t/OPSyMWSCe37pC7WFgm3HcSDpUvA=/400x0/filters:quality(90)/article-new/2019/10/iphone12lineuproundup.jpg?lossy",
        "price": 20000000,
        "CategoryId": 1
    },
    {
        "name": "Jaket Dilan",
        "image_url": "https://www.wiruji.com/wp-content/uploads/2019/07/1-63.jpg",
        "price": 300000,
        "CategoryId": 2
    },
    {
        "name": "Jaket Punk",
        "image_url": "https://i.pinimg.com/736x/a9/34/21/a93421e7ce762171ccd57e379f16b58b.jpg",
        "price": 500000,
        "CategoryId": 2
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```

---

- **EDIT Product by id**

> Edit a specific Product by id

- **URL**

  /products/:id

- **Method:**

  `PUT`

- **_Request Header_**

```
{
  "accesstoken": "<your access token>"
}
```

- **_Request Body_**
[
    {
        "name": "IPhone 11",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/7/4/1114938/1114938_d563b657-e602-4945-80e0-097225d28042_640_640.jpg",
        "price": 15000000,
        "CategoryId": 1
    }
]
```

- **_Response (200)_**
[
    {
        "name": "IPhone 12",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2020/7/4/1114938/1114938_d563b657-e602-4945-80e0-097225d28042_640_640.jpg",
        "price": 20000000,
        "CategoryId": 1
    }
]

```

- **_Response (404 - Not Found)_**

```
{
  "errors": "Product not found"
}
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```

---

## **DELETE Product **

delete a Product.

- **URL**

  /products/:id

- **Method:**

  `DELETE`

- **Request Headers**

{
  "accesstoken": "<your access token>"
}

- **URL Params**

  None

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:**
    {
    "deleted success"
    }

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Task not Found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

---

-----------------BANNER----------------

- **GET Banner**

> see all the Banners

- **URL**

  /banners

- **Method:**

  `GET`

- **_Request Header_**

```
NONE
```

- **_Request Body_**

```
NONE
```

- **_Response (200)_**

```
[
    {
        title : Iklan sampo,
        status : active,
        image_url : https://id-static.z-dn.net/files/dde/e2bd75a2f1089ef17dd9aa30bf4fe640.jpg
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```


- **ADD Banner**

> Add Banner

- **URL**

  /banners

- **Method:**

  `POST`

- **_Request Header_**

```
{
  "accesstoken": "<your access token>"
}

```

- **_Request Body_**

```
[
    {
        title : Iklan sampo,
        status : active,
        image_url : https://id-static.z-dn.net/files/dde/e2bd75a2f1089ef17dd9aa30bf4fe640.jpg
    }
]

```

- **_Response (200)_**

```
[
    {
        title : Iklan sampo,
        status : active,
        image_url : https://id-static.z-dn.net/files/dde/e2bd75a2f1089ef17dd9aa30bf4fe640.jpg
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
````


```

- **Edit Banner**

```

- **URL**

  /banners/:id

```

- **Method:**

  `PUT`

```
- **_Request Header_**

```
{
  "accesstoken": "<your access token>"
}

```

- **_Request Body_**

```
[
    {
        title : Iklan sampo,
        status : active,
        image_url : https://id-static.z-dn.net/files/dde/e2bd75a2f1089ef17dd9aa30bf4fe640.jpg
    }
]

```

- **_Response (200)_**

```
[
    {
        title : Iklan sabun,
        status : active,
        image_url : https://id-static.z-dn.net/files/dde/e2bd75a2f1089ef17dd9aa30bf4fe640.jpg
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}

- **Edit Banner Status**


```
- **URL**

  /banners/:id

```

- **Method:**

  `PATCH`

```
- **_Request Header_**


```
{
  "accesstoken": "<your access token>"
}

```
- **_Request Body_**

```
[
    {
        title : Iklan sampo,
        status : active,
        image_url : https://id-static.z-dn.net/files/dde/e2bd75a2f1089ef17dd9aa30bf4fe640.jpg
    }
]

```

- **_Response (200)_**

```
[
    {
        title : Iklan sabun,
        status : inactive,
        image_url : https://id-static.z-dn.net/files/dde/e2bd75a2f1089ef17dd9aa30bf4fe640.jpg
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}

## **DELETE Banner **

delete a Banner.

- **URL**

  /banners/:id

- **Method:**

  `DELETE`

- **Request Headers**

{
  "accesstoken": "<your access token>"
}

- **URL Params**

  None

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:**
    {
    "deleted success"
    }

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Task not Found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

---


------------------CATEGORY---------------

- **ADD Category**

> Add Category

- **URL**

  /categories

- **Method:**

  `POST`

- **_Request Header_**

```
{
  "accesstoken": "<your access token>"
}

```

- **_Request Body_**

```
[
    {
        Name : elektronik
    }
]

```

- **_Response (200)_**

```
[
    {
        Name : elektronik
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}



```
## **DELETE Category **

delete a Category.

- **URL**

  /categories/:id

- **Method:**

  `DELETE`

- **Request Headers**

{
  "accesstoken": "<your access token>"
}

- **URL Params**

  None

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:**
    {
    "deleted success"
    }

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Task not Found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`
