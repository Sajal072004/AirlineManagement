const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron')


const {PORT} = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');

const setupAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);

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