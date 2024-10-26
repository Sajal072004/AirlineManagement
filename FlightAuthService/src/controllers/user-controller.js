const UserService = require('../services/user-service');


const userService = new UserService();

const create = async ( req,res) => {
   try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password
    
    });
    res.status(201).json({
      success:true,
      message: 'User created successfully',
      data: response,
      err:{}

    });
   } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"something went wrong in auth controller",
      data:{},
      success : false,
      err: error
    })
   }
}

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(req.body.email, req.body.password);
    return res.status(200).json({
      success: true,
      data: response,
      message: 'User logged in successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in auth controller",
      data: {},
      success: false,
      err: error 
    });
  }
}

const isAuthenticated = async(req,res) => {
  try {
    const token = req.headers['x-access-token'];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success:true,
      err: {},
      data:response,
      message:"user is authenticated and token is valid"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in auth controller",
      data: {},
      success: false,
      err: error 
    });
  }
}

module.exports = {
   create,
   signIn,
   isAuthenticated
}