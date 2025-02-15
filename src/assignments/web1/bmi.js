const express = require('express');
const path = require('path');

const router = express.Router();

function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// Показываем страницу BMI
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обрабатываем отправку формы
router.post('/calculate', (req, res) => {
    const weight = parseFloat(req.body.weight.replace(',', '.'));
    const height = parseFloat(req.body.height.replace(',', '.'));

    let bmiValue, bmiMessage, diagnos;

    if (!isNumber(weight) || !isNumber(height)) {
        bmiMessage = "You need to enter valid numbers";
        diagnos = "Your Brain is Underweight";
    } else if (weight <= 0 || height <= 0) {
        bmiMessage = "You need to enter positive numbers";
        diagnos = "Your Brain is Underweight";
    } else {
        bmiValue = (weight / (height * height)).toFixed(2);

        if (bmiValue < 18.5) {
            bmiMessage = "Underweight";
            diagnos = "Eat more";
        } else if (bmiValue <= 24.9) {
            bmiMessage = "Normal weight";
            diagnos = "Everything is okay, bro!";
        } else if (bmiValue <= 29.9) {
            bmiMessage = "Overweight";
            diagnos = "Eat less";
        } else {
            bmiMessage = "Obesity";
            diagnos = "Do not eat anymore";
        }
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your BMI Calculator</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f4f4f4;
                flex-direction: column;
            }

            h1 {
                margin-top: 20px;
                color: #333;
                text-align: center;
            }

            form {
                margin-top: 20px;
                width: 100%;
                max-width: 500px;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            label {
                margin-bottom: 8px;
                font-weight: bold;
            }

            input, select {
                width: 95%; 
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 16px;
            }

            button {
                padding: 10px 20px;
                background-color: green;
                color: #fff;
                border: none;
                cursor: pointer;
                font-size: 16px;
                border-radius: 4px;
                width: 100%;
                margin-top: 10px;
            }

            button:hover {
                background-color: darkgreen;
            }

            a {
                display: inline-block;
                margin-top: 20px;
                color: #007BFF;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }
        </style>
        <body>
            <h1>Your Personalized BMI Calculator</h1>
            <p>Your BMI: ${bmiValue}</p>
            <p>Your BMI Category: ${bmiMessage}</p>
            <p>Your Diagnosis: ${diagnos}</p>
            <a href="/bmi">Go back</a> 
        </body>
        </html>
    `);
});

module.exports = router;
