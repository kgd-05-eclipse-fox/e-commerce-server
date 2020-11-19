const { Wishlist, Product } = require('../models')

class WishlistController {
  static async getWishlist(req, res, next) {
    try {
      const wishlists = await Wishlist.findAll({
        where: {
          user_id: req.loggedIn.id
        }, include: Product
      })
      res.status(200).json(wishlists)
    } catch(err) {{
      next(err)
    }}
  }

  static async addToWishlist(req, res, next) {
    try {
      const user_id = req.loggedIn.id;
      const { product_id } = req.body;
      const newWishlist = await Wishlist.create({
        user_id, product_id
      })
      res.status(201).json(newWishlist)
    } catch(err) {
      next(err)
    }
  }

  static async deleteWishlist(req, res, next) {
    try {
      const user_id = req.loggedIn.id
      const product_id = req.params.id
      await Wishlist.destroy({
        where: {
          user_id, product_id
        }
      })
      res.status(200).json({message: 'Success delete wishlist'})
    } catch(err) {
      next(err)
    }
  }
}

module.exports = WishlistController