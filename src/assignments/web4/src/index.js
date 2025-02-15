const express = require('express');
const connectDB = require('./config');
const cors = require('cors');
const Blog = require('./blog');
const path = require('path');

const router = express.Router();

connectDB();
router.use(express.json());
router.use(cors());

// Раздача статических файлов
router.use(express.static(path.join(__dirname, '..', 'public')));

// Отдаем HTML-файл при запросе на /
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// CRUD операции для блогов
router.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'No blog found' });
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/blogs", async (req, res) => {
    try {
        const { title, body, author } = req.body;
        if (!title || !body) return res.status(400).json({ message: 'Title or body required' });
        const newBlog = new Blog({ title, body, author });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/blogs/:id", async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) return res.status(404).json({ message: 'No blog found' });
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/blogs/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ message: 'No blog found' });
        res.status(200).json({ message: 'Data successfully deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
