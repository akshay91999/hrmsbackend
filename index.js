const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
var multer = require('multer');
var upload = multer({dest:'images/'});

//Database Connection
const db = require('./config/database');

db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));

app.use('/', require('./routes/add.routing'));
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage })
app.post('/single', upload.single('profile'), (req, res) => {
    try {
      res.send(req.file);
    }catch(err) {
      res.send(400);
    }
  });


const PORT = process.env.PORT || 6000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));