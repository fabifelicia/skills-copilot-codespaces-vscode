// Create web server
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Comment schema and model
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
});

const Comment = mongoose.model('Comment', commentSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

app.post('/comments', async (req, res) => {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
