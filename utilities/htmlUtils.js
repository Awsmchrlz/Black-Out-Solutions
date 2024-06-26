function generateRateLimitPage() {
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
          .button {
            background: #ff6768;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 1em;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background: #ff5659;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <div class="logo2"> <a href="/"><img src="/images/logo.png" alt="logo" width ="120px" /></a> </div>
  
          <h1>Too many login attempts</h1>
          <p>Please try again after 15 minutes.</p>
          <a href="/" class="button">Go Back to Home</a>
        </div>
      </body>
      </html>
    `;
  }

  
  
  
  module.exports = {generateRateLimitPage}