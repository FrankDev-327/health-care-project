'use strict';

const setup = require('./config/setting');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', setup.assign_env('developer'));
 
app.use(cors());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(require('morgan')('dev'));

app.listen(app.get('port'), function() {
    console.log('Server running in port: '+ app.get('port'))
});