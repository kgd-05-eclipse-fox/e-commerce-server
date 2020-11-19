'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   const products = [
     {
       name: 'Air Jordan Mid',
       image_url: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/db20dcce-723e-42de-b83a-75d8da072045/air-jordan-1-mid-se-shoe-xnGlQq.jpg',
       price: 1900000,
       stock: 7
     },
     {
      name: 'Kyrie 7 EP',
      image_url: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e1df8840-6e7d-4362-b3c7-744108e8ddc9/kyrie-7-ep-basketball-shoe-kMwm27.jpg',
      price: 2000000,
      stock: 8
    },
    {
      name: 'Nike Blazer Mid',
      image_url: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f661de64-f3f0-4b41-b6d8-df2d887257c4/blazer-mid-77-infinite-shoe-dCp5Mm.jpg',
      price: 1650000,
      stock: 9
    },
    {
      name: 'Nike Air Max 95',
      image_url: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/35477569-8390-429d-81d6-1681c92b3f23/air-max-95-essential-shoe-R8WBq5.jpg',
      price: 2350000,
      stock: 10
    },
    {
      name: 'Nike Air Zoom Black',
      image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-7c15a559-3af1-4d96-b703-90a8e8125908/air-zoom-superrep-hiit-class-shoe-sdWCtF.jpg',
      price: 1500000,
      stock: 11
    },
    {
      name: 'Nike Moon Shoe',
      image_url: 'https://s.abcnews.com/images/US/nike-01-ht-jt-190712_hpEmbed_5x3_992.jpg',
      price: 5000000,
      stock: 12
    },
    {
      name: 'Nike SB Zoom',
      image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fambaubeufwpravdy1xs/sb-zoom-blazer-mid-skate-shoe-qX3MZV.jpg',
      price: 2000000,
      stock: 13
    },
    {
      name: 'Nike AF 1',
      image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f4e79393-68ae-4579-b694-12b0daf70a6e/air-force-1-shadow-shoe-mN8Glx.jpg',
      price: 4000000,
      stock: 8
    }
   ]
   products.forEach((element) => {
     element.createdAt = new Date()
     element.updatedAt = new Date()
     return element
   })
   return queryInterface.bulkInsert('Products', products, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {}) 
  }
};
