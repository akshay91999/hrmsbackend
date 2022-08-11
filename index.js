const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
// var multer = require('multer');
// var upload = multer({dest:'images/'});
// const Upload = require('./model/upload.model')

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
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './images');
//      },
//     filename: function (req, file, cb) {
//         cb(null , file.originalname);
//     }
// });
// var upload = multer({ storage: storage })
// app.post('/upload/:id', upload.single('document'), async(req, res) => {
//     try {
//         const {doc_type}=req.body
//         const pid=req.params.id
//         const up = await  Upload.create({document:req.file.path,basic_id:pid,doc_type})
//         return res.status(201).json({
//             up
//         });
//     } catch (error) {
//         console.error(error);
//     }
//   });


const PORT = process.env.PORT || 6000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));