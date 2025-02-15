const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const router = express.Router();

// Настройка парсера тела запроса
router.use(bodyParser.urlencoded({ extended: true }));

// Настройка транспортера для отправки email
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'email@mail.ru',
        pass: 'email-password'
    }
});

// Форма для ввода email и сообщения
router.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f4f4;
                }
                form {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                input, textarea {
                    width: 100%;
                    padding: 10px;
                    margin: 10px 0;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                button {
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 5px;
                }
                button:hover {
                    background: #218838;
                }
            </style>
        </head>
        <body>
            <form action="/email/send" method="POST">
                <h2>Email</h2>
                <input type="email" name="to" placeholder="Enter recipient email" required>
                <textarea name="message" placeholder="Enter your message" required></textarea>
                <button type="submit">Send Email</button>
                <br><br>
                <button><a href="/">Menu</a></button>
            </form>
        </body>
        </html>
    `);
});

// Обработка отправки email
router.post('/send', (req, res) => {
    const { to, message } = req.body;

    const mailOptions = {
        from: 'email@mail.ru',
        to: to,
        subject: 'Message from Abzal',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send(`Email sent successfully to ${to}`);
        }
    });
});

module.exports = router;