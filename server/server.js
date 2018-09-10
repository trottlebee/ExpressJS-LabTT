const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
let app = express();


let filePath = path.join(__dirname, './formsubmissions.json');

// app.get('/', (req, res) => {                
//     res.send('Hello from the web server side ...');           
// })


app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
})


app.use(bodyParser.urlencoded({ extended: false }));


app.post('/contact-form', (req, res) => {
    fs.appendFileSync(filePath, `{"name": "${req.body.name}", "email": "${req.body.email}"}\n`);
    res.send("Registration Complete");
})


app.get('/formsubmissions', (req, res) => {
    res.sendFile(filePath, err => console.log(err))
})


app.use(express.static(path.join(__dirname, '../public')));


app.listen(3000);