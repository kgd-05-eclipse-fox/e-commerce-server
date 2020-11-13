const { Banner } = require('../models')

class BannerController {
  static async getBanner(req, res, next) {
    try {
			const getAll = await Banner.findAll({
				order: [['id', 'ASC']]
			})
			res.status(200).json(getAll)
		} catch (err) {
			next(err)
		}
  }
  static async createBanner(req, res, next) {
    try {
			if (req.loggedInUser.role === 'admin') {
				const payLoad = {
					title: req.body.title,
          image_url: req.body.image_url,
          status: req.body.status
        }
				const addBanner = await Banner.create(payLoad)
				res.status(201).json(addBanner)
			} else {
				throw new Error('Unauthorized')
			}
		} catch (err) {
			next(err)
		}
  }
  static async updateBanner(req, res, next) {
		try {
			if (req.loggedInUser.role === 'admin') {
				const id = req.params.id
				const payLoad = {
					title: req.body.title,
          image_url: req.body.image_url,
          status: req.body.status
				}
				const update = await Banner.update(payLoad, {
					where: {
						id
					},
					returning: true
				})
				if (update[0]) {
					res.status(200).json({ msg: 'Banner has been updated.'})
				} else {
					throw new Error({msg: 'Internal Server Error!'})
				}
			}
		} catch (err) {
			next(err)
		}
  }
  static async deleteBanner(req, res, next){
    try {
			const id = +req.params.id
			if (req.loggedInUser.role === 'admin') {
				const destroy = await Banner.destroy({
					where: {
						id
					}
				})
				if (destroy) {
					res.status(200).json({ msg: 'Banner deleted.'})
				} else {
					throw new Error({ msg: 'Banner not found' })
				}
			}
		} catch (error) {
			next(error)
		}
  }
}

module.exports = BannerController