const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something wrong in user service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      const passwordsMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordsMatch) {
        console.log("password doesn't match");
        throw { error: "Incorrect password" };
      }

      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("something went wrong in sigin process");
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if(!response){
        throw { error:  'Invalid token'};
      }
      const user = await this.userRepository.getById(response.id);
      if(!user) throw {error:"no user with corresponding token exists"};
      return user.id;
    } catch (error) {
      console.log('error in isAuthenticated service');
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, {
        expiresIn: "15d",
      });
      return result;
    } catch (error) {
      console.log("error in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something went wrong in token validation", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("something went wrong in password comparison");
      throw error;
    }
  }

  async isAdmin(userId){
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("something went wrong in admin verification");
      throw error;
    }
  }

}

module.exports = UserService;
