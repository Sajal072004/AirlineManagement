const { City } = require("../models/index");
const {Op} = require('sequelize');

class CityRepository {
  async createCity({ name }) {
    try {
      const city = await City.create({ name });
      return city;
    } catch (error) {
      console.log("something is wrong in repo layer");
      throw { error };
    }
  }

  async deleteCity(cityId) {
    try {
      await City.destroy({
        where: { id: cityId },
      });
    } catch (error) {
      console.log("error in repo layer");
      throw { error };
    }
  }

  async updateCity(cityId, data) {
    try {
      //the below approach also works but does not return the updated data;
      // const city = await City.update(data, {
      //   where: {
      //     id: cityId,
      //   },
      // });
      // return city;

      //for getting the updated value we use this

      const city = await City.findByPk(cityId);
      city.name = data.name;
      await city.save();
      return city;
    } catch (error) {
      console.log("error in repo layer");
      throw { error };
    }
  }

  async getCity(cityId) {
    try {
      const city = await City.findByPk(cityId);
      return city;
    } catch (error) {
      console.log("error in repo layer");
      throw { error };
    }
  }


  async getAllCities(filter) { //filter can be empty also
    try {
      if(filter.name) {
        const cities = await City.findAll({
          where : {
            name:{
              [Op.startsWith] : filter.name
            }
          }
        });
        return cities;
      }
      const cities = await City.findAll();
      return cities;
    } catch (error) {
      console.log("error in repo layer");
      throw { error };
    }
  }
}

module.exports = CityRepository;
