const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const uploadDir = 'uploads';
const app = express();
const port = 5002;


app.use(cors());
// Configure Multer to store uploaded files in a 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, 'uploads'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage });

// Handle file uploads
app.post('/api/upload', upload.array('files'), (req, res) => {
  // req.files contains the uploaded files
  // You can process and save the files or perform any necessary actions here
  res.status(200).json({ message: 'Files uploaded successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
