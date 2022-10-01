const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const cors = require('cors');
const path=require('path')
const adminService=require('./services/admindata.service')
const cookieParser = require('cookie-parser')
//Database Connection
const db = require('./config/database');

db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser())
app.use(cors("*"));

app.use('/', require('./routes/add.routing'));
app.use('/upload', express.static('upload'),require('./routes/upload.route'))
app.use('/visitor', express.static('visitor'),require('./routes/visitor.route'))


const PORT = process.env.PORT || 5000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`),adminService.add());
}).catch(err => console.log("Error: " + err));