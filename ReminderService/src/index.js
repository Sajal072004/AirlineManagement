const express = require('express');
const bodyParser = require('body-parser');

const jobs = require('./utils/job')


const {PORT} = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');

const {createChannel , subscribeMessage} = require('./utils/messageQueue');

const {REMINDER_BINDING_KEY} = require('./config/serverConfig');

const TicketController = require('./controllers/ticket-controller');

const EmailService = require('./services/email-service')

const setupAndStartServer = async() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  

  app.post('/api/v1/tickets' , TicketController.create);

  const channel = await createChannel();
  subscribeMessage(channel , EmailService , REMINDER_BINDING_KEY);

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
    // jobs();

    // sendBasicEmail(
    //   'support@admin.com',
    //   'sajalnamdeo627@gmail.com',
    //   'this is a testing email',
    //   'Hey, How are you?'
    // )

    // cron.schedule('* * * * *', () => {
    //   try {
    //     console.log('running every two minutes');
    //   } catch (error) {
    //     console.error('Cron job error:', error);
    //   }
    // });
    

  });

}

setupAndStartServer();