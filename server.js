const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Парсинг данных формы
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Раздача статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем маршруты авторизации
const authRouter = require('./src/assignments/web3/index'); 
app.use('/', authRouter);

// Подключаем маршруты заданий
const bmiRouter = require(path.join(__dirname, 'src', 'assignments', 'web1', 'bmi'));
const emailRouter = require(path.join(__dirname, 'src', 'assignments', 'email-sender', 'email'));
const weatherRouter = require(path.join(__dirname, 'src', 'assignments', 'web2', 'weather'));
const qrRouter = require(path.join(__dirname, 'src', 'assignments', 'qr', 'qr'));
const web4Router = require(path.join(__dirname, 'src', 'assignments', 'web4', 'src', 'index.js'));

app.use('/qr', qrRouter);
app.use('/bmi', bmiRouter);
app.use('/email', emailRouter);
app.use('/web2', weatherRouter);
app.use('/blogs', web4Router);

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработка неизвестных маршрутов
app.use((req, res) => {
    res.status(404).send('Ошибка 404: Страница не найдена');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер работает на http://localhost:${PORT}`);
});
