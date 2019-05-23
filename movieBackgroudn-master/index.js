require('babel-core/register');
require('babel-polyfill');
require('babel-preset-stage-0');
var app = require('./app.js');
module.exports = app;
