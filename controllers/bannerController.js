const { Banner } = require('../models/index');

class BannerController {
  static async getBanners(req, res, next) {
    try {
      const banners = await Banner.findAll();
      res.status(200).json(banners);
    } catch(err) {
      next(err);
    }
  }

  static async showActive(req, res, next) {
    try {
      const banners = await Banner.findAll({
        where: {
          status: 'Active'
        }
      });
      res.status(200).json(banners);
    } catch(err) {
      next(err)
    }
  }

  static async addBanner(req, res, next) {
    try {
      const { title, image_url } = req.body;
      const newBanner = await Banner.create({
        title, image_url, status: 'Inactive'
      });
      res.status(201).json(newBanner);
    } catch(err) {
      next(err);
    }
  }

  static async editBanner(req, res, next) {
    try {
      const { title, image_url, status } = req.body;
      const editedBanner = await Banner.update({
        title, image_url, status
      }, {
        where: {
          id: req.params.id
        }, 
        returning: true
      });
      res.status(200).json(editedBanner[1]);
    } catch(err) {
      next(err);
    }
  }

  static async changeBannerStatus(req, res, next) {
    try {
      const { status } = req.body;
      const statusChangedBanner = await Banner.update({
        status
      }, {
        where: {
          id: req.params.id
        },
        returning: true
      });
      res.status(200).json(statusChangedBanner[1]);
    } catch(err) {
      next(err);
    }
  }

  static async deleteBanner(req, res, next) {
    try {
      const destroyed = await Banner.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(200).json({message: 'Success delete banner'});
    } catch(err) {
        next(err);
    }
  }
}

module.exports = BannerController;