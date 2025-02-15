const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const collection = require('./config');

const router = express.Router();

// Раздача статических файлов
router.use(express.static(path.join(__dirname, 'public')));

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            return res.send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new collection({ username, password: hashedPassword });
        await user.save();

        res.redirect('/');
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).send('An error occurred during registration');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await collection.findOne({ username });

        if (!user) {
            return res.send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.send('Invalid password');
        }

        res.redirect('/');
    } catch (error) {
        console.error('Ошибка при входе:', error);
        res.status(500).send('An error occurred during login');
    }
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Экспортируем router
module.exports = router;
