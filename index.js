const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');



const cookieParser = require('cookie-parser')


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
app.use(cookieParser())
app.use(cors("*"));

app.use('/', require('./routes/add.routing'));
app.use('/upload', express.static('./images'),require('./routes/upload.route'));


const PORT = process.env.PORT || 6009;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));