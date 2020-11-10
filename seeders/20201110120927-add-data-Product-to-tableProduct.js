'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dataProduct = [
      {
        name: 'Nami One Piece Action FIgure BWFC',
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/3/7/441611/441611_33f67cb3-71fc-49bc-b35f-a3f78232ad18_800_800',
        price: 100000000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
   await queryInterface.bulkInsert('Products', dataProduct, {})
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Products', null, {});
  }
};
