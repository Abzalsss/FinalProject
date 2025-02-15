const express = require('express');
const path = require('path');

const router = express.Router();

// Раздача статических файлов (HTML, CSS, JS)
router.use(express.static(path.join(__dirname, 'public')));

// Главная страница для погоды
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = router;
