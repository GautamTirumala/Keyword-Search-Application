const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const uploadDir = 'uploads';
const app = express();
const port = 5000;

const file=require("./Routes/files")
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/",file)