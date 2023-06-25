const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(bodyParser.json());
// Enable CORS for all requests
app.use(cors());

// Configure SendGrid API key
sgMail.setApiKey(process.env.API_KEY);

// Endpoint to send an email
app.post('/send-email', (req, res) => {
  const { from,to,company,role } = req.body;
    // const to ='shreyassanthosh362@gmail.com'
  const msg = {
    from,
    to,
    templateId: process.env.TEMPLATE_ID,
    dynamic_template_data: {
        subject:`${company} response to your application`, 
        text:`Congratulations! Your Application for ${role} has been shortlisted by ${company}. Please check your email for further details.`,
    },

  };



  sgMail
    .send(msg)
    .then(() => {
      res.send('Email sent successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending email');
    });
});

app.post('/reject-email', (req, res) => {
  const { from,to,company,role } = req.body;
    // const to ='shreyassanthosh362@gmail.com'
  const msg = {
    from,
    to,
    templateId: process.env.TEMPLATE_ID,
    dynamic_template_data: {
        subject:`${company} response to your application`, 
        text:`Thank you for applying at ${company} for ${role}. Unfortunately we do not have an opening suited for your skillset at the moment. We will keep your application on file and reach out to you if a suitable position opens up. Thank you for your time.`,
    },

  };



  sgMail
    .send(msg)
    .then(() => {
      res.send('Email sent successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending email');
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
