const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');

const {JWT_KEY} = require('../config/serverConfig')

class UserService {
  constructor(){
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something wrong in user serive layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user , JWT_KEY , {
        expiresIn: '15d'
      });
      return result;
    } catch (error) {
      console.log("error in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token , JWT_KEY);
      return response;
    } catch (error) {
      console.log("something went wrong in token validation" , error);
      throw error;
    }
  }

}

module.exports = UserService;