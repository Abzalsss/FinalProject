const express = require('express');
const qr = require('qr-image');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
      <html>
        <head>
          <style>
            body {
                font-family: 'Poppins', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: linear-gradient(135deg, #667eea, #764ba2);
                flex-direction: column;
                color: white;
            }
            h1 {
                font-size: 28px;
                margin-bottom: 20px;
            }
            form {
                background: rgba(255, 255, 255, 0.2);
                padding: 25px;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                text-align: center;
                backdrop-filter: blur(10px);
            }
            label {
                font-size: 16px;
                display: block;
                margin-bottom: 10px;
            }
            input[type="text"] {
                width: 80%;
                padding: 12px;
                margin: 10px 0;
                border: none;
                border-radius: 5px;
                outline: none;
                font-size: 16px;
            }
            input[type="submit"] {
                background: #ff9800;
                color: white;
                border: none;
                padding: 12px 20px;
                cursor: pointer;
                border-radius: 5px;
                font-size: 16px;
                transition: background 0.3s;
            }
            input[type="submit"]:hover {
                background: #e68900;
            }
          </style>
        </head>
        <body>
          <h1>QR Code Generator</h1>
          <form action="/qr/generate" method="get">
            <label>Enter link to generate QR code:</label>
            <input type="text" name="text" required>
            <input type="submit" value="Generate">
          </form>
        </body>
      </html>
    `);
});

router.get('/generate', (req, res) => {
    const text = req.query.text || 'default text';
    res.setHeader('Content-Type', 'image/png');
    qr.image(text, { type: 'png' }).pipe(res);
});

module.exports = router;