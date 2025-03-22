const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './images/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Serve static files from the 'images' directory
app.use('/images', express.static('images'));

// Route to get list of images
app.get('/images', (req, res) => {
    fs.readdir('./images/', (err, files) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(files);
    });
});

// Route to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('Image uploaded successfully.');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});