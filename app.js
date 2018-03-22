const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/database');

const app = express();
// port
const port = 3000;

// cors
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
  }));
const admin = require('./routes/admin');

app.use('/admin', admin);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log('Server logged on ' + port);
});

// Mongoose
mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log('connected to database '+ config.database);
});
// Display error if any
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error' + err);
    }
});
app.get('*', (req, res,next) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
