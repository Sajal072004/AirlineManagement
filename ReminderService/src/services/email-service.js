const sender = require('../config/email-config');
const TicketRepository = require('../repository/ticket-repository')

const sendBasicEmail = async(mailFrom , mailTo , mailSubject , mailBody) => {
try {
  sender.sendMail({
    from:mailFrom,
    to:mailTo,
    subject:mailSubject,
    text:mailBody

  })
} catch (error) {
  console.log("error in sendbasic mail service ");
  console.log(error);
}
}

const fetchPendingEmails = async(timestamp) => {
  try {
    const repo = new TicketRepository();
    const response = await repo.get({status:"PENDING"});
    return response;
  } catch (error) {
    console.log("error in fetchpending mail service ");
    console.log(error);
  }
}

const testingQueue  = async (data) => {
  console.log("Inside service layer" , data);
}

const updateTicket = async (ticketId, data) => {
  try {
    const repo = new TicketRepository();
    const response = await repo.update(ticketId , data);
    return response;
  } catch (error) {
    console.log(error);
  }
}



const createNotification = async(data) => {
  try {
    const repo = new TicketRepository();
    const response = await repo.create(data);
    return response;

  } catch (error) {
    console.log("error in createnotification service ");
    console.log(error);
  }
}


module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
  testingQueue
}