// routes
const app = require('express').Router();
const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes'); 

app.use('/', htmlRoutes)
app.use('/api/', apiRoutes)


module.exports = app;