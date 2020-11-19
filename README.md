# Sainapa-Store

URL Heroku
```http
https://sainapa-store.herokuapp.com
```
FireBase
```http
https://sainapa-store.web.app
```

## e-commerce-server

* ## Login Admin

`URL`

```http
    http://localhos:3000/login/admin
```

`Method:`

    POST

`Data Params`

```s
 email=[string],
 
 password=[string]
```

`Success Response:`

```json
Code: 200 

{
    "id": 8,
    "email": "admin@mail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTc1MDk4OX0.xjfLwtzT_eST4_Eryz2Nn8tzQpiTKStuW8nW_-4nNeA"
}
```
`Error Response:`

```json
Code: 401

{
  "message": "Email atau Password tidak valid"
}

OR

Code: 401

{
    "msg": "Sorry you are not Admin"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```

-----------------------------------
* ## Register User

`URL`

```http
    http://localhos:3000/register
```

`Method:`

    POST

`Data Params`

```s
 email=[string],
 
 password=[string]
```

`Success Response:`

```json
Code: 201

{
    "id": 15,
    "email": "test123@mail.com"
}
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
  "message": "Email atau Password tidak valid"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```

-----------------------------------
* ## Login / SignIn User

`URL`

```http
    http://localhos:3000/login/customer
```

`Method:`

    POST

`Data Params`

```s
 email=[string],
 
 password=[string]
```

`Success Response:`

```json
Code: 200

{
    "id": 10,
    "email": "abrarnaim@gmail.com",
    "role": "customer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYWJyYXJuYWltQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYwNTc1MDkyMX0.6Vg8z3WF38RQu60wkLCAX9APkMqQXDbyHypQD_C4pYU"
}
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
    "msg": "Sorry you are not Customer"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```

-----------------------------------
* ## Get All Product (Admin)

`URL`

```http
    http://localhos:3000/products
```

`Method:`

    GET

`Data Params`

```s
 Empty
```

`Data Headers`
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTc1MTQ4OX0.nkaBlNmVZhqZ9ycF51UYf12d0_AN-OeYv9TZX4iCAu4"
}
```

`Success Response:`

```json
Code: 200

[
    {
        "id": 33,
        "name": "HYPERLITE SUMMIT 35",
        "image_url": "https://eigeradventure.com/media/catalog/product/cache/4fcc276cc458f0c20c7cb141f7d9fdf7/9/1/910005604002_1_2.jpg",
        "price": 909300,
        "stock": 12,
        "createdAt": "2020-11-12T00:20:57.011Z",
        "updatedAt": "2020-11-13T22:25:11.181Z"
    },
    {
        "id": 34,
        "name": "ELIPTIC-SOLARIS-45L-1A-BLK1",
        "image_url": "https://eigeradventure.com/media/catalog/product/cache/4fcc276cc458f0c20c7cb141f7d9fdf7/9/1/910005435001-ELIPTIC-SOLARIS-45L-1A-BLK1.jpg",
        "price": 1234563,
        "stock": 12,
        "createdAt": "2020-11-12T00:21:32.694Z",
        "updatedAt": "2020-11-12T00:21:32.694Z"
    }
]
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
    "msg": "Sorry you are not Admin"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```

-----------------------------------
* ## Create Product (Admin)

`URL`

```http
    http://localhos:3000/products
```

`Method:`

    Post

`Data Body`

```json
 {
    "name": "HYPERLITE SUMMIT 35",
    "image_url": "https://eigeradventure.com/media/catalog/product/cache/4fcc276cc458f0c20c7cb141f7d9fdf7/9/1/910005604002_1_2.jpg",
    "price": 909300,
    "stock": 12,
 }
```

`Data Headers`
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTc1MTQ4OX0.nkaBlNmVZhqZ9ycF51UYf12d0_AN-OeYv9TZX4iCAu4"
}
```

`Success Response:`

```json
Code: 200

[
    {
        "id": 33,
        "name": "HYPERLITE SUMMIT 35",
        "image_url": "https://eigeradventure.com/media/catalog/product/cache/4fcc276cc458f0c20c7cb141f7d9fdf7/9/1/910005604002_1_2.jpg",
        "price": 909300,
        "stock": 12,
        "createdAt": "2020-11-12T00:20:57.011Z",
        "updatedAt": "2020-11-13T22:25:11.181Z"
    },
    {
        "id": 34,
        "name": "ELIPTIC-SOLARIS-45L-1A-BLK1",
        "image_url": "https://eigeradventure.com/media/catalog/product/cache/4fcc276cc458f0c20c7cb141f7d9fdf7/9/1/910005435001-ELIPTIC-SOLARIS-45L-1A-BLK1.jpg",
        "price": 1234563,
        "stock": 12,
        "createdAt": "2020-11-12T00:21:32.694Z",
        "updatedAt": "2020-11-12T00:21:32.694Z"
    }
]
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
    "msg": "Sorry you are not Admin"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```

-----------------------------------
* ## Get All Banner (Admin)

`URL`

```http
    http://localhos:3000/banners
```

`Method:`

    GET

`Data Params`

```s
 Empty
```

`Data Headers`
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTc1MTQ4OX0.nkaBlNmVZhqZ9ycF51UYf12d0_AN-OeYv9TZX4iCAu4"
}
```

`Success Response:`

```json
Code: 200

[
    {
        "id": 2,
        "banner_url": "https://eigeradventure.com/media/weltpixel/owlcarouselslider/images/_/b/_brandsite_20201113_weekenddeals_banner1366x630.jpg",
        "category": "wanita",
        "status": "aktiv",
        "createdAt": "2020-11-14T01:41:55.713Z",
        "updatedAt": "2020-11-14T01:41:55.713Z"
    },
    {
        "id": 3,
        "banner_url": "https://eigeradventure.com/media/weltpixel/owlcarouselslider/images/_/b/_brandsite_202010_sis_movember_banner1366x630_1_.jpg",
        "category": "pria",
        "status": "not aktiv",
        "createdAt": "2020-11-14T02:20:46.330Z",
        "updatedAt": "2020-11-14T05:27:22.993Z"
    }
]
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
    "msg": "Sorry you are not Admin"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```
-----------------------------------
* ## POST All Banner (Admin)

`URL`

```http
    http://localhos:3000/banners
```

`Method:`

    POST

`Data Body`

```json
{
    "banner_url": "https://eigeradventure.com/media/weltpixel/owlcarouselslider/images/_/b/_brandsite_20201113_weekenddeals_banner1366x630.jpg",
    "category": "wanita"
}
 
```

`Data Headers`
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTc1MTQ4OX0.nkaBlNmVZhqZ9ycF51UYf12d0_AN-OeYv9TZX4iCAu4"
}
```

`Success Response:`

```json
Code: 201

[
    {
        "id": 5,
        "banner_url": "https://eigeradventure.com/media/weltpixel/owlcarouselslider/images/_/b/_brandsite_20201113_weekenddeals_banner1366x630.jpg",
        "category": "wanita",
        "updatedAt": "2020-11-19T02:51:45.333Z",
        "createdAt": "2020-11-19T02:51:45.333Z",
        "status": "aktiv"
    }
]
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
    "msg": "Sorry you are not Admin"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```
-----------------------------------
* ## Delete Banner (Admin)

`URL`

```http
    http://localhos:3000/banners/:id
```

`Method:`

    DELETE

`Data Params`

```json
{
    "id"
}
 
```

`Data Headers`
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTc1MTQ4OX0.nkaBlNmVZhqZ9ycF51UYf12d0_AN-OeYv9TZX4iCAu4"
}
```

`Success Response:`

```json
Code: 201

[
    {
        "msg": "Benner has been Deleted"
    }
]
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
    "msg": "Sorry you are not Admin"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```
-----------------------------------
* ## Post Product User (Customer)

`URL`

```http
    http://localhos:3000/userproducts
```

`Method:`

    POST

`Data Body`

```json
{
    "UserId": 9,
    "ProductId": 33
}
 
```

`Data Headers`
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTc1MTQ4OX0.nkaBlNmVZhqZ9ycF51UYf12d0_AN-OeYv9TZX4iCAu4"
}
```

`Success Response:`

```json
Code: 201

[
    {
        "id": 87,
        "UserId": 9,
        "ProductId": 33,
        "updatedAt": "2020-11-19T03:03:04.522Z",
        "createdAt": "2020-11-19T03:03:04.522Z",
        "quantity": 1
    }
]
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
    "msg": "Sorry you are not Admin"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```
-----------------------------------
* ## GET ALL Product User (Customer)

`URL`

```http
    http://localhos:3000/userproducts
```

`Method:`

    GET

`Data Body`

```json
Empty
 
```

`Data Headers`
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTc1MTQ4OX0.nkaBlNmVZhqZ9ycF51UYf12d0_AN-OeYv9TZX4iCAu4"
}
```

`Success Response:`

```json
Code: 200

[
    {
        "id": 87,
        "UserId": 9,
        "ProductId": 33,
        "quantity": 1,
        "createdAt": "2020-11-19T03:03:04.522Z",
        "updatedAt": "2020-11-19T03:03:04.522Z",
        "Product": {
            "id": 33,
            "name": "HYPERLITE SUMMIT 35",
            "image_url": "https://eigeradventure.com/media/catalog/product/cache/4fcc276cc458f0c20c7cb141f7d9fdf7/9/1/910005604002_1_2.jpg",
            "price": 909300,
            "stock": 12,
            "createdAt": "2020-11-12T00:20:57.011Z",
            "updatedAt": "2020-11-13T22:25:11.181Z"
        }
    }
]
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
    "msg": "Sorry you are not Admin"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```
-----------------------------------
* ## DELETE Product User (Customer)

`URL`

```http
    http://localhos:3000/userproducts/:id
```

`Method:`

    DELETE

`Data Params`

```json
    {
        "id"
    }
 
```

`Data Headers`
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTc1MTQ4OX0.nkaBlNmVZhqZ9ycF51UYf12d0_AN-OeYv9TZX4iCAu4"
}
```

`Success Response:`

```json
Code: 200

[
    {
        "msg": "Product has Deleted"
    }
]
```
`Error Response:`

```json
Code: 401 UNAUTHORIZED

{
    "msg": "Sorry you are not Admin"
}

OR

Code: 500 INTERNAL SERVER ERROR

{
  "message": "Internal Server Error"
}
```