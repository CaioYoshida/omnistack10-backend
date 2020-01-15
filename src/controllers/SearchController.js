const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    // Search devs from 10km range
    // tech filer

    const { latitude, longitude, techs } = req.query;

    const techsArray = techs.split(',').map(tech => tech.trim());

    const devs = await Dev.find({
      // $in is a query operator of mongoose
      // $maxDistance is the distance in meters
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    })

    return res.json(devs);
  }
}