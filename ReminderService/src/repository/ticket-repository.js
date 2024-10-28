const {NotificationTicket} = require('../models/index');
const {Op} = require("sequelize")

class TicketRepository {

  async getAll(){
    try {
      const tickets = await NotificationTicket.findAll();
      return tickets;
    } catch (error) {
      console.log('error in getall repo ');
      throw error;
    }
  }

  async create(data) {
    try {
      const ticket = await NotificationTicket.create(data);
      return ticket;
    } catch (error) {
      console.log("error in create repo");
      throw error;
    }
  }

  async get(filter) {
    try {
      const tickets = await NotificationTicket.findAll({
        where:{
          status:filter.status,
          notificationTime: {
            [Op.lte]: new Date()
          }
        }
      });
      return tickets;
    } catch (error) {
      console.log("error in get repo");
      throw error;
    }
  }

}

module.exports = TicketRepository;