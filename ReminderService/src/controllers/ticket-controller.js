const TicketService = require('../services/email-service')

const create = async ( req,res) => {
  try {
    const response = await TicketService.createNotification(req.body);
    return res.status(201).json({
      success: true,
      message: 'Successfully registered an email',
      data: response,
      err: {}
    
    });
  } catch (error) {
    console.log("erro in create controller");
  console.error(error);
  return res.status(500).json({
    success: false,
    message: 'unable to register an email reminder',
    err:error,
    data:{}
    
  });
}
}

module.exports = {
  create
}