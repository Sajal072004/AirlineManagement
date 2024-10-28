const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/email-config');

const setupJobs = () => {
  cron.schedule('*/2 * * * *', async () => {
    const response = await emailService.fetchPendingEmails();
    
    response.forEach((email) => {
      // Enhanced HTML template
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <!-- Header Section with Green Background -->
          <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">${email.subject}</h1>
          </div>

          <!-- Body Section -->
          <div style="padding: 20px;">
            <h2>Hello,</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              We wanted to reach out to you with some important information. Below is the main content:
            </p>

            <div style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #4CAF50; margin: 20px 0;">
              <p>${email.content}</p>
            </div>

            <p style="font-size: 16px; line-height: 1.6;">
              If you have any questions or need further assistance, please don't hesitate to reach out to our support team. 
              We're here to help!
            </p>
          </div>

          <!-- Footer Section -->
          <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 14px; color: #666;">
            <p>Thank you for choosing our service!</p>
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p style="margin: 0;">1234 Address St., City, Country</p>
          </div>
        </div>
      `;

      sender.sendMail(
        {
          to: email.recipientEmail,
          subject: email.subject,
          text: email.content, // Plain text fallback
          html: htmlContent,   // Enhanced HTML content
        },
        async (err, data) => {
          if (err) {
            console.log(err);
            await emailService.updateTicket(email.id, { status: 'FAILED' });
          } else {
            console.log(data);
            await emailService.updateTicket(email.id, { status: 'SUCCESS' });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports = setupJobs;
