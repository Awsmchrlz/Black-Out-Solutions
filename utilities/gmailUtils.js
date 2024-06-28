// require("dotenv").config();
var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = "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";

//apiKey.apiKey =   	proccess.env.BREVO_EMAIL_API;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = (
  email,
  firstName,
  lastName,
  amount,
  phoneNumber,
  currency,
  recipientCountry,
  recipientName,
  recipientPhoneNumber,
  accountInfo,
  amountToSend,
  currencyTo
) => {
  apiInstance
    .sendTransacEmail({
      sender: { email: `chisalecharles23@gmail.com`, name: "Blackout Energy Solutions" },
      subject: "Blackout Energy Solutions Transaction",
      htmlContent: `<html>
        <head></head>
        <body></body>
        </html>
        `,
      messageVersions: [
        // Definition for Message Version 1
        {
          to: [
            {
              email: email, // Make sure email is defined
              name: "Blackout Energy Solutions",
            },
          ],
          htmlContent: generateUserTransactionRequestHTML(
            email,
            firstName,
            lastName,
            amount,
            phoneNumber,
            currency,
            recipientCountry,
            recipientName,
            recipientPhoneNumber,
            accountInfo,
            amountToSend,
            currencyTo
          ),
          subject: "Transaction Received! ~ Blackout Energy Solutions",
        },
        {
          to: [
            {
              email: "chisalecharles23@gmail.com", // Add the email address
              name: "Blackout Energy Solutions",
            },
          ],
          htmlContent: generateAdminTransactionNotificationHTML(
            email,
            firstName,
            lastName,
            amount,
            phoneNumber,
            currency,
            recipientCountry,
            recipientName,
            recipientPhoneNumber,
            accountInfo,
            amountToSend,
            currencyTo
          ),
          subject: "New Transaction! ~ Blackout Energy Solutions",
        },
        {
          to: [
            {
             
              name: "Blackout Energy Solutions",
            },
          ],
          htmlContent: generateAdminTransactionNotificationHTML(
            email,
            firstName,
            lastName,
            amount,
            phoneNumber,
            currency,
            recipientCountry,
            recipientName,
            recipientPhoneNumber,
            accountInfo,
            amountToSend,
            currencyTo
          ),
          subject: "New Transaction! ~ Blackout Energy Solutions",
        },
        {
          to: [
            {
              email: "chisalecharles23@gmail.com",
              name: "Blackout Energy Solutions",
            },
          ],
          htmlContent: generateAdminTransactionNotificationHTML(
            email,
            firstName,
            lastName,
            amount,
            phoneNumber,
            currency,
            recipientCountry,
            recipientName,
            recipientPhoneNumber,
            accountInfo,
            amountToSend,
            currencyTo
          ),
          subject: "New Transaction! ~ Blackout Energy Solutions",
        },
      ],
    })
    .then(
      function (data) {
        //console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
};
const generateUserTransactionRequestHTML = (
  email,
  firstName,
  lastName,
  amount,
  phoneNumber,
  currency,
  recipientCountry,
  recipientName,
  recipientPhoneNumber,
  accountInfo,
  amountToSend,
  currencyTo
) => {
  const containerStyle = `
    background-color: #f5f5f5;
    padding: 20px;
    font-family: Arial, sans-serif;
  `;

  const headingStyle = `
    font-size: 24px;
    color: #333;
  `;

  const detailsStyle = `
    font-size: 16px;
    color: #666;
    margin: 5px 0;
  `;

  const emailStyle = `
    font-size: 18px;
    color: #007bff;
  `;

  const emojiStyle = `
    font-size: 20px;
    margin-right: 5px;
  `;

  
  return `
    <div style="${containerStyle}">
        <h1 style="${headingStyle}">📊 Transaction Request</h1>
        <hr>
        <p>👋 Dear ${firstName} ${lastName},</p>
        <p>📢 We have received a transaction request from your account with the following details:</p>
       <p style="${detailsStyle}">💰 Your'e Sending: <span>${currency} ${amount} <span/></p>
       <p style="${detailsStyle}">💰 Recipient Gets: <span> ${amountToSend}<span/></p>
    
        <p style="${detailsStyle}">📞 Phone Number: ${phoneNumber}</p>
        <h1>Recipient Info</h1>
        <hr>
        <p style="${detailsStyle}">🌍 Recipient Country: ${recipientCountry}</p>
        <p style="${detailsStyle}">👤 Recipient Name: ${recipientName}</p>
        <p style="${detailsStyle}">📞 Recipient Phone Number: ${recipientPhoneNumber}</p>
        <p style="${detailsStyle}">📄 Recipient Account Info: ${accountInfo}</p>
        <p>🔍 Please review the information and confirm this transaction if it's accurate.</p>
        <p>🙏 Thank you for choosing Tayant!</p>
    </div>
  `;
};

const generateAdminTransactionNotificationHTML = (
  email,
  firstName,
  lastName,
  amount,
  phoneNumber,
  currency,
  recipientCountry,
  recipientName,
  recipientPhoneNumber,
  accountInfo,
  amountToSend,
  currencyTo
) => {
  const containerStyle = `
    background-color: #f5f5f5;
    padding: 20px;
    font-family: Arial, sans-serif;
  `;

  const headingStyle = `
    font-size: 24px;
    color: #333;
  `;

  const detailsStyle = `
    font-size: 16px;
    color: #666;
    margin: 5px 0;
  `;

  const emailStyle = `
    font-size: 18px;
    color: #007bff;
  `;

  const emojiStyle = `
    font-size: 20px;
    margin-right: 5px;
  `;

  return `
    <div style="${containerStyle}">
        <h1 style="${headingStyle}">🚀 Transaction Notification</h1>
        <hr>
        <p>📢 An incoming transaction has been requested with the following details:</p>
        <h1>Sender Info</h1>
        <hr>
        <p style="${detailsStyle}">📧 Email: <span style="${emailStyle}">${email}</span></p>
        <p style="${detailsStyle}">👤 Names: ${lastName} ${firstName}</p>
        <p style="${detailsStyle}">💰 Amount To Recieved: ${currency} ${amount}</p>
        <p style="${detailsStyle}">💰 Amount to Send: ${amountToSend}</p>
        
        <p style="${detailsStyle}">📞 Phone Number: ${phoneNumber}</p>
        <h1>Recipient Info</h1>
        <hr>
        <p style="${detailsStyle}">🌍 Recipient Country: ${recipientCountry}</p>
        <p style="${detailsStyle}">👤 Recipient Name: ${recipientName}</p>
        <p style="${detailsStyle}">📞 Recipient Phone Number: ${recipientPhoneNumber}</p>
        <p style="${detailsStyle}">📄 Recipient Account Info: ${accountInfo}</p>
       
    </div>
  `;
};

function generateUserEmail(userName) {
  const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rate Limit Exceeded</title>
        <style>
         body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #fff;
          }
          .container {
            background: #fff;
            border: 1px solid #000;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            width: 90%;
          }
          h1 {
            color: #000;
            font-size: 2em;
            margin-bottom: 20px;
          }
          p {
            color: #000;
            font-size: 1.2em;
            margin-bottom: 30px;
          }
          .button {
            background: #000;
            color: white;
            border: 1px solid #000;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 1em;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background: #444;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello ${userName},</h1>
          <p>Thank you for signing up with Blackout Energy Solutions.</p>
           </div>
      </body>
      </html>
      `;
  return emailHtml;
}

function generateAdminEmail({userName, email}) {
  const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New User</title>
        <style>
            body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #fff;
          }
          .container {
            background: #fff;
            border: 1px solid #000;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            width: 90%;
          }
          h1 {
            color: #000;
            font-size: 2em;
            margin-bottom: 20px;
          }
          p {
            color: #000;
            font-size: 1.2em;
            margin-bottom: 30px;
          }
          .button {
            background: #000;
            color: white;
            border: 1px solid #000;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 1em;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background: #444;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New account created by ${userName}, Email <i>${email}</i></h1>
        
          </div>
      </body>
      </html>
      `;
  return emailHtml;
}

function sendAccountCreateEmail({email, userName}) {
  apiInstance
    .sendTransacEmail({
      sender: { email: `${email}`, name: userName },
      subject: "Blackout Energy Solutions Transaction",
      htmlContent: `<html>
          <head></head>
          <body></body>
          </html>
          `,
      messageVersions: [
        //Definition for Message Version 1
        {
          to: [
            {
              email: email,
              name: userName,
            },
          ],
          htmlContent: generateUserEmail(userName),
          subject: "Account Created! ~ Blackout Energy Solutions",
        },
        {
          to: [
            {
              email:`chisalecharles23@gmail.com`,
  
              name: userName,
            },
          ],
          htmlContent: generateAdminEmail({userName, email}),
          subject: "New User! ~ Blackout Energy Solutions",
        },
      ],
    })
    .then(
      function (data) {
        //console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
}

function generateForgotPasswordHtmlAlert({ email }) {
  return`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forgot Password Alert</title>
  <style>
     body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #fff;
    }
    .container {
      background: #fff;
      border: 1px solid #000;
      padding: 40px;
      text-align: center;
      max-width: 400px;
      width: 90%;
    }
    h1 {
      color: #000;
      font-size: 2em;
      margin-bottom: 20px;
    }
    p {
      color: #000;
      font-size: 1.2em;
      margin-bottom: 30px;
    }
    span {
      color: #000;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>The Account at<span> ${email}</span> is attempting a password reset.</h1>
    <p>This serves to remind just you, for administrative and security purposes.</p>
  </div>
</body>
</html>
`
}

function generateForgotPasswordHtml({ code, email }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rate Limit Exceeded</title>
  <style>
     body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #fff;
    }
    .container {
      background: #fff;
      border: 1px solid #000;
      padding: 40px;
      text-align: center;
      max-width: 400px;
      width: 90%;
    }
    h1 {
      color: #000;
      font-size: 2em;
      margin-bottom: 20px;
    }
    p {
      color: #000;
      font-size: 1.2em;
      margin-bottom: 30px;
    }
    
  </style>
</head>
<body>
  <div class="container">
  
    <h1>Your Blackout Energy Solutions Password Reset Code is ${code}</h1>
    <p>If this was not you, ignore this.</p>
  </div>
</body>
</html>
`;
}

function sendForgotPasswordEmail({ email, code }) {
  apiInstance
    .sendTransacEmail({
      sender: { email: `chisalecharles23@gmail.com`, name: "Blackout Energy Solutions" },
      subject: "Forgot Password Blackout Energy Solutions",
      htmlContent: `<html>
        <head></head>
        <body></body>
        </html>
        `,
      messageVersions: [
        //Definition for Message Version 1
        {
          to: [
            {
              email: email,
              name: "Blackout Energy Solutions",
            },
          ],
          htmlContent: generateForgotPasswordHtml({ email, code }),
          subject: "Forgot Password! ~ Blackout Energy Solutions",
        },
        {
          to: [
            {
              email:`chisalecharles23@gmail.com`,
              name: "Blackout Energy Solutions",
            },
          ],
          htmlContent: generateForgotPasswordHtmlAlert({ email }),
          subject: "Forgot Password Alert! ~ Blackout Energy Solutions",
        },
      ],
    })
    .then(
      function (data) {
        //console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
}

function sendExceededLoginEmail({ ipAddress}) {
  console.log('ip adress',ipAddress)
  apiInstance
    .sendTransacEmail({
      sender: { email: `chisalecharles23@gmail.com`, name: "Blackout Energy Solutions" },
      subject: "Exceeded Login Attempts ~ Blackout Energy Solutions",
      htmlContent: `<html>
        <head></head>
        <body></body>
        </html>
        `,
      messageVersions: [
        //Definition for Message Version 1
        
        {
          to: [
            {
              email:`chisalecharles23@gmail.com`,
              name: "Blackout Energy Solutions",
            },
          ],
          htmlContent: generatePasswordAttemptsAlert({ipAddress}),
          subject: "Exceeded Login Attempts ~ Blackout Energy Solutions",
        },
      ],
    })
    .then(
      function (data) {
        //console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
}

function generateTokenHTML({ email, token }) {
  const emailHtml = `
  <div style="max-width: 400px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  <h2 style="color: #333;">Blackout Energy Solutions Email Verification</h2>
  <p style="color: #555; margin-bottom: 20px;">Thank you for registering with Blackout Energy Solutions. Please click the button below to verify your email:</p>


  <a href="http://blackout-solutions.onrender.com/auth/verify/${token}/${email}" style="display: inline-block; text-decoration: none; background-color: #ffc107; color: #333; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">
    Confirm Email
  </a>

  <p style="color: #555; margin-top: 20px;">If you didn't register with Blackout Energy Solutions, please ignore this email.</p>
</div>
  `
  return emailHtml;
}

function sendTokenEmail({ userName, email, token }) {
  console.log(email)
  apiInstance
    .sendTransacEmail({
      sender: { email: `chisalecharles23@gmail.com`, name: 'Blackout Energy Solutions' },
      subject: "Blackout Energy Solutions Transaction",
      htmlContent: `<html>
      <head></head>
      <body></body>
      </html>
      `,
      messageVersions: [
        //Definition for Message Version 1
        {
          to: [
            {
              email: email,
              name: userName,
            },
          ],
          htmlContent: generateTokenHTML({ email, token }),
          subject: "Email Verification! ~ Blackout Energy Solutions",
        }
      ],
    })
    .then(
      function (data) {
        //console.log(data);
      },
      function (error) {
        return null;
        console.error(error);
      }
    );
}

function generatePasswordAttemptsAlert({ ipAddress }) {
  return`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forgot Password Alert</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #f6f6f6;
    }
    .container {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 40px;
      text-align: center;
      max-width: 400px;
      width: 90%;
    }
    h1 {
      color: #ff6768;
      font-size: 2em;
      margin-bottom: 20px;
    }
    p {
      color: #555;
      font-size: 1.2em;
      margin-bottom: 30px;
    }
    span{
      color:#ffc107;
    }
    
  </style>
</head>
<body>
  <div class="container">
  
    <h1>The IP Address at<span> ${ipAddress}</span> attempted to login over 4 times.</h1>
    <p>This serves to remind just you, for administrative and security purposes.</p>
    
  </div>
</body>
</html>
`
}

module.exports = {
  sendEmail,
  sendAccountCreateEmail,
  generateUserEmail,
  generateForgotPasswordHtml,
  sendForgotPasswordEmail,
  generateTokenHTML,
  sendTokenEmail,
  sendExceededLoginEmail
};