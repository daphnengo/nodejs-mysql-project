const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorsRoutes = require('./routes/errors');
const storeRoutes = require('./routes/store');
const adminRoutes = require('./routes/admin');

const app = express();

app.set('views', path.join(__dirname, 'views'));
// Set EJS View Engine
app.set('view engine','ejs');
// Set HTML engine
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

app.use(errorsRoutes);
app.use(storeRoutes);
app.use('/admin', adminRoutes);

console.log('Connected!');
app.listen(8000);
