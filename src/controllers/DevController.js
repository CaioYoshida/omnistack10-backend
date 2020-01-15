const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async index (req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async show(req, res) {
    const dev = await Dev.findById(req.params.id);

    console.log(req.params.id);

    return res.json(dev);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const devExist = await Dev.findOne({ github_username });

    if (devExist) {
      return res.status(401).json({ error: 'User already exists' });
    }
  
    const response = await axios.get(`https://api.github.com/users/${github_username}`)
  
    const { name, avatar_url, bio } = response.data;
  
    const techsArray = techs.split(',').map(tech => tech.trim());
  
    const location = {
      type : "Point",
      coordinates : [
        longitude,
        latitude
      ]
    }
  
    const dev = await Dev.create({
      name,
      github_username,
      avatar_url,
      bio,
      techs: techsArray,
      location
    })
    
    return res.json(dev);
  },

  async update(req, res) {
    const { name, bio, techs, latitude, longitude } = req.body;
    
    const techsArray = techs.split(',').map(tech => tech.trim());

    const location = {
      type: "Point",
      coordinates: [
        longitude,
        latitude
      ]
    };

    const dev = await Dev.findByIdAndUpdate(req.params.id, {
      name,
      bio,
      techs: techsArray,
      location
    });

    return res.json(dev);
  },

  async destroy(req, res) {
    try {
      await Dev.findByIdAndDelete(req.params.id);

      res.json({ message: 'Removed successfully' });
    } catch (err) {
      res.json({ error: `${err}` });
    }
  }
}