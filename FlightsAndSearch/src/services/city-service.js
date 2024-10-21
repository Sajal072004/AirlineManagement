const {CityRepository} = require('../repository/index')

class CityService {

  constructor() {
    this.cityRepository = new CityRepository();
  }

  async createCity(data) {
    try {
      const city = await this.cityRepository.createCity(data);
      return city;
    } catch (error) {
      console.log("something wrong in service layer");
      throw {error};
    }
  }

  async deleteCity(cityId) {
    try {
      const res = this.cityRepository.deleteCity(cityId);
      return res;
    } catch (error) {
      console.log("something wrong in service layer");
      throw {error};
    }
  }

  async updateCity() {
    try {
      const city = await this.cityRepository.updateCity(cityId , data);
      return city;
      
    } catch (error) {
      console.log("something wrong in service layer");
      throw {error};
    }
  }

  async getCity() {
    try {
      const city = await this.cityRepository.getCity(cityId);
      return city;
    } catch (error) {
      console.log("something wrong in service layer");
      throw {error};
    }
  }


}

 module.exports = CityService;